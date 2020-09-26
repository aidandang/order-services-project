import React from 'react';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const BillingInfo = ({
  customer
}) => {
  return (
    <div className="row">
      <div className="col-12">
        {/* Account Information Card */}
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">Acount Information</div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Account #</span></div>
                <div className="col-8">{customer.account}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Username</span></div>
                <div className="col-8">{customer.username}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Email</span></div>
                <div className="col-8">{customer.email}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Nickname</span></div>
                <div className="col-8">{customer.nickname}</div>
              </div>
            </li>
          </ul>
        </div>
        {/* End of Account Information Card */}
      </div>

      <div className="col-12">
        {/* Billing Information Card */}
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">Billing Information</div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Fullname</span></div>
                <div className="col-8">{customer.fullname}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Other Name</span></div>
                <div className="col-8">{customer.othername}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Country</span></div>
                <div className="col-8">{customer.country}</div>    
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Street Address</span></div>
                <div className="col-8">{customer.streetAddress1}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Apt, Suite, Build</span></div>
                <div className="col-8">{customer.streetAddress2}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">City/District</span></div>
                <div className="col-8">{customer.city}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">State/Province</span></div>
                <div className="col-8">{customer.state}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Zip Code</span></div>
                <div className="col-8">{customer.zipcode}</div>
              </div>
            </li>
            <li className={liClassName}>
              <div className="row">
                <div className="col-4 align-self-center"><span className="font-weight-bold">Phone</span></div>
                <div className="col-8">{customer.phone}</div>
              </div>
            </li>
          </ul>
        </div>
        {/* End of Billing Information Card */}
      </div>              

    </div>
  )
}

export default BillingInfo;