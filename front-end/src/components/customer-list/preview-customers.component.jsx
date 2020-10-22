import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';

const PreviewCustomers = ({ 
  data
}) => {

  const location = useLocation();
  const history = useHistory();

  const { allIds } = data;

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    const search = `?id=${customer._id}&action=customer-info`
    const path = location.pathname + search;

    history.push(path, {
      from: location.pathname + location.search
    })
  }

  return <>
    {/* customer table */}
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive-sm">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Account#</th>
                <th scope="col">Nickname</th>
                <th scope="col">Fullname</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {allIds.map(customer => 
                <tr 
                  key={customer._id}
                  className="table-row-cs" 
                  onClick={e => handleOnClick(e, customer)}
                >
                  <th scope="row">
                    <span className="mr-2">{customer.account}</span>
                    {customer.status === "na" && <a href="/" className="a-link-cs">A</a>}
                  </th>
                  <td>{customer.nickname}</td>
                  <td>{customer.fullname}</td>
                  <td>
                    {`${customer.streetAddress1}, ${customer.city}, ${customer.state}`}{customer.streetAddress2 !== "" && `, (${customer.streetAddress2})`}
                  </td>
                  <td>{customer.phone}</td>
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
  data: selectCustomerData
})

export default connect(mapStateToProps)(PreviewCustomers);