import React from 'react';

// dependecies
import { Link, useLocation, useHistory } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { updateProductStyle } from '../../state/product/product.actions';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const StyleInfo = ({ 
  product,
  updateProduct
}) => {

  const location = useLocation();
  const history = useHistory();

  // Check if brand name was deleted or not to avoid system crash for undefined error.
  let brandName = "N/A";
  if (product && product.brand && product.brand[0].preferredName.length > 0) brandName = product.brand[0].preferredName;

  const handleEditProduct = (e) => {
    e.preventDefault();
    updateProduct(product);
    history.push(`${location.pathname}?type=edit-product${location.search && '&' + location.search}`)
  }

  return <>
    {product &&
      <div className="row">
        <div className="col-12">
          {/* Product Information Card */}
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Product Information</div>
                <div className="col text-right">
                  <Link 
                    to={`${location.pathname}?type=edit-product${location.search && '&' + location.search}`} 
                    className="a-link-cs"
                    onClick={handleEditProduct}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Name</span></div>
                  <div className="col-8">{product.name}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Brand</span></div>
                  <div className="col-8">{brandName}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Style No.</span></div>
                  <div className="col-8">{product.styleCode}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center"><span className="font-weight-bold">Description</span></div>
                  <div className="col-8">{product.desc}</div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col-4 align-self-center">
                    <span className="font-weight-bold">Sample Image</span>
                  </div>
                  <div className="col-8">
                    <img 
                      className="product-img my-2" 
                      src={product.styleImage} alt={product.name} 
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* End of Account Information Card */}
        </div>
      </div>
    }
  </>
}

const mapDispatchToProps = dispatch => ({
  updateProduct: product => dispatch(updateProductStyle(product))
})

export default connect(null, mapDispatchToProps)(StyleInfo);