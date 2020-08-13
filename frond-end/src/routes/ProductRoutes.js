import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Products from '../view/products/containers/Products';
import ProductSettings from '../view/products/containers/ProductSettings';

export default function ProductRoutes() {
  return <>
    <Switch>
      <Route 
        exact
        path="/app/products"
        render={() => <Products />}
      />
      <Route 
        exact
        path="/app/products/:id"
        render={() => <ProductSettings />}
      />
    </Switch>
  </>
}