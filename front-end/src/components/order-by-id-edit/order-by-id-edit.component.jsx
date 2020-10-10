import React from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import Title from '../title/title.component';
import Stagebar from '../stagebar/stagebar.component';
import SelectCustomer from './select-customer.component';
import AddItems from './add-items.component';
import PreviewAndSubmit from './preview-and-submit.component';

const OrderByIdEdit = () => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type, stage } = queryObj;

  let titleName = 'Edit Order';
  if (type === 'add') titleName = 'Add Order';

  const title = {
    name: titleName,
    message: 'Add or edit an order and its items.'
  }

  const stageList = [
    {
      name: 'select-customer',
      text: '1. Select Customer'
    },
    {
      name: 'add-items',
      text: '2. Add Items'
    },
    {
      name: 'preview-and-submit',
      text: '3. Preview and Submit'
    }
  ]

  let active = "";
  if (stage) active = stage;

  return <>
    <Title title={title} />
    <Stagebar stageList={stageList} active={active} />
    {
      (stage === 'select-customer') &&
      <SelectCustomer />
    }
    {
      (stage === 'add-items') &&
      <AddItems />
    }
    {
      (stage === 'preview-and-submit') &&
      <PreviewAndSubmit />
    }
  </>
}

export default OrderByIdEdit;