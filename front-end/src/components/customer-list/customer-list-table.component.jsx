import React from 'react';

// dependencies
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// components
import withCustomerData from '../api/withCustomerData';
import PaginationBar from '../pagination-bar/pagination-bar.component';

const CustomerListTable = ({ 
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

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    const search = `${location.search 
      ? `${location.search}&id=${customer._id}&action=customer-info` 
      : `?id=${customer._id}&action=customer-info`
    }`
    const path = location.pathname + search;

    history.push(path, {
      from: location.pathname + location.search
    })
  }

  return <>
    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={queryObj.page}
    />

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

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={queryObj.page}
    />
  </>
}

export default withCustomerData(CustomerListTable);