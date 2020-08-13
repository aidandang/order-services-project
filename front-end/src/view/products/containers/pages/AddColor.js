import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';

// import _shared components

// import child components
import ColorForm from '../../components/ColorForm';

// import redux middleware, actions and settings
import { postData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  product: state.data.products.byId
})
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// set form schema
const formSchema = Yup.object().shape({
  color: Yup
    .string()
    .required("Color is required"),
  image: Yup
    .string(),
  url: Yup
    .string()
});

// set form state
const formState = {
  color: "",
  image: "",
  url: ""
};

// MAIN COMPONENT
const AddColor = ({ 
  product,
  postData, 
  pageActive 
}) => {

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    postData('/products/' + product._id + '/colors', formData, FetchType, { name: 'COLOR_LIST' });
  }

  return <>
    <ColorForm
      formSubmit={formSubmit}
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
      pageActive={pageActive}
      title={'ADD COLOR'}
    />
  </>
}

export default connect(mapStateToProps, { postData, pageActive })(AddColor);