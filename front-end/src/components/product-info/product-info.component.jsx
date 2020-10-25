import React, { useState } from 'react';

// components
import withProductData from '../api/withProductData';
import { Container, Card, Ul, Li } from '../tag/tag.component';
import GetBrandList from './get-brand-list.component';
import ProductColor from './product-color.component';

const ProductInfo = ({ 
  data
}) => {

  const { byId } = data;

  const [edit, setEdit] = useState('');

  const goBack = () => {
    setEdit('')
  }

  return <> 
    {
      edit === '' &&
      <Container width="col">
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
                          setEdit('product-edit')
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
    }
    {
      edit === 'product-edit' &&
      <GetBrandList
        pathname={`/brands`} 
        component='get-brand-list' 
        byId={byId} 
        goBack={goBack} 
      /> 
    }
  </>
}

export default withProductData(ProductInfo);