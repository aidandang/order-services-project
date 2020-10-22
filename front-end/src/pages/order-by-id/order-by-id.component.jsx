import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import OrderInfo from '../../components/order-info/order-info.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectOrderData } from '../../state/order/order.selectors';
import { OrderActionTypes } from '../../state/order/order.types';

// initial values
const title = {
  name: 'Order Details',
  message: 'Detail information of the order. Information can be edited.'
}

// main component
const OrderById = ({
  getReq,
  alertMessage,
  data
}) => {

  const location = useLocation();
  const params = useParams();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;

  useEffect(() => {
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    getReq('/orders/' + params.id, fetchSuccess)
    // eslint-disable-next-line
  }, [location.state])
  
  return <>
    <Title title={title} />

    { alertMessage && <AlertMesg /> }
    {
      data.byId && data.byId._id === params.id && <>
        { action === undefined && <OrderInfo />}
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderById);