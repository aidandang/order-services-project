import React, { useState, useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

// import custom components as helpers

// import _shared components

// import child components
import AllBrandsCard from '../../components/AllBrandsCard';

// import redux middleware, actions and settings
import { getData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  brands: state.data.brands.allIds
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// MAIN COMPONENT
const BrandList = ({ 
  pageActive, 
  brands,
  getData
}) => {

  const location = useLocation();
  const [brand, setBrand] = useState("");

  const onInputChange = e => {
    e.persist();
    setBrand(e.target.value);
  }

  const formSubmit = e => {
    e.preventDefault();
    if (brand !== "") {
      pageActive({ name: e.target.name, id: brand })
    }
  }

  useEffect(() => {
    getData('/brands', location.search, FetchType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <AllBrandsCard
          formSubmit={formSubmit}
          brand={brand}
          brands={brands}
          onInputChange={onInputChange}
          pageActive={pageActive}
        />
      </div>
    </form>
  </>
}

export default connect(mapStateToProps, { getData, pageActive })(BrandList);