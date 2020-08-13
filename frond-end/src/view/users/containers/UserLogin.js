import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import containers, components, actions and settings
import Navbar from '../../_shared/Navbar';
import Footer from '../../_shared/Footer';
import Header from '../../_shared/Header';
import Tabbar from '../../_shared/Tabbar';

import Login from './Login';
import ForgotPassword from './ForgotPassword';

import { postLogin } from '../../../state/_shared/middleware/api';
import { setHeader, setTabActive } from '../../../state/actions/ui';
import { 
  PageWrapperList, 
  navbarSettings, 
  navbarItemList 
} from '../../../state/actions/uiSettings';

// redux map state and dispatch to props.
const mapStateToProps = state => ({
  message: state.data.message,
  pageWrapper: state.ui.pageWrapper
});
const tabActive = payload => dispatch => {
  dispatch(setTabActive(payload))
}
const showHeaderWithTabs = payload => dispatch => {
  dispatch(setHeader(payload))
}
const componentCleanup = () => dispatch => {
  dispatch({ type: 'COMPONENT_CLEANUP' })
}

// main component
const UserLogin = (props) => {
  const { header, tabbar } = props.pageWrapper;
  const logout = e => {
    localStorage.clear();
  }
  useEffect(() => {
    props.showHeaderWithTabs(PageWrapperList.userLogin);
    return () => {
      props.componentCleanup();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 pb-4 main-wrapper login-bg">
        <div className="col-12 p-0 m-0">
          <Navbar 
            settings={navbarSettings} 
            navbarItemList={navbarItemList} 
            collapseItemList={navbarItemList} 
          />

          {/* main container */}
          <div className="row p-0 m-0 px-2 py-0">
            <div className="col">
              { 
                Object.keys(props.pageWrapper).length > 0 
                  && <>
                    <Header title={header.title} link={header.link} />
                    {localStorage.getItem('name') 
                      ? 
                        <span>
                          {`${localStorage.getItem('name')} logged in.`} <Link className="a-link-cs" to="/login" onClick={logout}>Use another account?</Link>
                        </span>
                      : <>
                        <Tabbar 
                          tabbar={tabbar.list} 
                          active={tabbar.active.tab} 
                          tabActive={props.tabActive}
                          message={props.message}
                        />
                        {(props.pageWrapper.tabbar.active.tab === 'LOG_IN' || 
                          props.pageWrapper.tabbar.active.tab === undefined) && 
                          <Login />
                        }
                        {props.pageWrapper.tabbar.active.tab === 'FORGOT_PASSWORD' && 
                          <ForgotPassword />
                        }
                      </>
                    }
                  </>
              }
            </div>
          </div>
          {/* end of main container */}
          
        </div>
      </div>
      <div className="row m-0 p-0 text-light footer">
        <div className="col-12 p-0 m-0">
          <footer>
            <div className="row p-0 m-0 px-2 py-2">
              <div className="col">
                <Footer />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </>
}

export default connect(mapStateToProps, { postLogin, tabActive, showHeaderWithTabs, componentCleanup })(UserLogin);