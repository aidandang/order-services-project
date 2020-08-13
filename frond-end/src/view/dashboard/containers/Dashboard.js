import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';

// import containers, components, actions and settings
import Header from '../../_shared/Header';
import { setHeader } from '../../../state/actions/ui';
import { PageWrapperList } from '../../../state/actions/uiSettings'

// redux map state and dispatch to props.
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper
});
const showHeaderWithTabs = payload => dispatch => {
  dispatch(setHeader(payload))
}
const componentCleanup = () => dispatch => {
  dispatch({ type: 'COMPONENT_CLEANUP' })
}

// main component
const Dashboard = ({
  pageWrapper,
  showHeaderWithTabs,
  componentCleanup
}) => {

  const { header } = pageWrapper;

  useEffect(() => {
    showHeaderWithTabs(PageWrapperList.dashboard);
    // clean up state before unmount the component.
    return () => { componentCleanup(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    {  
      Object.keys(pageWrapper).length > 0 
      &&
        <Header 
          title={header.title} 
          button={header.button} 
        />
    }
  </>
}

export default connect(mapStateToProps, { showHeaderWithTabs, componentCleanup })(Dashboard);