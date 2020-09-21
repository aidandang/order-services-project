import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import { useForm } from '../custom-hooks/use-form';
import AddStyleForm from './add-style-form.component';
import PreviewColors from './preview-colors.component';
import AddColor from './add-color.component';
import AddBrand from '../brand/add-brand.component';
import SubmitProduct from './submit-product.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductObj } from '../../state/product/product.selectors';
import { removeProductColor } from '../../state/product/product.actions';
import { addProductStyle } from '../../state/product/product.actions';
import { getReq } from '../../state/api/get-request';
import { BrandActionTypes } from '../../state/brand/brand.types';
// ui settings
import './add-product.styles.css';

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
  active: true
}

const AddProduct = ({
  productObj,
  addProductStyle,
  removeProductColor,
  getReq
}) => {

  const history = useHistory();
  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(productObj.name ? productObj : formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    addProductStyle(formData);
    history.push(`${location.pathname}?action=submit`);
  }

  useEffect(() => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    getReq('/brands', fetchSuccess)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    {
      action === 'submit' 
      ? 
        <div className="row">
          <div className="col-xl-8 add-style-col">
            <SubmitProduct />
          </div>
        </div>
      : 
        <div className="row">
          <div className="col-xl-8 add-style-col">
            { 
              !action && 
                <AddStyleForm
                  formSubmit={formSubmit}
                  formData={formData} 
                  errors={errors} 
                  onInputChange={onInputChange} 
                  buttonDisabled={buttonDisabled}
                /> 
            }
            { action === 'add-color' && <AddColor />}
            { action === 'add-brand' && <AddBrand />}
            { action === 'submit' && <SubmitProduct />}
          </div>
          <div className="col-xl-4 add-color-col">
            <PreviewColors productObj={productObj} removeProductColor={removeProductColor} />
          </div>
        </div>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  productObj: selectProductObj
})

const mapDispatchToProps = dispatch => ({
  addProductStyle: payload => dispatch(addProductStyle(payload)),
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr)),
  removeProductColor: index => dispatch(removeProductColor(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);