import React, { useEffect } from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
// components
import Title from '../title/title.component';
import CustomerSearch from './customer-search.component';
import PreviewCustomers from './preview-customers.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { getReq } from '../../state/api/get-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const title = {
  name: 'Customer List',
  message: 'A customer can be searched by either its account or name or address.'
}

const CustomerList = ({ 
  getReq, 
  data, 
  alertMessage
}) => {
  
  const location = useLocation();

  title.button = {
    text: 'Add',
    link: `${location.search}?type=add`
  }
  
  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    getReq('/customers', fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])
  
  return <>
    <Title title={title} />
    { 
      alertMessage 
      ? <AlertMesg />
      : <> 
        <CustomerSearch />
        {
          data && data.info && <>
            <PaginationBar  
              numberOfPages={data.info.pages}
              limit={5}
            />
            <PreviewCustomers />
            <PaginationBar 
              numberOfPages={data.info.pages}
              limit={5}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);