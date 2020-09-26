import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';

// components
import Title from '../title/title.component';
import BillingInfo from './billing-info.component';
import ShippingInfo from './shipping-info.component';

const title = {
  name: 'Customer Information',
  message: 'Detail information about the product. The information can be edited.',
}

const CustomerByIdInfo = ({ customer }) => {

  const location = useLocation();

  title.button = {
    text: 'Edit',
    link: `${location.pathname}?type=edit`
  }

  return <>
    <Title title={title} />
    <div className="row">
      <div className="col-xl-8 add-style-col">
        <BillingInfo customer={customer} />
      </div>
      <div className="col-xl-4 add-color-col">
        <ShippingInfo customer={customer}/>
      </div>
    </div>
  </>
}

export default CustomerByIdInfo;