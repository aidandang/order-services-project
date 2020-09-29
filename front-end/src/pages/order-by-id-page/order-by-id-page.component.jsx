import React, { useEffect } from 'react';

// dependencies
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
// components
import OrderByIdInfo from '../../components/order-by-id-info/order-by-id-info.component';
import OrderByIdEdit from '../../components/order-by-id-edit/order-by-id-edit.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OrderActionTypes } from '../../state/order/order.types';
import { getReq } from '../../state/api/get-request';
import { selectOrderData } from '../../state/order/order.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

const OrderByIdPage = ({
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
    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    getReq('/orders/' + params.id, fetchSuccess, location.search)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    {
      alertMessage 
      ? <AlertMesg />
      : <>
        { byId && type !== 'edit' && type !== 'delete' && <OrderByIdInfo order={byId} /> }
        { byId && type === 'edit' && <OrderByIdEdit order={byId} /> }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderByIdPage);