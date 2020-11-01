import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom'; 
import queryString from 'query-string';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import OrderItemForm from './order-item-form.component';
import Product from '../product/product.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderItem, updateOrderItem } from '../../state/order/order.actions';
import { selectOrderEditing } from '../../state/order/order.selectors';

// initial form state
const formSchema = Yup.object().shape({
  product: Yup
    .object(),
  color: Yup
    .object(),
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  price: Yup
    .string()
    .required(),
  note: Yup
    .string()
})

const formState = {
  product: null,
  color: null,
  size: "",
  qty: "",
  price: "",
  note: ""
}

// main component
const OrderItem = ({
  order,
  saveOrderItem,
  updateOrderItem
}) => {

  const location = useLocation();
  const queryStr = queryString.parse(location.search);
  const { index, comp } = queryStr;

  const { items, itemTemp, isSelectingProduct } = order;

  let obj = null

  if (index && items[index]) {
    obj = { ...items[index] }
  } else if (Object.keys(itemTemp).length > 0) {
    obj = { ...itemTemp }
  }

  const [redirect, setRedirect] = useState(false)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {
    if (index && items[index]) {
      updateOrderItem(formData, Number(index))
    } else {
      saveOrderItem(formData);
    }

    setRedirect(true);
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (obj) setValues(prevState => ({
      ...prevState, ...obj
    }))
    // eslint-disable-next-line
  }, [isSelectingProduct])

  return <>

    {
      redirect && <Redirect to={`${location.pathname}?comp=${comp}`} />
    }

    { 
      isSelectingProduct 
      ? <>
        <Product />
      </>
      : <>
        <Container width="col">
          <Card width="col" title="Item Information">
            <Ul>
              <form onSubmit={formSubmit}>
                <OrderItemForm
                  formData={formData}
                  errors={errors} 
                  onInputChange={onInputChange}
                />
                {
                  formData.product && formData.color &&
                  <SubmitOrReset
                    buttonName={'Save'}
                    buttonDisabled={buttonDisabled}
                    formSubmit={formSubmit}
                    formReset={formReset}
                  />
                }
              </form>
            </Ul>
          </Card>
        </Container>
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderItem: payload => dispatch(saveOrderItem(payload)),
  updateOrderItem: (item, index) => dispatch(updateOrderItem(item, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);