import React from 'react';

// import dependencies
import { connect, batch } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import AddressCard from '../../components/AddressCard';
import AddAddressCard from '../../components/AddAddressCard';
import BillingAddressCard from '../../components/BillingAddressCard';

// import components, actions and settings
import { setPageActive } from '../../../../state/actions/ui';
import { saveCustomerToOrder } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  customer: state.data.customers.byId,
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}
// this dispatch is for the add order components
const saveCustomer = (payload, page) => dispatch => {
  batch(() => {
    dispatch(saveCustomerToOrder(payload));
    dispatch(setPageActive(page));
  })
}

// MAIN COMPONENT
const AddressList = ({
  customer,
  pageWrapper,
  pageActive,
  saveCustomer
}) => {

  const { tab } = pageWrapper.tabbar.active;

  return (
    <div className="row">
      <div className="col-md-6">
        <BillingAddressCard customer={customer} saveCustomer={saveCustomer} tab={tab} />
      </div>
      { 
        customer.shippingInfo.map(address => 
          <div key={address._id} className="col-md-6">
            <AddressCard customer={customer} address={address} pageActive={pageActive} saveCustomer={saveCustomer} tab={tab} />
          </div>
        )
      }
      <div className="col-md-6">
        <AddAddressCard pageActive={pageActive} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, { pageActive, saveCustomer })(AddressList);
