import React from 'react';

// components
import { Card, Ul, Li } from '../tag/tag.component';

const ProductStyleInfo = ({ 
  product,
  setAction
}) => {

  return <>
    {product &&
      <Card width="col" title="Product Style">
        <Ul>

          <Li>
            <div className="row">
              <div className="col-4 align-self-center"><span className="font-weight-bold">Product Name:</span></div>
              <div className="col-8">{product.name}</div>
            </div>
            <div className="row">
              <div className="col-4 align-self-center"><span className="font-weight-bold">Brand:</span></div>
              <div className="col-8">{product.brand.preferredName}</div>
            </div>
            <div className="row">
              <div className="col-4 align-self-center"><span className="font-weight-bold">Style Code:</span></div>
              <div className="col-8">{product.styleCode}</div>
            </div>
            <div className="row">
              <div className="col-4 align-self-center"><span className="font-weight-bold">Description:</span></div>
              <div className="col-8">{product.desc}</div>
            </div>
          </Li>

          <Li>
            <div className="row">
              <div className="col-4">
                <span className="font-weight-bold">Sample Image:</span>
              </div>
              <div className="col-8">
                <img 
                  className="product-img my-2" 
                  src={product.styleImage} alt={product.name} 
                />
              </div>
            </div>
          </Li>

          <Li>
            <div className="row">
              <div className="col">
                <a 
                  href="/"
                  className="a-link-cs"
                  onClick={e => {
                    e.preventDefault();
                    setAction('edit')
                  }}
                >
                  Update Information
                </a>
              </div>
            </div>
          </Li>

        </Ul>
      </Card>
    }
  </>
}

export default ProductStyleInfo;