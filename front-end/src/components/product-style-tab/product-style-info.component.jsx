import React from 'react';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductById } from '../../state/product/product.selectors';
import { productSetIsEdit } from '../../state/product/product.actions';

// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const ProductStyleInfo = ({ product, productSetIsEdit }) => {

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
                    productSetIsEdit(true)
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
                  <span className="font-weight-bold">{`Style No. ${product.styleCode}`}</span><br />
                  <span className="font-weight-bold">{product.colors[0].color}</span>
                </div>
                <div className="col-8">
                  <img 
                    className="product-img my-2" 
                    src={product.colors[0].image} alt={product.name} 
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

const mapStateToProps = createStructuredSelector({
  product: selectProductById
})

const mapDispatchToProps = dispatch => ({
  productSetIsEdit: (value) => dispatch(productSetIsEdit(value))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductStyleInfo);