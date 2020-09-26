import React from 'react';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const StyleInfo = ({ 
  product
}) => {

  // Check if brand name was deleted or not to avoid system crash for undefined error.
  let brandName = "N/A";
  if (product && product.brand && product.brand[0].preferredName.length > 0) brandName = product.brand[0].preferredName;

  return <>
    {product &&
      <div className="row">
        <div className="col-12">
          {/* Product Information Card */}
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Product Information</div>
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

export default StyleInfo;