import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const ColorInfo = ({
  product
}) => {

  const location = useLocation();

  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">Product Colors</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <Link 
                to={`${location.pathname}?type=edit&action=add-color`} 
                className="a-link-cs"
              >
                (+) Add a New Color 
              </Link>
            </div>
          </div>
        </li>
        { 
          product && product.colors && product.colors.length > 0 && 
            product.colors.map((color, index) => 
              <li key={color._id} className={liClassName}>
                <div className="row"> 
                  <div className="col align-self-center text-center">
                    <img
                      className="my-2 product-img"
                      src={color.image} alt={color.color}
                    />
                  </div>
                  <div className="col align-self-center">
                    <span>{color.color}</span><br />
                  </div>
                </div>
              </li>
            )
        }

      </ul>
    </div>
  </>
}

export default ColorInfo;