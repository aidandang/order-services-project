import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';

// components
import StyleInfo from './style-info.component';
import ColorInfo from './color-info.component';
import Title from '../title/title.component';

const title = {
  name: 'Product Detail',
  message: 'Detail information about the product. The information can be edited.',
}

const ProductByIdInfo = ({ product }) => {

  const location = useLocation();

  title.button = {
    text: 'Edit',
    link: `${location.pathname}?type=edit`
  }

  return <>
    <Title title={title} />
    <div className="row">
      <div className="col-xl-8 add-style-col">
        <StyleInfo product={product} />
      </div>
      <div className="col-xl-4 add-color-col">
        <ColorInfo product={product}/>
      </div>
    </div>
  </>
}

export default ProductByIdInfo;