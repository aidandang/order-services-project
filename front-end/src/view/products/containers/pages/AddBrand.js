import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';

// import _shared components

// import child components
import BrandForm from '../../components/BrandForm';

// import redux middleware, actions and settings
import { postData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props.
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper
});
const pageActive = page => dispatch => {
  dispatch(setPageActive(page));
}

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required."),
  preferredName: Yup
    .string()
    .required("Preferred name is required.")
});

// set form state
const formState = {
  name: "",
  preferredName: ""
};

// MAIN COMPONENT
const AddBrand = ({
  pageWrapper,
  postData,
  pageActive
}) => {

  const { tab } = pageWrapper.tabbar.active;
  const page = { name: 'BRAND_LIST' };

  // redirect to the parent component after adding a new brand 
  // or close this component
  if (tab === 'PRODUCT_LIST') page.name = 'ADD_PRODUCT';
  if (tab === 'ADD_ORDER') page.name = 'ADD_PRODUCT';

  // set new brand form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // a new brand submit form
  const formSubmit = e => {
    e.preventDefault();
    postData('/brands', formData, FetchType, page);
  }

  // main component
  return <>
    <BrandForm 
      formData={formData}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      formSubmit={formSubmit}
      pageActive={pageActive}
      page={page}
      title='Add Brand'
    />
  </>
}

export default connect(mapStateToProps, { postData, pageActive })(AddBrand);