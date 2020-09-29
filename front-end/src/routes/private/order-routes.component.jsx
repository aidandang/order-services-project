import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OrderListPage from '../../pages/order-list-page/order-list-page.component';
import OrderByIdPage from '../../pages/order-by-id-page/order-by-id-page.component';

export default function OrderRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/order/:id" render={() => <OrderByIdPage />} />
      <Route exact path="/app/order" render={() => <OrderListPage />} />
    </Switch>
  </>
}