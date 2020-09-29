import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import OrderList from '../../components/order-list/order-list.component';
import OrderByIdEdit from '../../components/order-by-id-edit/order-by-id-edit.component';

const OrderListPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;
  
  return <>
    { type !== 'add' && <OrderList /> }
    { type === 'add' && <OrderByIdEdit />}
  </>
}

export default OrderListPage;