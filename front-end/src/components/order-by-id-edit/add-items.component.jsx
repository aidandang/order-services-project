import React from 'react';

// components
import SelectProduct from './select-product.component';
import OrderItems from './order-items.component'

const AddItems = () => {

  return <>
    <OrderItems />
    <SelectProduct />  
  </>
}

export default AddItems;