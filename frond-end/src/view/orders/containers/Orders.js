import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers

// import _shared components
import Header from '../../_shared/Header';
import Tabbar from '../../_shared/Tabbar';

// import child components
import AddOrder from './tabs/AddOrder';

// import redux middleware, actions and settings
import { setHeader, setTabActive } from '../../../state/actions/ui';
import { PageWrapperList } from '../../../state/actions/uiSettings';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper,
  message: state.data.message
});
const showHeaderWithTabs = payload => dispatch => {
  dispatch(setHeader(payload))
}
const tabActive = payload => dispatch => {
  dispatch(setTabActive(payload))
}
const componentCleanup = () => dispatch => {
  dispatch({ type: 'COMPONENT_CLEANUP' })
}

// MAIN COMPONENT
const Orders = ({
  pageWrapper,
  message,
  showHeaderWithTabs,
  tabActive,
  componentCleanup
}) => {

  const { header, tabbar } = pageWrapper;

  useEffect(() => {
    showHeaderWithTabs(PageWrapperList.orders);
    // clean up state before unmount the component.
    return () => { componentCleanup(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    {  
      Object.keys(pageWrapper).length > 0 
      && <>
        <Header 
          title={header.title} 
          button={header.button} 
        />
        <Tabbar 
          tabbar={tabbar.list}
          active={tabbar.active.tab}
          tabActive={tabActive}
          message={message}
        />
        {tabbar.active.tab === 'ADD_ORDER' && <AddOrder />}
      </>
    }
  </>
}

export default connect(mapStateToProps, { showHeaderWithTabs, tabActive, componentCleanup })(Orders);