import React, { useEffect } from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import AddStyle from './add-style.component';
import PreviewColors from './preview-colors.component';
import AddColor from './add-color.component';
import AddBrand from '../brand/add-brand.component';
// redux
import { connect } from 'react-redux';
import { getReq } from '../../state/api/get-request';
import { BrandActionTypes } from '../../state/brand/brand.types';

// ui settings
import './add-product.styles.css';

const AddProduct = ({
  getReq
}) => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;
  
  useEffect(() => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    getReq('/brands', fetchSuccess)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <div className="row">
      <div className="col-xl-8 add-style-col">
        { !action && <AddStyle /> }
        { action === 'add-color' && <AddColor />}
        { action === 'add-brand' && <AddBrand />}
      </div>
      <div className="col-xl-4 add-color-col">
        <PreviewColors />
      </div>
    </div>
  </>
}

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(null, mapDispatchToProps)(AddProduct);