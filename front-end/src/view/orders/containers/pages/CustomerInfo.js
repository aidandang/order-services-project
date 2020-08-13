import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import CustomerInfoCard from '../../components/CustomerInfoCard';

// import redux middleware, actions and settings
import { saveCustomerToOrder } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  order: state.data.orders.byId
});
// pass to remove customer from the order by setting undefined
const saveCustomer = (payload) => dispatch => {
  dispatch(saveCustomerToOrder(payload))
}

// MAIN COMPONENT
const CustomerInfo = ({
  order,
  saveCustomer
}) => {

  return <>
    <CustomerInfoCard 
      customer={order.customer}
      address={order.address}
      saveCustomer={saveCustomer}
    />
  </>
}

export default connect(mapStateToProps, { saveCustomer })(CustomerInfo);