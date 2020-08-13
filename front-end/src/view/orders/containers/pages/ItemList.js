import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import ItemTable from '../../components/ItemTable';

// import redux middleware, actions and settings
import { setPageActive } from '../../../../state/actions/ui';
import { removeItemFromOrder } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  order: state.data.orders.byId,
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
};
const removeItem = (index) => dispatch => {
  dispatch(removeItemFromOrder(index));
};

// MAIN COMPONENT
const ItemList = ({
  order,
  pageActive,
  removeItem,
}) => {
  return <>
    <ItemTable 
      order={order}
      pageActive={pageActive}
      removeItem={removeItem}
    />
  </>
}

export default connect(mapStateToProps, { pageActive, removeItem })(ItemList);