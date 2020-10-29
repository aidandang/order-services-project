import React from 'react';

// component
import ProductAdd from './product-add.component';
import withBrandData from '../api/withBrandData';

const GetBrandList = ({
  data
}) => {
  return <>
    <ProductAdd brands={data.allIds} />
  </>
}

export default withBrandData(GetBrandList);