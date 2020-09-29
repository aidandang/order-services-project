import React from 'react';

// dependencies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';

// utils
import { useForm } from '../custom-hooks/use-form';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// components
import CustomerSearchForm from './customer-search-form.component';

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const CustomerSearch = () => {

  const history = useHistory();
  const location = useLocation();

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // handle search form 
  const formSubmit = (e) => {
    e.preventDefault();
    
    const queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      history.push(location.pathname + queryStr)
    }
  }

  return <>
    <CustomerSearchForm
      formSubmit={formSubmit} 
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
    />
  </>      
}

export default CustomerSearch;