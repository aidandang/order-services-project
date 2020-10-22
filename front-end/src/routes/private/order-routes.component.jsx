import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OrderAllIds from '../../pages/order-all-ids/order-all-ids.component';
import OrderById from '../../pages/order-by-id/order-by-id.component';

export default function OrderRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/order/:id" render={() => <OrderById />} />
      <Route exact path="/app/order" render={() => <OrderAllIds />} />
    </Switch>
  </>
}