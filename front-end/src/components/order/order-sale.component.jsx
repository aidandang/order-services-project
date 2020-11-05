import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect, useHistory } from 'react-router-dom'; 
import queryString from 'query-string';

// components
import { Container, Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import OrderSaleForm from './order-sale-form.component';
import Customer from '../customer/customer.component';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import OrderSaleItemUpdate from './order-sale-item-update.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setIsSelectingCustomer } from '../../state/order/order.actions';
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
  saveOrderSale,
  setIsSelectingCustomer
}) => {

  const location = useLocation();
  const history = useHistory();
  const queryStr = queryString.parse(location.search);
  const { comp } = queryStr;
  const [redirect, setRedirect] = useState(false)

  const { sale, isSelectingCustomer } = order;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const { customer } = formData;

  let address = null

  if (customer) {
    address = customer.shippingInfo.find(item => item._id === customer.shippingAddress)
  }
  
  const formSubmit = () => {
    const obj = { ...formData }

    saveOrderSale(obj)
    setRedirect(true)
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    history.push(`${location.pathname}?comp=${comp}`)
  }

  useEffect(() => {
    if (Object.keys(sale).length > 0) setValues(prevState => ({
      ...prevState, ...sale
    }))
    // eslint-disable-next-line
  }, [isSelectingCustomer])

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
        <Container width="col" goBack={goBack}>
          <Card width="col" title="Billing Information">
            <Ul>
              <Li>
                <div className="row">
                  <div className="col">
                    <a 
                      href="/" 
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault();
                        setIsSelectingCustomer(true)
                      }}
                    >
                      {formData.customer ? 'Reselect Customer' : 'Select Customer'}
                    </a>
                  </div>
                </div>
              </Li>
              <OrderSaleForm
                formData={formData}
                errors={errors} 
                onInputChange={onInputChange}
                customer={customer}
                address={address}
              />
            </Ul>
          </Card>
          <OrderSaleItemUpdate />
          <Card width="col" title="Action">
            <Ul>
              <SubmitOrReset
                buttonName={'Save'}
                buttonDisabled={buttonDisabled}
                formSubmit={formSubmit}
                formReset={formReset}
              />
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
  saveOrderSale: payload => dispatch(saveOrderSale(payload)),
  setIsSelectingCustomer: payload => dispatch(setIsSelectingCustomer(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSale);