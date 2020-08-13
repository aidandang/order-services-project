import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';

// import _shared components

// import child components
import ColorForm from '../../components/ColorForm';

// import redux middleware, actions and settings
import { patchData } from '../../../../state/_shared/middleware/api';
import { setPageActive } from '../../../../state/actions/ui';
import { FetchType } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  product: state.data.products.byId,
  pageWrapper: state.ui.pageWrapper
});
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
const EditColor = ({
  pageWrapper,
  product,
  patchData,
  pageActive
}) => {

  const { page } = pageWrapper.tabbar.active;
  const params = useParams();

  const query = `/colors/${page.id}`;

  const color = product.colors.find(color => 
    color._id === page.id
  );

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(color, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    patchData('/products/' + params.id + query, formData, FetchType, { name: 'COLOR_LIST', id: '' });
  }

  return <>
    <ColorForm
      formSubmit={formSubmit}
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
      pageActive={pageActive}
      title={'EDIT COLOR'}
    />
  </>
}

export default connect(mapStateToProps, { patchData, pageActive })(EditColor);