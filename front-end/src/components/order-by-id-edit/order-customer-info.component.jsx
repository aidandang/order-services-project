import React from 'react';

// dependencies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';
// components
import { useForm } from '../custom-hooks/use-form';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';
import CustomerSearchForm from '../customer-list/customer-search-form.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import SelectCustomer from './select-customer.component';
import OrderShippingAddress from './order-shipping-address.component';
// redux
import { connect } from 'react-redux';
import { getReq } from '../../state/api/get-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const OrderCustomerInfo = ({ 
  order,
  getReq,
  data,
  setOrder
}) => {

  const history = useHistory();
  const location = useLocation();

  const { customer, address, orderNumber, createdAt } = order;

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // handle search form 
  const formSubmit = (e) => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS
    
    const queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      getReq('/customers', fetchSuccess, queryStr)
    }
  }

  return <>
    { 
      customer
      ?
        <OrderShippingAddress customer={customer} setOrder={setOrder} />
      : <>
        <CustomerSearchForm
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />

        {
          data.allIds &&
          <>
            <PaginationBar numberOfPages={data.info.pages} />
            <SelectCustomer setOrder={setOrder} />
            <PaginationBar numberOfPages={data.info.pages} />
          </>
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerInfo)