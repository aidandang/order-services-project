import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';
import CustomerSearchForm from '../customer-list/customer-search-form.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import OrderShippingAddress from './order-shipping-address.component';
import PreviewCustomers from '../customer-list/preview-customers.component';
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

const SelectCustomer = ({ 
  order,
  getReq,
  data,
  setOrder
}) => {

  const { customer } = order

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const [active, setActive] = useState(null);

  // handle search form 
  const formSubmit = (e, page) => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      if (page) queryStr = queryStr + `${queryStr === '' ? '?' : '&'}page=${page}`;
      getReq('/customers', fetchSuccess, queryStr);
      setActive(page)
    }
  }

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    setOrder(prevState => ({ ...prevState,
      customer,
      shippingAddress: customer.shippingIsBilling === 'true' 
        ? null 
        : customer.shippingInfo.find(address => customer.shippingIsBilling === address._id)
    }))
  }

  return <>
    { 
      customer
      ?
        <OrderShippingAddress order={order} setOrder={setOrder} />
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
            <PaginationBar numberOfPages={data.info.pages} onPageChange={formSubmit} page={active} />
            <PreviewCustomers handleOnClick={handleOnClick} />
            <PaginationBar numberOfPages={data.info.pages} onPageChange={formSubmit} page={active} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectCustomer)