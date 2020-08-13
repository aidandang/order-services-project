import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../hooks/useForm';

// import _shared components

// import child components
import EditProductForm from '../../components/EditProductForm';

// import redux middleware, actions and settings
import { patchData, getData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  brands: state.data.brands.allIds,
  pageWrapper: state.ui.pageWrapper
})
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

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
  sku: Yup
    .string(),
  desc: Yup
    .string(),
  colors: Yup
    .array(),
  rev: Yup
    .array(),
  active: Yup
    .boolean()
});

// set form state
const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  sku: "",
  desc: "",
  colors: [],
  rev: [],
  active: ""
};

// MAIN COMPONENT
const GeneralSettings = ({ 
  product, 
  brands, 
  getData, 
  patchData, 
  pageActive
}) => {
  const params = useParams();
  const location = useLocation();

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(product, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();

    let changes = {...formData};

    // clean up brand array which used to get brand name
    if (changes.brand.length > 0) {
      delete changes['brand'];
    }
    
    patchData('/products/' + params.id, changes, FetchType);
  }

  useEffect(() => {
    getData('/brands', location.search, FetchType, { name: 'EDIT_PRODUCT' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <> 
    <EditProductForm
      formSubmit={formSubmit}
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
      brands={brands}
      pageActive={pageActive}
    />
  </>
}

export default connect(mapStateToProps, { patchData, getData, pageActive })(GeneralSettings);