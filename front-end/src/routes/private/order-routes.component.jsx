import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OrderListPage from '../../pages/order-list-page/order-list-page.component';
import OrderInfoPage from '../../pages/order-info-page/order-info-page.component';

export default function OrderRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/order/:id" render={() => <OrderInfoPage />} />
      <Route exact path="/app/order" render={() => <OrderListPage />} />
    </Switch>
  </>
}