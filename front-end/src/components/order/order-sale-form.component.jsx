import React from 'react';

// components
import { Li, TextInput } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { setIsSelectingCustomer } from '../../state/order/order.actions';

const OrderSaleForm = ({
  formData,
  errors,
  onInputChange,
  setIsSelectingCustomer
}) => {

  let address = null

  if (formData && formData.customer) {
    address = formData.customer.shippingInfo.find(item => item._id === formData.customer.shippingAddress)
  } 

  return <>
    {
      formData.customer && <>
        <Li>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-4">
                  <span>Nickname:</span>
                </div>
                <div className="col-8">
                  <span>{formData.customer.nickname}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <span>Account Number:</span>
                </div>
                <div className="col-8">
                  <span>{formData.customer.account}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <span>Billing Address:</span>
                </div>
                <div className="col-8">
                  <span>{formData.customer.fullname}</span><br />
                  <span>{formData.customer.streetAddress1}, {formData.customer.city}, {formData.customer.state}</span><br />
                  <span>Phone# {formData.customer.phone}</span>
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
                    address === null
                    ? 
                      <span>Same as Billing Address</span>
                    : <>
                      <span>{address.fullname}</span><br />
                      <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                      <span>Phone# {address.phone}</span>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </Li>
        <Li>
          <TextInput
            label="Sale Price (*)" 
            name="salePrice"
            id="currencyMask-order-sale-form-salePrice"
            errors={errors}
            size="col-xl-6"
            smallText="Order price quote to the customer."
            value={formData.price}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <TextInput
            label="Shipping Price (*)" 
            name="shippingPrice"
            id="currencyMask-order-sale-form-shippingPrice"
            errors={errors}
            size="col-xl-6"
            smallText="Shipping price quote to the customer."
            value={formData.price}
            onChange={onInputChange}
          />
        </Li>
      </>
    }
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
  </>
}

const mapDispatchToProps = dispatch => ({
  setIsSelectingCustomer: payload => dispatch(setIsSelectingCustomer(payload))
})

export default connect(null, mapDispatchToProps)(OrderSaleForm);