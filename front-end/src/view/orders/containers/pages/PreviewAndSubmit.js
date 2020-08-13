import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import OrderDetails from '../../components/OrderDetails';

// import redux middleware, actions and settings

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  customer: state.data.customers.byId,
  order: state.data.orders.byId,
  pageWrapper: state.ui.pageWrapper
});

// MAIN COMPONENT
const PreviewAndSubmit = ({
  customer,
  order
}) => {
  return <>
    <OrderDetails
      customer={customer}
      order={order} 
    />
  </>
}

export default connect(mapStateToProps)(PreviewAndSubmit);