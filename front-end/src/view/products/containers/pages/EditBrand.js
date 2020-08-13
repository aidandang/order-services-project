import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import * as Yup from "yup";

// import components, actions, settings.
import { useForm } from '../../../../utils/useForm';

import BrandForm from '../../components/BrandForm';

import { patchData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// map state and dispatch to props
const mapStateToProps = (state) => ({
  brands: state.data.brands.allIds,
  id: state.ui.pageWrapper.tabbar.active.page.id,
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// set form schema
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required"),
  preferredName: Yup
    .string()
});

// set form state
const formState = {
  name: "",
  preferredName: "",
};

const EditBrand = ({ brands, id, patchData, pageActive }) => {
  const brand = brands.find(brand => brand._id === id);
  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(brand, formState, formSchema);

  // form submit function
  const formSubmit = e => {
    e.preventDefault();
    patchData('/brands/' + brand._id, formData, FetchType);
  }

  // main component
  return <>
    <BrandForm 
      formData={formData}
      formSubmit={formSubmit}
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
      pageActive={pageActive}
      page={{ name: 'BRAND_LIST' }}
      title='Edit Brand'
    />
  </>
}

export default connect(mapStateToProps, { patchData, pageActive })(EditBrand);