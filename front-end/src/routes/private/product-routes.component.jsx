import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductListPage from '../../pages/product-list-page/product-list-page.component';
import ProductByIdPage from '../../pages/product-by-id-page/product-by-id-page.component';

export default function ProductRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/product/:id" render={() => <ProductByIdPage />} />
      <Route exact path="/app/product" render={() => <ProductListPage />} />
    </Switch>
  </>
}