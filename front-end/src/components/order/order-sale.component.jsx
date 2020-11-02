import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom'; 
import queryString from 'query-string';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import OrderSaleForm from './order-sale-form.component';
import Customer from '../customer/customer.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderSale } from '../../state/order/order.actions';
import { selectOrderEditing } from '../../state/order/order.selectors';

// inital values
const formSchema = Yup.object().shape({
  customer: Yup
    .object(),
  salePrice: Yup
    .string()
    .required(),
  shippingPrice: Yup
    .string()
});

const formState = {
  customer: null,
  shippingPrice: "",
  salePrice: ""
}

// main component
const OrderSale = ({
  order,
  saveOrderSale
}) => {

  const location = useLocation();
  const queryStr = queryString.parse(location.search);
  const { comp } = queryStr;
  const [redirect, setRedirect] = useState(false)

  const { orderSale, isSelectingCustomer } = order;
  let orderEditing = null;

  if (orderSale) {
    orderEditing = {
      ...formState,
      customer: orderSale.customer,
      salePrice: orderSale.salePrice,
      shippingPrice: orderSale.shippingPrice
    }
  }

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = () => {
    const obj = { ...formData }

    saveOrderSale(obj)
    setRedirect(true)
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>

    {
      redirect && <Redirect to={`${location.pathname}?comp=${comp}`} />
    }

    { 
      isSelectingCustomer 
      ? <>
        <Customer />
      </>
      : <>
        <Container width="col">
          <Card width="col" title="Sale Information">
            <Ul>
              <form onSubmit={formSubmit}>
                <OrderSaleForm
                  formData={formData}
                  errors={errors} 
                  onInputChange={onInputChange}
                />
                {
                  formData.customer &&
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
  saveOrderSale: payload => dispatch(saveOrderSale(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSale);