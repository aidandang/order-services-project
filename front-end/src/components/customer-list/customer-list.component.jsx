import React, { useEffect } from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';

// components
import CustomerSearch from '../customer-search/customer-search.component';
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

  const location = useLocation();
  const history = useHistory();

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    history.push(location.pathname + '/' + customer._id)
  }

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    getReq('/customers', fetchSuccess);
    // eslint-disable-next-line
  }, []);

  return <>
    { 
      alertMessage 
      ? <AlertMesg />
      : <CustomerSearch handleOnClick={handleOnClick} />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);