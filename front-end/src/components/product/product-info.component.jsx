import React from 'react';

// components
import { Container, Card, Ul, Li } from '../tag/tag.component';
import ProductColor from './product-color.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors'; 

const ProductInfo = ({ 
  data,
  setComp
}) => {

  const { byId } = data;

  const goBack = () => {
    setComp('')
  }

  return <> 
    <Container width="col" goBack={goBack}>
      <div className="row">
        <div className="col-xl-8 add-style-col">
          <Card width="col" title="Product Style">
            <Ul>
              <Li>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Product Name:</span></div>
                  <div className="col-8">{byId.name}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Brand:</span></div>
                  <div className="col-8">{byId.brand.preferredName}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Style Code:</span></div>
                  <div className="col-8">{byId.styleCode}</div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Website:</span></div>
                  <div className="col-8"><a href={byId.url} className="a-link-cs">{byId.url}</a></div>
                </div>
                <div className="row mt-1">
                  <div className="col-4"><span className="font-weight-bold">Description:</span></div>
                  <div className="col-8">{byId.desc}</div>
                </div>
              </Li>
              <Li>
                <div className="row">
                  <div className="col-4 mt-1">
                    <span className="font-weight-bold">Sample Image:</span>
                  </div>
                  <div className="col-8">
                    <img 
                      className="product-img my-2" 
                      src={byId.styleImage} alt={byId.name} 
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
                        setComp('product-edit')
                      }}
                    >
                      Update Information
                    </a>
                  </div>
                </div>
              </Li>
            </Ul>
          </Card>
        </div>
        <div className="col-xl-4 add-color-col">
          <ProductColor />
        </div>
      </div>
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

export default connect(mapStateToProps)(ProductInfo);