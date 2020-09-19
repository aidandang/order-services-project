import React from 'react';

// components
import AddStyle from './add-style.component';
import AddColor from './add-color.component';

// ui settings
import './add-product.styles.css';

const AddProduct = () => {
  return <>
    <div className="row">
      <div className="col-xl-8 add-style-col">
        <AddStyle />
      </div>
      <div className="col-xl-4 add-color-col">
        <AddColor />
      </div>
    </div>
  </>
}

export default AddProduct;