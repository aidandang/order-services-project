import React, { useState } from 'react';

// components
import OrderProducts from './order-products.component';
import OrderItems from './order-items.component'

const AddItems = ({ 
  order,
  setOrder
}) => {

  const [selectProduct, setSelectProduct] = useState(false);

  return <>
    <OrderItems order={order} setSelectProduct={setSelectProduct} />
    {
      selectProduct &&
        <OrderProducts order={order} setSelectProduct={setSelectProduct} />  
    }
  </>
}

export default AddItems;