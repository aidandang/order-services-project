import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import AddressList from '../pages/AddressList';
import AddAddress from '../pages/AddAddress';
import EditAddress from '../pages/EditAddress';
import DeleteAddress from '../pages/DeleteAddress';

// import redux middleware, actions and settings

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  pageWrapper: state.ui.pageWrapper
})

const ShippingInfo = ({ 
  pageWrapper
}) => {

  const { page } = pageWrapper.tabbar.active;
  
  return <>
    {
      ( 
        page.name === 'ADDRESS_LIST' ||
        page.name === undefined 
      ) && <AddressList />
    }
    {page.name === 'ADD_ADDRESS' && <AddAddress />}
    {page.name === 'EDIT_ADDRESS' && <EditAddress />}
    {page.name === 'REMOVE_ADDRESS' && <DeleteAddress />}
  </>
}

export default connect(mapStateToProps)(ShippingInfo);