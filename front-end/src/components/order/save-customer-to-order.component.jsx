import React, { useEffect } from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { selectCustomerToOrder } from '../../state/order/order.actions';

const SaveCustomerToOrder = ({
  byId,
  selectCustomerToOrder
}) => {

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    selectCustomerToOrder(byId);

    const pathname = location.pathname.split('/select-customer')[0];
    history.push(pathname);
    // eslint-disable-next-line
  }, [])

  return <></>
}

const mapDispatchToProps = dispatch => ({
  selectCustomerToOrder: customer => dispatch(selectCustomerToOrder(customer))
})

export default connect(null, mapDispatchToProps)(SaveCustomerToOrder);