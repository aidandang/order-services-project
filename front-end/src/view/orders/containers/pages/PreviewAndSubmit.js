import React from 'react';

// import dependencies
import { connect } from 'react-redux';

// import custom components as helpers
import { acctNumber } from '../../../../utils/acctNumber';

// import _shared components

// import child components
import OrderDetails from '../../components/OrderDetails';

// import redux middleware, actions and settings
import { postData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  customer: state.data.customers.byId,
  order: state.data.orders.byId,
  pageWrapper: state.ui.pageWrapper
});

// MAIN COMPONENT
const PreviewAndSubmit = ({
  customer,
  order,
  postData
}) => {

  let buttonDisabled = true;
  if (order.items && order.customer) buttonDisabled = false;

  const formSubmit = (e) => {
    e.preventDefault();

    const items = order.items.map(item => {
      return {
        productId: item.product._id,
        colorId: item.color._id,
        note: item.note && item.note,
        size: item.size,
        qty: Number(item.qty),
        price: acctNumber(item.price),
        saleTax: item.saleTax ? acctNumber(item.saleTax) : 0,
        localCharge: item.localCharge ? acctNumber(item.localCharge) : 0,
        shippingCost: item.shippingCost ? acctNumber(item.shippingCost) : 0
      }
    });

    const newOrder = {
      customerId: order.customer._id,
      addressId: order.address._id,
      userId: localStorage.getItem('_id'),
      items: items,
      rev: []
    }

    postData('/orders', newOrder, FetchType)
  }

  return <>
    <OrderDetails
      customer={customer}
      order={order}
      formSubmit={formSubmit}
      buttonDisabled={buttonDisabled} 
    />
  </>
}

export default connect(mapStateToProps, { postData })(PreviewAndSubmit);