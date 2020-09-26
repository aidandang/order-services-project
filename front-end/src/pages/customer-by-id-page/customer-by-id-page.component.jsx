import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
// components
import CustomerByIdInfo from '../../components/customer-by-id-info/customer-by-id-info.component';
import CustomerByIdEdit from '../../components/customer-by-id-edit/customer-by-id-edit.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { getReq } from '../../state/api/get-request';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const CustomerByIdPage = ({
  getReq, 
  data, 
  alertMessage
}) => {

  const location = useLocation();
  const params = useParams();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;

  const { byId } = data;

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    getReq('/customers/' + params.id, fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    {
      alertMessage 
      ? <AlertMesg />
      : <>
        { byId && type !== 'edit' && type !== 'delete' && <CustomerByIdInfo customer={byId} /> }
        { byId && type === 'edit' && <CustomerByIdEdit customer={byId} /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerByIdPage);