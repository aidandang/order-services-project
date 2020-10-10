import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';

// components
import Title from '../title/title.component';
import OrderInfo from './order-info.component';

const title = {
  name: 'Order Information',
  message: 'Detail information about the order. The information can be edited.',
}

const OrderByIdInfo = ({ order }) => {

  const location = useLocation();

  title.button = {
    text: 'Edit',
    link: `${location.pathname}?type=edit`
  }

  return <>
    <Title title={title} />
    <OrderInfo order={order} />
  </>
}

export default OrderByIdInfo;