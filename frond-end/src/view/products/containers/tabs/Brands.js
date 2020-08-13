import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import BrandList from '../pages/BrandList';
import AddBrand from '../pages/AddBrand';
import EditBrand from '../pages/EditBrand';
import DeleteBrand from '../pages/DeleteBrand';

// import redux middleware, actions and settings

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  pageWrapper: state.ui.pageWrapper
});

// MAIN COMPONENT
const Brands = ({ 
  pageWrapper 
}) => {

  const { page } = pageWrapper.tabbar.active;

  return <>    
    { (page.name === 'BRAND_LIST' || page.name === undefined) && <BrandList /> }
    { page.name === 'ADD_BRAND' && <AddBrand /> }
    { page.name === 'EDIT_BRAND' && <EditBrand /> }
    { page.name === 'REMOVE_BRAND' && <DeleteBrand /> }
  </>
}

export default connect(mapStateToProps)(Brands);