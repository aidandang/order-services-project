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
    .string(),
  int: Yup
    .string()
});

const formState = {
  customer: null,
  shippingPrice: "",
  salePrice: "",
  int: ""
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

  const [itemIndex, setItemIndex] = useState(null)

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
              { 
                customer && <>
                  <Li>
                    <div className="row">
                      <div className="col">
                        <div className="row">
                          <div className="col-4">
                            <span>Nickname:</span>
                          </div>
                          <div className="col-8">
                            <span>{customer.nickname}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <span>Account Number:</span>
                          </div>
                          <div className="col-8">
                            <span>{customer.account}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <span>Billing Address:</span>
                          </div>
                          <div className="col-8">
                            <span>{customer.fullname}</span><br />
                            <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                            <span>Phone# {customer.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Li>
                  <Li>
                    <div className="row">
                      <div className="col">
                        <div className="row">
                          <div className="col-4">
                            <span>Shipping Address:</span>
                          </div>
                          <div className="col-8 align-self-center">
                            {
                              address
                              ? <>
                                <span>{address.fullname}</span><br />
                                <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                                <span>Phone# {address.phone}</span>
                              </>
                              : 
                              <span>Same as Billing Address</span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </Li>
                </>
              }
            </Ul>
          </Card>
          <form>
            <OrderSaleForm
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