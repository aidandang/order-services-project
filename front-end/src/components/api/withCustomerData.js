import React, { useEffect, useState } from 'react';

// components
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { getReq } from '../../state/api/api.requests';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const withCustomerData = (WrapperComponent) => {
  const WithCustomerData = ({ 
    data, 
    getReq,
    alertMessage,
    pathname,
    queryStr,
    component, 
    ...props 
  }) => {

    const [success, setSuccess] = useState(false);
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS

    useEffect(() => {
      getReq(pathname, fetchSuccess, queryStr, setSuccess, component)
      // eslint-disable-next-line
    }, [queryStr])
    
    return <>
      { alertMessage && alertMessage.component === component && <AlertMesg /> }
      { success && Object.keys(data).length > 0 && <WrapperComponent data={data} {...props} /> }  
    </> 
  }

  const mapStateToProps = createStructuredSelector({
    data: selectCustomerData,
    alertMessage: selectAlertMessage
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (
      pathname, 
      fetchSuccess, 
      queryStr, 
      setSuccess,
      component
    ) => dispatch(getReq(
      pathname, 
      fetchSuccess, 
      queryStr, 
      setSuccess,
      component
    ))
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithCustomerData);
}

export default withCustomerData;