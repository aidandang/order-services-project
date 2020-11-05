import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { useForm } from '../hook/use-form';
import OrderSaleItemForm from './order-sale-item-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';
import { updateOrderItem } from '../../state/order/order.actions';

// inital values
const formSchema = Yup.object().shape({
  salePrice: Yup
    .string()
    .required(),
  shippingPrice: Yup
    .string()
    .required(),
  int: Yup
    .string(),
  weight: Yup
    .string()
    .required()
});

const formState = {
  shippingPrice: "",
  salePrice: "",
  int: "",
  weight: ""
}

// main component
const OrderSaleItemUpdate = ({
  order,
  updateOrderItem
}) => {

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const [itemIndex, setItemIndex] = useState(null)

  const formSubmit = (props) => {
    const obj = { ...formData }
    updateOrderItem(obj, props.itemIndex);
    setItemIndex(null)
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>
    <form>
      <OrderSaleItemForm
        formSubmit={formSubmit}
        formReset={formReset}
        buttonDisabled={buttonDisabled}
        formData={formData}
        errors={errors} 
        onInputChange={onInputChange}
        order={order}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
      />
    </form>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  updateOrderItem: (item, index) => dispatch(updateOrderItem(item, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSaleItemUpdate);