import React from 'react';

// component
import ProductEdit from './product-edit.component';
import withBrandData from '../api/withBrandData';

const GetBrandList = ({
  byId,
  data,
  goBack
}) => {
  return <>
    <ProductEdit byId={byId} brands={data.allIds} goBack={goBack} />
  </>
}

export default withBrandData(GetBrandList);