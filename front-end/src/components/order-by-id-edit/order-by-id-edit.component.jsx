import React, { useState } from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import Title from '../title/title.component';
import Stagebar from '../stagebar/stagebar.component';
import OrderCustomerInfo from './order-customer-info.component';

const OrderByIdEdit = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type, stage } = queryObj;

  let titleName = 'Edit Order';
  if (type === 'add') titleName = 'Add Order';

  const title = {
    name: titleName,
    message: 'Add or edit an order and its items.'
  }

  const stageList = [
    {
      name: 'select-customer',
      text: '1. Select Customer'
    },
    {
      name: 'add-items',
      text: '2. Add Items'
    },
    {
      name: 'preview-and-submit',
      text: '3. Preview and Submit'
    }
  ]

  let active = "";
  if (stage) { 
    active = stage 
  } else {
    active = 'select-customer'
  }

  const initialState = {
    customer: null,
    shippingAddress: null,
    items: []
  }

  const [order, setOrder] = useState(initialState)

  return <>
    <Title title={title} />
    <Stagebar stageList={stageList} active={active} />
    {
      (!stage || stage === 'select-customer') &&
      <OrderCustomerInfo order={order} setOrder={setOrder} />
    }
  </>
}

export default OrderByIdEdit;