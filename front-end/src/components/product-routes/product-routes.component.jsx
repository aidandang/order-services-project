import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductListPage from '../../pages/product-list-page/product-list-page.component';
import ProductByIdPage from '../../pages/product-by-id-page/product-by-id-page.component';
import AddProductPage from '../../pages/add-product-page/add-product-page.component';

export default function ProductRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/product" render={() => <ProductListPage />} />
      <Route path="/app/product/add" render={() => <AddProductPage />} />
      <Route path="/app/product/:id" render={() => <ProductByIdPage />} />
    </Switch>
  </>
}