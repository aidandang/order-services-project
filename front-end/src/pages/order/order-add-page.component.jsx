import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import OrderAdd from '../../components/order-add/order-add.component';
import OrderInfo from '../../components/order-add/order-info.component';

// initial values
const title = {
  name: 'Add Order',
  message: 'Create a new order. Order can be imported in excel format.'
}

// main component
const OrderAddPage = () => {

  const location = useLocation();

  const queryStr = queryString.parse(location.search);
  const { select, action } = queryStr;

  return <>
    <Title title={title} />
    
    { select === undefined &&  <OrderAdd /> }
    { 
      select === 'order-info' && <>
        {
          action === undefined && 
          <OrderInfo />
        }
      </>
    }
  </>
}

export default OrderAddPage;