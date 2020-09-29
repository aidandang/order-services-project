import React, { useState } from 'react';

// dependencies
import { useLocation, Redirect } from 'react-router-dom';
import queryString from 'query-string';
// components
import Title from '../title/title.component';
import OrderCustomerInfo from './order-customer-info.component';
import OrderItems from './order-items.component';
// redux
import { connect } from 'react-redux';
import { postReq } from '../../state/api/post-request';
import { OrderActionTypes } from '../../state/order/order.types';

// set the initial state
const initialState = {
  orderNumber: '',
  customer: null,
  address: null,
  items: []
}

const OrderByIdEdit = ({
  order,
  postReq
}) => {

  const [success, setSuccess] = useState(false);

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type, action } = queryObj;

  let titleName = 'Edit Order';
  if (type === 'add') titleName = 'Add Order';

  const title = {
    name: titleName,
    message: 'Add or edit an order and its items.'
  }

  const [submitData, setSubmitData] = useState(type === 'edit' ? order : initialState);

  const handleSubmit = e => {
    e.preventDefault();

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;

    if (type === 'add') {
      postReq('/orders', fetchSuccess, submitData, setSuccess)
    }
  }

  return <>
    { success && <Redirect to={location.pathname} /> }

    <Title title={title} />
    <OrderCustomerInfo order={submitData} setSubmitData={setSubmitData} />
    <OrderItems order={submitData} />
  </>
}

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(null, mapDispatchToProps)(OrderByIdEdit);