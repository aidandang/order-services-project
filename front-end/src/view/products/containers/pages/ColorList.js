import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import ColorCard from '../../components/ColorCard';
import AddColorCard from '../../components/AddColorCard';

// import redux middleware, actions and settings
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  product: state.data.products.byId,
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// MAIN COMPONENT
const ColorList = ({
  product,
  pageWrapper,
  pageActive
}) => {

  const { tab } = pageWrapper.tabbar.active;

  return (
    <div className="row">
      { 
        product.colors.map(color => 
          <div key={color._id} className="col-xl-4 col-lg-6">
            <ColorCard product={product} color={color} pageActive={pageActive} tab={tab} />
          </div>
        )
      }
      <div className="col-xl-4 col-lg-6">
        <AddColorCard pageActive={pageActive} />
      </div>
    </div>
  )
}

export default connect(mapStateToProps, { pageActive })(ColorList);