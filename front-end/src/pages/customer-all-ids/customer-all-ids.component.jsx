import React from 'react';

// dependencies
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';
import CustomerList from '../../components/customer-list/customer-list.component';
import CustomerAdd from '../../components/customer-add/customer-add.component';

// initial values
const title = {
  name: 'Customer List',
  message: 'Search for customer(s) by account, nickname and address.'
}

// main component
const CustomerAllIds = () => {

  const location = useLocation();

  const queryStr = queryString.parse(location.search);
  const { action } = queryStr;

  return <>
    <Title title={title} />

    { action === undefined &&  <CustomerList /> }
    { action === 'customer-add' && <CustomerAdd /> }
  </>
}

export default CustomerAllIds;