import React, { useEffect, useState } from 'react';

// components
import { Card, Ul, Li, SelectInput } from '../tag/tag.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import ProductBrandEdit from '../product-brand-edit/product-brand-edit.component';
import ProductBrandRemove from '../product-brand-remove/product-brand-remove.component';
import ProductBrandAdd from '../product-brand-add/product-brand-add.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBrandData } from '../../state/brand/brand.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { getReq } from '../../state/api/get-request';
import { BrandActionTypes } from '../../state/brand/brand.types';

// main component
const ProductBrandsUpdate = ({
  getReq,
  alertMessage,
  data
}) => {

  const initialState = {
    _id: '',
    name: '',
    preferredName: '',
    createdAt: ''
  }

  const [brand, setBrand] = useState(initialState);
  const [action, setAction] = useState('');

  const { allIds } = data;

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

  useEffect(() => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    getReq('/brands', fetchSuccess)
    // eslint-disable-next-line
  }, [])

  return <>
    {
      alertMessage 
      ? 
      <AlertMesg />
      : 
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
                    optionKey="name" 
                  />
                </Li>
                {
                  brand._id !== "" && allIds.find(item => item._id === brand._id) &&
                  <Li>
                    <div className="row">
                      <div className="col-8">
                        {allIds.find(item => item._id === brand._id).name},
                        <span>{' '}</span> 
                        {allIds.find(item => item._id === brand._id).preferredName}
                      </div>
                      <div className="col-4 text-right">
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
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectBrandData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandsUpdate);