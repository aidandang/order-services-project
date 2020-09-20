import React from 'react';

// components
import ProductCard from './product-card.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';

const PreviewProducts = ({
  data
}) => {

  const { allIds } = data;

  return <>
    <div className="row">
      {
        allIds.map(product => 
          <div key={product._id} className="col-lg-6 col-xl-4"> 
            <ProductCard product={product} />
          </div>
      )}
    </div>  
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

export default connect(mapStateToProps)(PreviewProducts);