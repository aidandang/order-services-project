import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductAllIds from '../../pages/product-all-ids/product-all-ids.component';
import ProductById from '../../pages/product-by-id/product-by-id.component';

export default function ProductRoutes() {
  return <>
    <Switch>
      <Route exact path="/app/product/:id" render={() => <ProductById />} />
      <Route path="/app/product" render={() => <ProductAllIds />} />
    </Switch>
  </>
}