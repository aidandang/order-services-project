import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// components
import Title from '../../components/title/title.component';
import CustomerList from '../../components/customer-list/customer-list.component';
import AddCustomer from '../../components/add-customer/add-customer.component';

// initial values
const title = {
  name: 'Customer List',
  message: 'Search for customer(s) by account, nickname and address.'
}

// main component
const CustomerListPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { action } = queryObj;
  
  return <>

    <Title title={title} />
    
    { 
      action === 'add-customer' 
      ? <AddCustomer /> 
      : <CustomerList />
    }
  </>
}

export default CustomerListPage;