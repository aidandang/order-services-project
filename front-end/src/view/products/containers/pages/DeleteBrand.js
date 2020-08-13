import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import DeleteBrandCard from '../../components/DeleteBrandCard';

// import redux middleware, actions and settings
import { deleteData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  brands: state.data.brands.allIds,
  id: state.ui.pageWrapper.tabbar.active.page.id
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// MAIN COMPONENT
const DeleteBrand = ({ 
  brands, 
  id, 
  deleteData, 
  pageActive 
}) => {

  const brand = brands.find(brand => brand._id === id);

  // submit function
  const formSubmit = e => {
    e.preventDefault();
    deleteData('/brands/' + brand._id, FetchType);
  }

  return <>
    <DeleteBrandCard 
      brand={brand} 
      formSubmit={formSubmit}
      pageActive={pageActive}
      title={'Remove Brand'}
    />
  </>
}

export default connect(mapStateToProps, { deleteData, pageActive })(DeleteBrand);