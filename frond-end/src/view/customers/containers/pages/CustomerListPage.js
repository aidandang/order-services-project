import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';
import { searchFormValidation } from '../../../../utils/helpers';

// import _shared components
import PaginationBar from '../../../_shared/PaginationBar';

// import child components
import SearchCustomerCard from '../../components/SearchCustomerCard';
import CustomerTable from '../../components/CustomerTable';

// import redux middleware, actions and settings
import { getData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  customers: state.data.customers.allIds,
  pages: parseInt(state.data.customers.info.pages),
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string(),
  page: Yup
    .number()
});

// set initial form state
const initialState = {
  search: "",
  page: 1
}

// MAIN COMPONENT //
const CustomerListPage = ({
  getData,
  customers, 
  pages,
  pageWrapper,
  pageActive
 
}) => {

  const { tab } = pageWrapper.tabbar.active;

  const location = useLocation();
  const history = useHistory();

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled,
    setValues
  ] = useForm(initialState, initialState, formSchema);

  // form submit function
  const formSubmit = (e, page) => {
    e.preventDefault();

    // get form validated before make a query to the database
    const { data, search } = searchFormValidation(e, page, formData);

    if (Object.keys(data).length > 0) {
      setValues(data);
      getData('/customers?', search, FetchType, { name: 'CUSTOMER_LIST' });
    }
  }

  const onClickTableRow = (id) => {
    if (tab === 'CUSTOMER_LIST') history.push(`${location.pathname}/${id}`)
    if (tab === 'ADD_ORDER') getData('/customers/' + id, location.search, FetchType, { name: 'ADDRESS_LIST' });
  }

  return <>
    <SearchCustomerCard
      formSubmit={formSubmit} 
      formData={formData}
      errors={errors}
      onInputChange={onInputChange}
      buttonDisabled={buttonDisabled}
      pageActive={pageActive}
      page={{ name: 'ADD_CUSTOMER' }}
    />
    {customers.length > 0 &&
      <> 
        <CustomerTable 
          customers={customers}
          onClickTableRow={onClickTableRow}
        />
        <PaginationBar 
          page={formData.page}
          onPageChange={formSubmit}
          pages={pages} 
          itemLimit={5}
        />
      </>
    }
  </>
}

export default connect(mapStateToProps, { getData, pageActive })(CustomerListPage);