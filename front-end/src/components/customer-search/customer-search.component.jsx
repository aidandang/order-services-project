import React, { useState } from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
import * as Yup from "yup";

// components
import { useForm } from '../hook/use-form';
import CustomerSearchForm from './customer-search-form.component';
import PreviewCustomers from './preview-customers.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { getReq } from '../../state/api/get-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});

const formState = {
  search: ''
}

// main component
const CustomerSearch = ({ 
  getReq, 
  data, 
  alertMessage
}) => {
  
  const location = useLocation();
  const history = useHistory();

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const [active, setActive] = useState(null);
  
  // handle search form 
  const formSubmit = (e, page) => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      if (page) queryStr = queryStr + `${queryStr === '' ? '?' : '&'}page=${page}`;
      getReq('/customers', fetchSuccess, queryStr);
      setActive(page)
    }
  }

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    history.push(location.pathname + '/' + customer._id)
  }
  
  return <>
    { 
      alertMessage 
      ? <AlertMesg />
      : <> 
        <CustomerSearchForm
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />
        {
          data && data.allIds && data.allIds.length > 0 && data.info && <>
            <PaginationBar  
              numberOfPages={data.info.pages}
              limit={5}
              onPageChange={formSubmit}
              page={active}
            />
            <PreviewCustomers handleOnClick={handleOnClick} />
            <PaginationBar 
              numberOfPages={data.info.pages}
              limit={5}
              onPageChange={formSubmit}
              page={active}
            /> 
          </>
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSearch);