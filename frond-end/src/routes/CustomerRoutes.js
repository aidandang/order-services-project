import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Customers from '../view/customers/containers/Customers';
import CustomerSettings from '../view/customers/containers/CustomerSettings';

export default function CustomerRoutes() {
  return <>
    <Switch>
      <Route
        exact 
        path="/app/customers" 
        render={() => <Customers />}
      />
      <Route 
        exact
        path="/app/customers/:id"
        render={() => <CustomerSettings />}
      />
    </Switch>
  </>
}