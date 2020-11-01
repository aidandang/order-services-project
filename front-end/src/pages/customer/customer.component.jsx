import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import CustomerList from '../../components/customer-list/customer-list.component';
import CustomerAdd from '../../components/customer-add/customer-add.component';
import CustomerInfo from '../../components/customer-info/customer-info.component';

// initial values
const title = {
  name: 'Customer',
  message: 'Search for customer(s) by account, nickname and address.'
}

// main component
const Customer = () => {

  const location = useLocation();

  const queryStr = queryString.parse(location.search);
  const { id, action } = queryStr;

  return <>
    <Title title={title} />
    
    { action === undefined && <CustomerList /> }
    { action === 'customer-info' && id !== undefined && 
      <CustomerInfo 
        pathname={`/customers/${id}`} 
        component='customer-info'
      /> 
    }
    { action === 'customer-add' && <CustomerAdd /> }
  </>
}

export default Customer;