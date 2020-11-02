import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import Order from '../../components/order/order.component';
import OrderAdd from '../../components/order/order-add.component';
import OrderInfo from '../../components/order/order-info.component';
import OrderItem from '../../components/order/order-item.component';
import OrderCost from '../../components/order/order-cost.component';
import OrderSale from '../../components/order/order-sale.component';

// initial values
const titles = [
  {
    comp: undefined,
    name: 'Order List',
    message: 'Search for orders(s) by order number, data and items.'
  },
  {
    comp: 'add',
    name: 'Add Order',
    message: 'Create a new order by selecting information to fill in.'
  },
]

// main component
const OrderPage = () => {

  const location = useLocation();
  const queryStr = queryString.parse(location.search);

  const { comp, select } = queryStr;

  const title = titles.find(item => item.comp === comp);

  return <>

    <Title title={title} />
    { comp === undefined && <Order /> }
    {
      comp === 'add' && <>
        { select === undefined && <OrderAdd /> }
        { select === 'order-info' && <OrderInfo /> }
        { select === 'order-item' && <OrderItem /> }
        { select === 'order-cost' && <OrderCost /> }
        { select === 'order-sale' && <OrderSale /> }
      </>
    }
  </>
}

export default OrderPage;