import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';
import CustomerInfo from '../../components/customer-info/customer-info.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

// initial values
const title = {
  name: 'Customer Infomation',
  message: 'Detail information of the customer. Information can be edited.'
}

// main component
const CustomerInfoPage = ({
  getReq,
  alertMessage
}) => {

  const location = useLocation();
  const params = useParams();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    getReq('/customers/' + params.id, fetchSuccess)
    // eslint-disable-next-line
  }, [])
  
  return <>
    <Title title={title} />

    {
      alertMessage 
      ? <AlertMesg />
      : action !== 'update-customer' && action !== 'update-shipping-info' &&
        <CustomerInfo />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoPage);