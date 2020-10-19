import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductListPage from '../../pages/product-list-page/product-list-page.component';
import ProductInfoPage from '../../pages/product-info-page/product-info-page.component';
import ProductAddPage from '../../pages/product-add-page/product-add-page.component';

export default function ProductRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/product/add" render={() => <ProductAddPage />} />
      <Route exact path="/app/product/:id" render={() => <ProductInfoPage />} />
      <Route exact path="/app/product" render={() => <ProductListPage />} />
    </Switch>
  </>
}