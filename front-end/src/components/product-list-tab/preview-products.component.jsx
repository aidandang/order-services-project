import React from 'react';

// components
import ProductCard from './product-card.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductAllIds } from '../../state/product/product.selectors';

const PreviewProducts = ({
  products
}) => {

  const { allIds } = products;

  return <>
    <div className="row">
      {allIds.map(product => Object.keys(product.colors).length > 0 &&
        <div key={product._id} className="col-lg-6 col-xl-4"> 
          <ProductCard product={product} />
        </div>
      )}
    </div>  
  </>
}

const mapStateToProps = createStructuredSelector({
  products: selectProductAllIds
})

export default connect(mapStateToProps)(PreviewProducts);