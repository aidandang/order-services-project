import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';
import CustomerInfo from '../../components/customer-info/customer-info.component';
import CustomerEdit from '../../components/customer-edit/customer-edit.component';
import CustomerAddressesUpdate from '../../components/customer-addresses-update/customer-addresses-update.component';
import CustomerAddressAdd from '../../components/customer-address-add/customer-address-add.component';
import CustomerAddressEdit from '../../components/customer-address-edit/customer-address-edit.component';
import CustomerAddressRemove from '../../components/customer-address-remove/customer-address-remove.component';

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
const CustomerInfoPage = ({
  getReq,
  alertMessage,
  data
}) => {

  const location = useLocation();
  const params = useParams();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;
  
  const { byId } = data;

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
      : byId && <>
        { action === undefined && <CustomerInfo />}
        { action === 'customer-info' && <CustomerInfo />}
        { action === 'customer-edit' && <CustomerEdit />}
        { action === 'customer-addresses-update' && <CustomerAddressesUpdate />}
        { action === 'customer-address-add' && <CustomerAddressAdd />}
        { action === 'customer-address-edit' && <CustomerAddressEdit />}
        { action === 'customer-address-remove' && <CustomerAddressRemove />}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoPage);