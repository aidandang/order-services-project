import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductListPage from '../../pages/product-list-page/product-list-page.component';

export default function ProductRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/product" render={() => <ProductListPage />} />
    </Switch>
  </>
}