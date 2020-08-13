import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

// import custom components as helpers

// import _shared components

// import child components
import GeneralInfo from '../../components/GeneralInfo';
import EditProduct from '../pages/EditProduct';

// import redux middleware, actions and settings
import { getData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper,
  product: state.data.products.byId
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// MAIN COMPONENT
const GeneralSettings = ({
  getData,
  pageWrapper, 
  product,
  pageActive
}) => {

  const params = useParams();
  const location = useLocation();

  const { page } = pageWrapper.tabbar.active;

  useEffect(() => {
    getData('/products/' + params.id, location.search, FetchType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <> 
    { 
      Object.keys(product).length > 0 && <>
        { 
          ( page.name === 'GENERAL_INFO' || 
            page.name === undefined
          ) && 
          <GeneralInfo product={product} pageActive={pageActive} />
        }
        { 
          page.name === 'EDIT_PRODUCT' && 
          <EditProduct product={product} pageActive={pageActive} />
        }
      </>
    }
  </>
}

export default connect(mapStateToProps, { getData, pageActive })(GeneralSettings);