import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// import custom components as helpers

// import _shared components

// import child components
import DeleteColorCard from '../../components/DeleteColorCard';

// import redux middleware, actions and settings
import { deleteData } from '../../../../state/_shared/middleware/api';
import { setPageActive } from '../../../../state/actions/ui';
import { FetchType } from '../../../../state/actions/data';

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
const DeleteColor = ({
  product,
  pageWrapper,
  deleteData,
  pageActive
}) => {

  const { page } = pageWrapper.tabbar.active;
  const params = useParams();

  const query = `/colors/${page.id}`;

  const color = product.colors.find(color => 
    color._id === page.id
  );

  const formSubmit = e => {
    e.preventDefault();
    deleteData('/products/' + params.id + query, FetchType, { name: 'COLOR_LIST', id: '' });
  }

  return <>
    <DeleteColorCard 
      color={color} 
      formSubmit={formSubmit}
      pageActive={pageActive}
      title={'REMOVE COLOR'}
    />
  </>
}

export default connect(mapStateToProps, { deleteData, pageActive })(DeleteColor);