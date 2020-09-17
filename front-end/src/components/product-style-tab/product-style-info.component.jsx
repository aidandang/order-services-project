import React from 'react';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setEditingStyle } from '../../state/product/product.actions';

// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const ProductStyleInfo = ({ product, setEditingStyle }) => {

  // Check if brand name was deleted or not to avoid system crash for undefined error.
  let brandName = "N/A";
  if (product.brand.length > 0 && product.brand[0].preferredName.length > 0) brandName = product.brand[0].preferredName;

  return <>
    <div className="row">
      <div className="col-12">
        {/* Product Information Card */}
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">Product Information</div>
              <div className="col text-right">
                <a href="/" 
                  className="a-link-cs" 
                  name="accountInfo" 
                  onClick={(e) => { 
                    e.preventDefault();
                    setEditingStyle(true)
                  }}
                >
                  Edit
                </a>
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
                <div className="col-4 align-self-center">
                  <span className="font-weight-bold">{`Style No. ${product.styleCode}`}</span>
                </div>
                <div className="col-8">
                  <img 
                    className="product-img my-2" 
                    src={product.styleImage} alt={product.name} 
                  />
                </div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Description</span></div>
                <div className="col-8">{product.desc}</div>
              </div>
            </li>
          </ul>
        </div>
        {/* End of Account Information Card */}
      </div>
    </div>
  </>
}

const mapDispatchToProps = dispatch => ({
  setEditingStyle: (value) => dispatch(setEditingStyle(value))
})
export default connect(null, mapDispatchToProps)(ProductStyleInfo);