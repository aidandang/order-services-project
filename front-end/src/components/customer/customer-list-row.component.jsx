import React from 'react';

// redux
import { connect, batch } from 'react-redux';
import { setCustomerComp } from '../../state/customer/customer.actions';
import { copyCustomerToById } from '../../state/customer/customer.actions';

const CustomerListRow = ({
  customer,
  setCustomerComp,
  copyCustomerToById
}) => {

  const handleOnClick = (e, customer) => {
    e.preventDefault();
    
    batch(() => {
      copyCustomerToById(customer)
      setCustomerComp('customer-info')
    })
  }

  return <>
    <tr 
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
  </>
}

const mapDispatchToProps = dispatch => ({
  setCustomerComp: comp => dispatch(setCustomerComp(comp)),
  copyCustomerToById: customer => dispatch(copyCustomerToById(customer))
})

export default connect(null, mapDispatchToProps)(CustomerListRow);