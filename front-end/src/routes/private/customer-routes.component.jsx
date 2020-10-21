import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CustomerAllIds from '../../pages/customer-all-ids/customer-all-ids.component';
import CustomerById from '../../pages/customer-by-id/customer-by-id.component';

export default function CustomerRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/customer/:id" render={() => <CustomerById />} />
      <Route path="/app/customer" render={() => <CustomerAllIds />} />
    </Switch>
  </>
}