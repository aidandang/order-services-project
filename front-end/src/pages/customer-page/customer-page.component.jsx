import React from 'react';

// components
import Title from '../../components/title/title.component';
import Customer from '../../components/customer/customer.component';

// initial values
const title = {
  name: 'Customer',
  message: 'Search for customer(s) by account, nickname and address.'
}

const CustomerPage = () => {

  return <>
    <Title title={title} />
    <Customer />
  </>
}

export default CustomerPage;