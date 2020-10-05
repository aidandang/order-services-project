import React, { useState } from 'react';

// components
import SelectProduct from './select-product.component';
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
        <SelectProduct order={order} setSelectProduct={setSelectProduct} />  
    }
  </>
}

export default AddItems;