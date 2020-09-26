import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import CustomerList from '../../components/customer-list/customer-list.component';
import CustomerByIdEdit from '../../components/customer-by-id-edit/customer-by-id-edit.component';

const CustomerListPage = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;
  
  return <>
    { type !== 'add' && <CustomerList /> }
    { type === 'add' && <CustomerByIdEdit />}
  </>
}

export default CustomerListPage;