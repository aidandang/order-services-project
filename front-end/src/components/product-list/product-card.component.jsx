import React from 'react';

// components
import { Li } from '../tag/tag.component';
import { useHistory, useLocation } from 'react-router-dom';

const ProductCard = ({
  product
}) => {

  const location = useLocation();
  const history = useHistory();

  const handleOnClick = (e, product) => {
    e.preventDefault();
    const search = `?id=${product._id}&action=product-info`
    const path = location.pathname + search;

    history.push(path, {
      from: location.pathname + location.search
    })
  }

  return <>
    <Li>
      <div className="row li-link-cs" onClick={e => handleOnClick(e, product)}> 
        <div className="col-10">
          <div className="row mt-2">
            <div className="col-3 d-none d-lg-block">
              Product Name:
            </div>
            <div className="col-lg-9">
              {product.name}
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              Brand:
            </div>
            <div className="col-lg-9">
              {product.brand.preferredName}
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              Style Code:
            </div>
            <div className="col-lg-9">
              {product.styleCode}
            </div>
          </div>
          <div className="row">
            <div className="col-3 d-none d-lg-block">
              Colors:
            </div>
            <div className="col-lg-9">
              {product.colors.map((color, index) => <span key={index}>{index > 0 ? ` | ${color.color}` : color.color}</span>)}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-3 d-none d-lg-block">
              Description:
            </div>
            <div className="col-lg-9">
              {product.desc}
            </div>
          </div>
        </div>
        <div className="col-2 text-center">
          <img 
            className="product-img my-2" 
            src={product.styleImage} alt={product.brand.preferredName} 
          />
        </div>
      </div>
    </Li>
  </>
}

export default ProductCard;