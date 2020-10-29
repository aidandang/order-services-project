import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Order from '../../pages/order/order.component';
import OrderAddPage from '../../pages/order/order-add-page.component';

export default function OrderRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/order/add" render={() => <OrderAddPage />} />
      <Route exact path="/app/order" render={() => <Order />} />
    </Switch>
  </>
}