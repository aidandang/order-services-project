import React from 'react';

// import dependencies
import { connect, batch } from 'react-redux';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../hooks/useForm';

// import _shared components

// import child components
import ItemDetailsForm from '../../components/ItemDetailsForm';

// import redux middleware, actions and settings
import { saveItemToOrder, updateItemInOrder } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  product: state.data.products.byId,
  order: state.data.orders.byId,
  pageWrapper: state.ui.pageWrapper
});
const saveItem = (item, page) => dispatch => {
  batch(() => {
    dispatch(saveItemToOrder(item));
    dispatch(setPageActive(page));
  })
}
const updateItem = (payload, page) => dispatch => {
  batch(() => {
    dispatch(updateItemInOrder(payload));
    dispatch(setPageActive(page));
  })
}

// set form schema
const formSchema = Yup.object().shape({
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  price: Yup
    .string()
    .required(),
  saleTax: Yup
    .string(),
  localCharge: Yup
    .string(),
  shippingCost: Yup
    .string(),
  note: Yup
    .string()
})

// MAIN COMPONENT
const ItemDetails = ({
  order,
  product,
  pageWrapper,
  saveItem,
  updateItem
}) => {

  const { page } = pageWrapper.tabbar.active;
  const color = product.colors.find(element => element._id === page.colorId);

  const formState = {
    size: "",
    qty: "",
    price: "",
    saleTax: "",
    localCharge: "",
    shippingCost: "",
    note: ""
  };

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(page.itemId >= 0 
    ? 
      {
        size: order.items[page.itemId].size,
        qty: order.items[page.itemId].qty,
        price: order.items[page.itemId].price,
        saleTax: order.items[page.itemId].saleTax,
        localCharge: order.items[page.itemId].localCharge,
        shippingCost: order.items[page.itemId].shippingCost,
        note: order.items[page.itemId].note
      } 
    : formState, formState, formSchema);

  // form submit function
  const formSubmit = e => {
    e.preventDefault();

    const arr = {
      item: formData,
      index: ""
    };

    const payload = { 
      ...arr, 
      item: { 
        ...arr.item, 
        product, 
        color 
      } 
    };

    if (page.itemId >= 0) {
      payload.index = page.itemId;
      updateItem(payload, { name: 'ITEM_LIST' })
    } else {
      saveItem(payload.item, { name: 'ITEM_LIST' });
    }
  }

  return <>
    <ItemDetailsForm 
      formSubmit={formSubmit}
      formData={formData}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      product={product}
      color={color}
    />
  </>
}

export default connect(mapStateToProps, { saveItem, updateItem })(ItemDetails);