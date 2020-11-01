import React from 'react';

// dependencies
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

// components
import withOrderData from '../api/withOrderData';
import PaginationBar from '../pagination-bar/pagination-bar.component';

const OrderListTable = ({ 
  data,
  queryObj,
  setQueryObj
}) => {

  const location = useLocation();
  const history = useHistory();
  const { allIds } = data;

  // handle search form 
  const onPageChange = (e, page) => {
    e.preventDefault();

    const obj = queryString.parse(queryObj.str);
    let queryStr = null;

    if (obj.page) {
      obj.page = page;
      queryStr = '?' + queryString.stringify(obj);
    } else {
      queryStr = queryObj.str ? `${queryObj.str}&page=${page}` : `?page=${page}`
    }
    
    setQueryObj(prevState => ({
      ...prevState,
      str: queryStr,
      page
    }))
  }

  const handleOnClick = (e, order) => {
    e.preventDefault();
    const search = `?id=${order._id}&action=order-info`
    const path = location.pathname + search;

    history.push(path, {
      from: location.pathname + location.search
    })
  }

  const handleShippingAddress = (order) => {
    const result = order.customer.shippingInfo.find(address => address._id === order.shippingAddress)
    return `${result.fullname}, ${result.streetAddress1}, ${result.city}, ${result.state}, ${result.phone}`
  }

  return <>
    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={queryObj.page}
    />

    {/* order list table */}
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
    {/* <!-- end of order list table --> */}

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={queryObj.page}
    />
  </>
}

export default withOrderData(OrderListTable);