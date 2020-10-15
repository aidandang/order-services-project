import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomerListPage from '../../pages/customer-list-page/customer-list-page.component';
import CustomerInfoPage from '../../pages/customer-info-page/customer-info-page.component';

export default function CustomerRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/customer/:id" render={() => <CustomerInfoPage />} />
      <Route exact path="/app/customer" render={() => <CustomerListPage />} />
    </Switch>
  </>
}