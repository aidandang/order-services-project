import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import CustomerListPage from '../pages/CustomerListPage';
import AddCustomer from '../pages/AddCustomer';

// import redux middleware, actions and settings

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper
});

// MAIN COMPONENT //
const CustomerList = ({ 
  pageWrapper 
}) => {

  const { page } = pageWrapper.tabbar.active;

  return <>
    { (page.name === 'CUSTOMER_LIST' || page.name === undefined)  && <CustomerListPage /> }
    { page.name === 'ADD_CUSTOMER' && <AddCustomer /> }
  </>
}

export default connect(mapStateToProps)(CustomerList);