import React, { useEffect } from 'react';

// components
import CustomerSearch from './customer-search.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// main component
const CustomerList = ({
  getReq,
  alertMessage
}) => {

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    getReq('/customers', fetchSuccess);
    // eslint-disable-next-line
  }, [location.state]);

  return <>
    { alertMessage && <AlertMesg /> }
    <CustomerSearch />  
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);