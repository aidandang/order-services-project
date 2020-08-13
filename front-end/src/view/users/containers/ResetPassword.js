import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from "yup";

// import containers, components, actions and settings
import Navbar from '../../_shared/Navbar';
import Footer from '../../_shared/Footer';
import Header from '../../_shared/Header';
import Tabbar from '../../_shared/Tabbar';

import { useForm } from '../../../hooks/useForm';

import ResetPasswordForm from '../components/ResetPasswordForm';

import { patchPassword } from '../../../state/_shared/middleware/api';
import { setHeader, setTabActive } from '../../../state/actions/ui';
import { FetchType } from '../../../state/actions/data';
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

// set form schema
const formSchema = Yup.object().shape({
  password: Yup
    .string()
    .required("Please provide your password."),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Confirmed password does NOT match.')
});

// set form state
const formState = {
  password: "",
  passwordConfirm: ""
};

// main component
const ResetPassword = (props) => {
  const { header, tabbar } = props.pageWrapper;
  const history = useHistory();
  const params = useParams();

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // Form submit function
  const formSubmit = e => {
    e.preventDefault();
    props.patchPassword(`/users/resetpassword/${params.token}`, formData, FetchType, history, '/app');
  }

  useEffect(() => {
    props.showHeaderWithTabs(PageWrapperList.resetPassword);
    return () => {
      props.componentCleanup()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 main-wrapper login-bg">
        <div className="col-12 p-0 m-0">
          <Navbar 
            settings={navbarSettings} 
            navbarItemList={navbarItemList} 
            collapseItemList={navbarItemList} 
          />
         
          {/* main container */}
          <div className="row p-0 m-0 px-2 py-4">
            <div className="col">
              { 
                Object.keys(props.pageWrapper).length > 0 
                  && <>
                    <Header title={header.title} link={header.link} />
                    <Tabbar 
                      tabbar={tabbar.list}
                      active={tabbar.active.tab} 
                      tabActive={props.tabActive}
                      message={props.message}
                    />
                    {(props.pageWrapper.tabbar.active.tab === 'CREATE_A_NEW_PASSWORD' || 
                      props.pageWrapper.tabbar.active.tab === undefined) && 
                      <ResetPasswordForm 
                        formData={formData} 
                        formSubmit={formSubmit} 
                        errors={errors} 
                        onInputChange={onInputChange} 
                        buttonDisabled={buttonDisabled}
                      />
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

export default connect(mapStateToProps, { patchPassword, showHeaderWithTabs, tabActive, componentCleanup })(ResetPassword);