import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import CustomerInfo from '../../components/customer-info/customer-info.component';
import CustomerEdit from '../../components/customer-edit/customer-edit.component';
import CustomerShippingInfo from '../../components/customer-shipping-info/customer-shipping-info.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

// initial values
const title = {
  name: 'Customer Infomation',
  message: 'Detail information of the customer. Information can be edited.'
}

// main component
const CustomerById = ({
  getReq,
  alertMessage,
  data
}) => {

  const location = useLocation();
  const params = useParams();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    getReq('/customers/' + params.id, fetchSuccess)
    // eslint-disable-next-line
  }, [location.state])
  
  return <>
    <Title title={title} />

    { alertMessage && <AlertMesg /> }
    {
      data.byId && data.byId._id === params.id && <>
        { action === undefined && <CustomerInfo />}
        { action === 'customer-edit' && <CustomerEdit />}
        { action === 'customer-shipping-info' && <CustomerShippingInfo />}
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerById);