import React from 'react';

// dependencies
import moment from 'moment';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';

const PreviewOrders = ({ 
  data,
  handleOnClick
}) => {

  const { allIds } = data;

  const handleShippingAddress = (order) => {
    const result = order.customer.shippingInfo.find(address => address._id === order.shippingAddress)
    return `${result.fullname}, ${result.streetAddress1}, ${result.city}, ${result.state}, ${result.phone}`
  }

  return <>
    {/* customer table */}
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Date</th>
                <th scope="col">Customer</th>
                <th scope="col">Items</th>
                <th scope="col">Shipping Address</th>
                <th scope="col">Paid</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(order => 
                <tr 
                  key={order._id}
                  className="table-row-cs" 
                  onClick={(e) => handleOnClick(e, order)}
                >
                  <th scope="row">{order.orderNumber}</th>
                  <td>{order.ref.refDate ? moment(order.ref.refDate).format("MM/DD/YY") : moment(order.createdAt).format("MM/DD/YY")}</td>
                  <td>
                    {`${order.customer.nickname} - ${order.customer.account}`}
                  </td>
                  <td>
                    {
                      order.items.map(item => <div key={item._id}>{`${item.product.name}/Size: ${item.size}/Qty: ${item.qty}`}</div>)
                    }
                  </td>
                  <td>
                    {
                      (order.shippingAddress === '' || order.shippingAddress === null)
                      ? 'Same as Billing Address' 
                      : handleShippingAddress(order)
                    }
                  </td>
                  <td>{order.paidAmount}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of customer table --> */}
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectOrderData
})

export default connect(mapStateToProps)(PreviewOrders);