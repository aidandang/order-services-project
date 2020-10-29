import React from 'react';

// components
import Title from '../../components/title/title.component';
import OrderList from '../../components/order-list/order-list.component';

// initial values
const title = {
  name: 'Order',
  message: 'Search for orders(s) by order number, data and items.'
}

// main component
const Order = () => {

  return <>
    <Title title={title} />
    <OrderList /> 
  </>
}

export default Order;