import React from 'react';

// components
import ProductStyle from './product-style.component';
import ProductColor from './product-color.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';

const ProductInfo = ({ 
  data
}) => {

  const { byId } = data;

  return <>
    <div className="row">
      <div className="col-xl-8 add-style-col">
        <ProductStyle product={byId} />
      </div>
      <div className="col-xl-4 add-color-col">
        <ProductColor product={byId} />
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

export default connect(mapStateToProps)(ProductInfo);