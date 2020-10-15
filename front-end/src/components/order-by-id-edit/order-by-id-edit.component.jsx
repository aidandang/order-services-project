import React, { useEffect } from 'react';

// dependencies
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import Title from '../title/title.component';
import Stagebar from '../stagebar/stagebar.component';
import SelectCustomer from './select-customer.component';
import AddItems from './add-items.component';
import AddReference from './add-reference.component';
import PreviewAndSubmit from './preview-and-submit.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { copyToOrderTemplate } from '../../state/order/order.actions';
import { selectOrderData } from '../../state/order/order.selectors';

const OrderByIdEdit = ({
  data,
  copyToOrderTemplate
}) => {

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
      name: 'add-reference',
      text: '3. Add Reference'
    },
    {
      name: 'preview-and-submit',
      text: '4. Preview and Submit'
    }
  ]

  let active = "";
  if (stage) active = stage;

  useEffect(() => {
    if (type === 'add') copyToOrderTemplate({
      customer: null,
      shippingAddress: null,
      item: {},
      index: null,
      items: []
    })
    if (type === 'edit') copyToOrderTemplate(data.byId)
    // eslint-disable-next-line
  }, [])

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
      (stage === 'add-reference') &&
      <AddReference />
    }
    {
      (stage === 'preview-and-submit') &&
      <PreviewAndSubmit />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  copyToOrderTemplate: order => dispatch(copyToOrderTemplate(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderByIdEdit);