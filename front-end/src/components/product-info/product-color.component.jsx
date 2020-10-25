import React, { useState } from 'react';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import ProductColorAdd from './product-color-add.component';
import ProductColorEdit from './product-color-edit.component';
import ProductColorRemove from './product-color-remove.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';

const ProductColor = ({
  data
}) => {

  const { byId } = data;
  const [action, setAction] = useState('')

  return <>
    <Card width="col" title="Product Colors">
      <Ul>

      {
        action === 'add'
        ?
        <ProductColorAdd data={data} setAction={setAction} />
        :
        <>
          {
            byId.colors.length > 0 &&
            byId.colors.map(color => 
              <div key={color._id}>
                <Li key={color._id}>
                  <div className="row">
                    <div className="col">
                      <img className="product-img my-2" src={color.image} alt={byId.name} />
                    </div>
                  </div>
                  <div className="row pt-1">
                    <div className="col">
                      {color.color}
                    </div>
                  </div>
                  <div className="row pt-1">
                    <div className="col">
                      <a href="/" className="a-link-cs" onClick={e => {
                        e.preventDefault();
                        setAction('edit')
                      }}>Edit</a>
                      <span>{' | '}</span>
                      <a href="/" className="a-link-cs" onClick={e => {
                        e.preventDefault();
                        setAction('remove')
                      }}>Remove</a>
                    </div>
                  </div>
                </Li>
                {
                  action === 'edit' &&
                  <ProductColorEdit data={data} colorTemp={color} setAction={setAction} />
                }
                {
                  action === 'remove' &&
                  <ProductColorRemove data={data} colorTemp={color} setAction={setAction} />
                }
              </div>
            )
          }
          <Li>
            <div className="row">
              <div className="col">
                <a 
                  href="/"
                  className="a-link-cs"
                  onClick={e => {
                    e.preventDefault()
                    setAction('add')
                  }}
                >
                  ( + ) Add a New Color
                </a>
              </div>  
            </div>
          </Li>  
        </>
      }

      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

export default connect(mapStateToProps)(ProductColor);