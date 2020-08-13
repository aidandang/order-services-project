import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components

// import child components
import ColorList from '../pages/ColorList';
import AddColor from '../pages/AddColor';
import EditColor from '../pages/EditColor';
import DeleteColor from '../pages/DeleteColor';

// import redux middleware, actions and settings

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  pageWrapper: state.ui.pageWrapper
})

// MAIN COMPONENT
const ColorInfo = ({ 
  pageWrapper 
}) => {

  const { page } = pageWrapper.tabbar.active;

  return <>
    { 
      (
        page.name === 'COLOR_LIST' || 
        page.name === undefined
      ) && <ColorList />
    }
    { page.name === 'ADD_COLOR' && <AddColor />}
    { page.name === 'EDIT_COLOR' && <EditColor />}
    { page.name === 'REMOVE_COLOR' && <DeleteColor />}
  </>
}

export default connect(mapStateToProps)(ColorInfo);