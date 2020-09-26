import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomerListPage from '../../pages/customer-list-page/customer-list-page.component';
import CustomerByIdPage from '../../pages/customer-by-id-page/customer-by-id-page.component';

export default function CustomerRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/customer/:id" render={() => <CustomerByIdPage />} />
      <Route exact path="/app/customer" render={() => <CustomerListPage />} />
    </Switch>
  </>
}