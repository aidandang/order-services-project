import React, { useEffect, useState } from 'react';

// dependencies
import { Redirect, useLocation, useHistory } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderCustomer } from '../../state/order/order.actions'
import { selectCustomerData } from '../../state/customer/customer.selectors';

const OrderSelectCustomer = ({
  id,
  data,
  saveOrderCustomer
}) => {

  const location = useLocation();
  const history = useHistory();

  const [redirect, setRedirect] = useState(false)

  const { byId } = data;

  useEffect(() => {
    if (history.action === "PUSH" && byId && byId._id === id ) {
      saveOrderCustomer(byId);
    }
    setRedirect(true)
    // eslint-disable-next-line
  }, [])

  return <>
    {
      history.action !== 'PUSH' && <Redirect to={location.pathname} />
    }
    {
      redirect && <Redirect to={location.pathname} />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  saveOrderCustomer: customer => dispatch(saveOrderCustomer(customer))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectCustomer);