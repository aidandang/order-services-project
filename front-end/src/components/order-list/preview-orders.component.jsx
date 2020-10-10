import React from 'react';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';

const PreviewOrders = ({ 
  data,
  handleOnClick
}) => {

  const { allIds } = data;

  return <>
    {/* customer table */}
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Order#</th>
                <th scope="col">Created At</th>
                <th scope="col">Customer</th>
                <th scope="col">Items</th>
                <th scope="col">Shipping Address</th>
                <th scope="col">Paid Ammount</th>
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
                  <td>{order.createdAt}</td>
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
                      order.shippingAddress === '' 
                      ? 'Same as Billing Address' 
                      : `${order.shippingAddress.fullname}, 
                        ${order.shippingAddress.streetAddress1}, 
                        ${order.shippingAddress.city},
                        ${order.shippingAddress.state},
                        ${order.shippingAddress.phone}`
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