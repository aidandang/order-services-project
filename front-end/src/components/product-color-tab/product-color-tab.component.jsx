import React from 'react';

// components
import ProductColorInfo from './product-color-info.component';

// redux
import { connect } from 'react-redux';

const ProductColorTab = () => {
  return <>
    <ProductColorInfo />
  </>
}

export default connect()(ProductColorTab);