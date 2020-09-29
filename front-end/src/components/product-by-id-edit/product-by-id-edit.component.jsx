import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom';
import queryString from 'query-string';
// components
import Title from '../title/title.component';
import { useForm } from '../custom-hooks/use-form';
import SubmitCard from '../submit-card/submit-card.component';
import ProductStyleForm from './product-style-form.component';
import PreviewColors from './preview-colors.component';
import AddColor from './add-color.component';
import AddBrand from '../brand/add-brand.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBrandData } from '../../state/brand/brand.selectors';
import { getReq } from '../../state/api/get-request';
import { patchReq } from '../../state/api/patch-request';
import { postReq } from '../../state/api/post-request';
import { BrandActionTypes } from '../../state/brand/brand.types';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required."),
  brandId: Yup
    .string()
    .required("Brand is required."),
  styleCode: Yup
    .string()
    .required('Style code is required.'),
  styleImage: Yup
    .string()
    .required('Style image is required.'),
  sku: Yup
    .string(),
  desc: Yup
    .string(),
  active: Yup
    .boolean()
});
// set form state
const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  styleImage: "",
  sku: "",
  desc: "",
  active: true,
  colors: []
}

const ProductByIdEdit = ({
  product,
  data,
  getReq,
  postReq,
  patchReq,
  alertMessage
}) => {

  const [success, setSuccess] = useState(false);

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type, action } = queryObj;

  let titleName = 'Edit Product';
  if (type === 'add') titleName = 'Add Product';

  const title = {
    name: titleName,
    message: 'Add or edit a product and its colors.'
  }

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(type === 'edit' ? product : formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    if (type === 'edit') {
      patchReq('/products/' + product._id, fetchSuccess, formData, setSuccess)
    }

    if (type === 'add') {
      postReq('/products', fetchSuccess, formData, setSuccess)
    }
  }

  useEffect(() => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    getReq('/brands', fetchSuccess)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    { success && <Redirect to={location.pathname} />}

    <Title title={title} />
    { 
      alertMessage 
      ? <AlertMesg />
      : <>
        <div className="row">
          <div className="col-xl-8 add-style-col">
            { 
              action !== 'add-color' && action !== 'add-brand' &&
                <ProductStyleForm
                  formSubmit={formSubmit}
                  formData={formData} 
                  errors={errors} 
                  onInputChange={onInputChange}
                  brands={data.allIds ? data.allIds : null}
                /> 
            }
            { action === 'add-color' && <AddColor setNewColor={setValues} />}
            { action === 'add-brand' && <AddBrand />}
          </div>
          <div className="col-xl-4 add-color-col">
            <div className="row flex-column">
              <div className="col">
                <SubmitCard formSubmit={formSubmit} buttonDisabled={buttonDisabled} />
              </div>
              <div className="col">
                <PreviewColors colors={formData.colors} setValues={setValues} />
              </div>
            </div>        
          </div>
        </div>
      </>
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
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess)
  ),
  postReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductByIdEdit);