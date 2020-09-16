import React from 'react';

// components
import ProductColorCard from './product-color-card.component';
import AddColorCard from './add-color-card.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductById } from '../../state/product/product.selectors';

const ProductColorInfo = ({ productById }) => {
  return <>
    <div className="row">
      { 
        productById.colors.map(color => 
          <div key={color._id} className="col-xl-4 col-lg-6">
            <ProductColorCard color={color} />
          </div>
        )
      }
      <div className="col-xl-4 col-lg-6">
        <AddColorCard />
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  productById: selectProductById
})

export default connect(mapStateToProps)(ProductColorInfo);