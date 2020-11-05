import React from 'react';

// components
import { Card, Ul, Li, TextInput} from '../tag/tag.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';

const OrderSaleForm = ({
  formData,
  errors,
  onInputChange,
  customer,
  address
}) => {
  return <>
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
  </>
}

export default OrderSaleForm;