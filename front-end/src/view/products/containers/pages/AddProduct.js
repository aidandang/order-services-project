import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';

// import _shared components

// import child components
import AddProductForm from '../../components/AddProductForm';

// import redux middleware, actions and settings
import { getData, postData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper,
  brands: state.data.brands.allIds
});
const pageActive = page => dispatch => {
  dispatch(setPageActive(page))
}

// set form schema
const colorSchema = Yup.object().shape({
  color: Yup
    .string()
    .required("Style No is required."),
  url: Yup
    .string(),
  image: Yup
    .string()
})

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
  sku: Yup
    .string(),
  desc: Yup
    .string(),
  colors: Yup
    .array()
    .of(colorSchema),
  rev: Yup
    .array(),
  active: Yup
    .boolean()
});

const colorState = {
  color: "",
  url: "",
  image: ""
}

// set form state
const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  sku: "",
  desc: "",
  colors: [colorState],
  rev: [],
  active: true
};

// MAIN COMPONENT
const AddProduct = ({
  getData, 
  postData,
  pageWrapper,
  brands,
  pageActive
}) => {
  
  const page = { name: 'PRODUCT_LIST' };

  const location = useLocation();

  // set new product form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // a new product form submit
  const formSubmit = e => {
    e.preventDefault();
    postData('/products', formData, FetchType, page);
  }

  // get Brand list for the brand select-options form element input
  useEffect(() => {
    getData('/brands', location.search, FetchType, { name: 'ADD_PRODUCT' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <AddProductForm 
      formData={formData} 
      formSubmit={formSubmit}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      brands={brands}
      pageActive={pageActive}
      page={page}
    />
  </>
}

export default connect(mapStateToProps, { getData, postData, pageActive })(AddProduct);