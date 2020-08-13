import React, { useEffect } from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

// import custom components as helpers

// import _shared components

// import child components
import GeneralInfo from '../../components/GeneralInfo';
import EditCustomer from '../pages/EditCustomer';

// import redux middleware, actions and settings
import { getData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = state => ({
  customer: state.data.customers.byId,
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// MAIN COMPONENT
const GeneralSettings = ({
  getData,
  pageWrapper,
  customer,
  pageActive
}) => {

  const location = useLocation();
  const params = useParams();

  const { page } = pageWrapper.tabbar.active;

  useEffect(() => {
    getData('/customers/' + params.id, location.search, FetchType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    {
      Object.keys(customer).length > 0 && <> 
        {
          ( page.name === 'GENERAL_INFO' || 
            page.name === undefined
          ) && <GeneralInfo customer={customer} pageActive={pageActive} />
        }
        { page.name === 'EDIT_ACCOUNT' && <EditCustomer customer={customer} formType={'ACCOUNT_INFO_FORM'} />}
        { page.name === 'EDIT_BILLING' && <EditCustomer customer={customer} formType={'BILLING_INFO_FORM'} />}
      </>
    } 
  </>
}

export default connect(mapStateToProps, { getData, pageActive })(GeneralSettings);