import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import ProductListPage from '../pages/ProductListPage';
import AddProduct from '../pages/AddProduct';
import AddBrand from '../pages/AddBrand';

// import redux middleware, actions and settings

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper
});

// MAIN COMPONENT
const ProductList = ({ 
  pageWrapper
}) => {

  const { page } = pageWrapper.tabbar.active;

  return <> 
    { (page.name === 'PRODUCT_LIST' || page.name === undefined)  && <ProductListPage /> }
    { page.name === 'ADD_PRODUCT' && <AddProduct /> }
    { page.name === 'ADD_BRAND' && <AddBrand />}
  </>
}

export default connect(mapStateToProps)(ProductList);