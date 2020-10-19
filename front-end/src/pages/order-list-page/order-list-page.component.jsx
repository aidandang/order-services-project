import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import OrderList from '../../components/order-list/order-list.component';
import OrderAdd from '../../components/order-add/order-add.component';

// initial values
const title = {
  name: 'Order List',
  message: 'Search for order(s) by order number, date and items.'
}

// main component
const OrderListPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;
  
  return <>
    
    <Title title={title} />

    { action === 'order-add' && <OrderAdd /> }
    { action === undefined && <OrderList /> }
      
    
  </>
}

export default OrderListPage;