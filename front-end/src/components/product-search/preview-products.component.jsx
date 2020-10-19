import React from 'react';

// components
import ProductCard from './product-card.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';

const PreviewProducts = ({
  data,
  handleOnClick
}) => {

  const { allIds } = data;

  return <>
    <div className="row">
      {
        allIds.map(product => 
          <div key={product._id} className="col-12">
            <div className="card my-3">
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col font-weight-bold">
                    {product.name}
                  </div>
                </div>
              </div>
              <ul className="list-group list-group-flush"> 
                <ProductCard product={product} handleOnClick={handleOnClick} />
              </ul>
            </div>
          </div>
      )}
    </div>  
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

export default connect(mapStateToProps)(PreviewProducts);