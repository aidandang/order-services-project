import React, { useState } from 'react';

// components
import { Card, Ul, Li, SelectInput } from '../tag/tag.component';
import ProductBrandEdit from './product-brand-edit.component';
import ProductBrandRemove from './product-brand-remove.component';
import ProductBrandAdd from './product-brand-add.component';

// main component
const ProductBrand = ({
  allIds
}) => {

  const initialState = {
    _id: '',
    name: '',
    preferredName: '',
    createdAt: ''
  }

  const [brand, setBrand] = useState(initialState);
  const [action, setAction] = useState('');

  const onInputChange = e => {
    e.preventDefault();

    const id = e.target.value;

    const selectedBrand = allIds.find(item => item._id === id)

    if (selectedBrand) {
      setBrand(prevState => ({ ...prevState, ...selectedBrand }))
    } else {
      setBrand(prevState => ({ ...prevState, ...initialState }))
    }
  }

  return <>
    <Card width="col-12" title="Update Brands">
      <Ul>
        
        {
          action === 'add'
          ? 
          <ProductBrandAdd setAction={setAction} />           
          :
          <>
            <Li>
              <SelectInput
                label="Brand List"
                name="brands"
                size="col-12"
                smallText="Select a brand to edit."
                defaultValue=""
                defaultText="..."
                value={brand._id}
                onChange={onInputChange}
                data={allIds ? allIds : []}
                valueKey={'_id'}
                textKey={'name'}
              />
            </Li>
            {
              brand._id !== "" && allIds.find(item => item._id === brand._id) &&
              <Li>
                <div className="row">
                  <div className="col">
                    {allIds.find(item => item._id === brand._id).name},
                    <span>{' '}</span> 
                    {allIds.find(item => item._id === brand._id).preferredName}
                  </div>
                </div>
                <div className="row">
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
            }
            {
              action === 'edit' &&
              <ProductBrandEdit brand={brand} setAction={setAction} />
            }
            {
              action === 'remove' &&
              <ProductBrandRemove brand={brand} setAction={setAction} />
            }
            <Li>
              <div className="row">
                <div className="col">
                  <a href="/" className="a-link-cs" onClick={e => {
                    e.preventDefault();
                    setAction('add')
                  }}>( + ) Add a New Brand</a>
                </div>
              </div>
            </Li>
          </>
        }

      </Ul>
    </Card> 
  </>
}

export default ProductBrand;