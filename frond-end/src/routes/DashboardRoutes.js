import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../view/dashboard/containers/Dashboard';

export default function CustomerRoutes() {
  return <>
    <Switch>
      <Route
        exact 
        path="/app" 
        render={() => <Dashboard />}
      />
    </Switch>
  </>
}