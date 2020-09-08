import React from 'react';

// dependencies
import { useRouteMatch, useHistory } from 'react-router-dom';

// ui settings
import './product-card.styles.css';
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const ProductCard = ({
  product
}) => {

  const match = useRouteMatch()
  const history = useHistory()

  // Check if brand name was deleted or not to avoid system crash for undefined error.
  let brandName = "N/A";
  if (product.brand.length > 0 && product.brand[0].preferredName.length > 0) brandName = product.brand[0].preferredName;

  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col font-weight-bold">
            {brandName}
          </div>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        <li 
          className={`${liClassName} li-link-cs`}
          onClick={e => {
            e.preventDefault();
            history.push(`${match.path}/${product._id}`)
          }} 
        >
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <img 
                className="product-img my-2" 
                src={product.colors[0].image} alt={brandName} 
              />
            </div>
          </div>
        </li>
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center">
              {product.name}
            </div>
          </div>
        </li>
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center">
              {`Style: ${product.styleCode}`}
            </div>
          </div>
        </li> 
      </ul>

    </div>  
  </>
}

export default ProductCard;