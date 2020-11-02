import React from 'react';

// dependencies
import queryString from 'query-string';

// components
import withCustomerData from '../api/withCustomerData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import CustomerListRow from './customer-list-row.component';

const CustomerListTable = ({ 
  data,
  queryObj,
  setQueryObj,
  setComp
}) => {

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
                <CustomerListRow key={customer._id} setComp={setComp} customer={customer} />
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