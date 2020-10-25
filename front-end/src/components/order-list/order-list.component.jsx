import React, { useEffect } from 'react';

// components
import OrderSearch from './order-search.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/api.requests';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// main component
const OrderList = ({ 
  getReq, 
  alertMessage
}) => {

  useEffect(() => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    getReq('/orders', fetchSuccess);
    // eslint-disable-next-line
  }, [location.state]);
  
  return <>
    { alertMessage && <AlertMesg /> }
    <OrderSearch />
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);