import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// import custom components as helpers

// import _shared components

// import child components
import DeleteAddressCard from '../../components/DeleteAddressCard';

// import redux middleware, actions and settings
import { deleteData } from '../../../../state/_shared/middleware/api';
import { setPageActive } from '../../../../state/actions/ui';
import { FetchType } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  customer: state.data.customers.byId,
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// MAIN COMPONENT
const DeleteAddress = ({
  customer,
  pageWrapper,
  deleteData,
  pageActive
}) => {

  const { page } = pageWrapper.tabbar.active;
  const params = useParams();

  const query = `/shippinginfo/${page.id}`;

  const address = customer.shippingInfo.find(address => 
    address._id === page.id);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    deleteData('/customers/' + params.id + query, FetchType, { name: 'ADDRESS_LIST' });
  }

  return <>
    <DeleteAddressCard 
      address={address} 
      formSubmit={formSubmit}
      pageActive={pageActive}
      title={'REMOVE ADDRESS'}
    />
  </>
}

export default connect(mapStateToProps, { deleteData, pageActive })(DeleteAddress);