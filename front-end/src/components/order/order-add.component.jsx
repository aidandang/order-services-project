import React, { useState, useEffect } from 'react';

// dependencies
import { useHistory, useLocation } from 'react-router-dom';

// components
import { Card, Ul } from '../tag/tag.component';
import OrderMerchant from './order-merchant.component';
import OrderItem from './order-item.component';
import OrderReceiving from './order-receiving.component';
import OrderCustomer from './order-customer.component';
import OrderSale from './order-sale.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { postReq } from '../../state/api/api.requests';
import { resetOrderEditing } from '../../state/order/order.actions';

const OrderAdd = ({
  order,
  postReq,
  resetOrderEditing,
  alertMessage
}) => {

  const history = useHistory();
  const location = useLocation();

  const { info, billing } = order;

  const [success, setSuccess] = useState(false);

  const formSubmit = () => {

    const newOrder = { ...order };
    delete newOrder.item;

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    postReq('/orders', fetchSuccess, newOrder, setSuccess, 'product-add')
  }

  const formReset = () => {
    resetOrderEditing()
  }

  useEffect(() => {
    const pathname = location.pathname.split('/add')[0];

    if (success) history.push(pathname)
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'order-add' && <AlertMesg/> }

    <OrderMerchant />
    <OrderItem />
    <OrderReceiving />
    <OrderCustomer />
    <OrderSale />
    {
      info && billing.customer &&
      <Card width="col" title="Place Order">
        <Ul>
          <SubmitOrReset 
            buttonName={'Submit'}
            buttonDisabled={false}
            formSubmit={formSubmit}
            formReset={formReset}
          />
        </Ul>
      </Card>
    }
    
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  resetOrderEditing: () => dispatch(resetOrderEditing())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderAdd);