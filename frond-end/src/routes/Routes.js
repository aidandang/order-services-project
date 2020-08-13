import React from 'react';

import DashboardRoutes from './DashboardRoutes';
import ProductRoutes from './ProductRoutes';
import CustomerRoutes from './CustomerRoutes';
import OrderRoutes from './OrderRoutes';

export default function Routes() {
  return <>
    <DashboardRoutes />
    <ProductRoutes />
    <CustomerRoutes />
    <OrderRoutes />
  </>
}