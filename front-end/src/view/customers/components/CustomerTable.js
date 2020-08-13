import React from 'react';

export default function CustomerTable({ 
  customers,
  onClickTableRow
}) {
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
              {customers.map(customer => 
                <tr 
                  key={customer._id}
                  className="table-row-cs" 
                  onClick={(e) => {
                    e.preventDefault();
                    onClickTableRow(customer._id)
                  }}
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