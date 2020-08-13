import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Orders from '../view/orders/containers/Orders';

export default function OrderRoutes() {
  return <>
    <Switch>
      <Route 
        exact
        path="/app/orders"
        render={() => <Orders />}
      />
    </Switch>
  </>
}