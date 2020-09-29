import React from 'react';

// dependencies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';
// components
import { useForm } from '../custom-hooks/use-form';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';
import CustomerSearchForm from '../customer-list/customer-search-form.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import SelectCustomer from './select-customer.component';
// redux
import { connect } from 'react-redux';
import { getReq } from '../../state/api/get-request';
import { CustomerActionTypes } from '../../state/customer/customer.types';
import { createStructuredSelector } from 'reselect';
import { selectCustomerData } from '../../state/customer/customer.selectors';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const OrderCustomerInfo = ({ 
  order,
  getReq,
  data,
  setSubmitData
}) => {

  const history = useHistory();
  const location = useLocation();

  const { customer, address, orderNumber, createdAt } = order;

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  // handle search form 
  const formSubmit = (e) => {
    e.preventDefault();

    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS
    
    const queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      getReq('/customers', fetchSuccess, queryStr)
    }
  }

  return <>
    { 
      customer
      ?
        <div className="row">
          {/* Customer Infomation */}
          <div className="col-xl-6"> 
            <div className="card my-3">

              {/* Card Header */}
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col text-uppercase font-weight-bold align-self-center">
                    Customer INFORMATION
                  </div>
                </div>
              </div>
              {/* End of Card Header */}

              {/* Card Body */}
              <ul className="list-group list-group-flush">
                <li className={liClassName}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-4">
                          <span>Nickname:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.nickname}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Account Number:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.account}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Billing Address:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.fullname}</span><br />
                          <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                          <span>Phone# {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* End of Card Body */}

            </div>             
          </div>
          {/* End of Customer Infomation */}

          {/* Shipping Infomation */}
          <div className="col-xl-6"> 
            <div className="card my-3">

              {/* Card Header */}
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col text-uppercase font-weight-bold align-self-center">ORDER INFORMATION</div>
                </div>
              </div>
              {/* End of Card Header */}

              {/* Card Body */}
              <ul className="list-group list-group-flush">
                <li className={liClassName}>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col-4">
                          <span>Order Number:</span>
                        </div>
                        <div className="col-8">
                          <span>{orderNumber ? orderNumber : 'N/A'}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Order Date:</span>
                        </div>
                        <div className="col-8">
                          <span>{createdAt ? createdAt : 'N/A'}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <span>Shipping Address:</span>
                        </div>
                        <div className="col-8">
                          <span>{customer.fullname}</span><br />
                          <span>{customer.streetAddress1}, {customer.city}, {customer.state}</span><br />
                          <span>Phone# {customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* End of Card Body */}

            </div>             
          </div>
          {/* End of Shipping Infomation */}  

        </div>
      : <>
        <CustomerSearchForm
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />

        {
          data.allIds &&
          <>
            <PaginationBar numberOfPages={data.info.pages} />
            <SelectCustomer setSubmitData={setSubmitData} />
            <PaginationBar numberOfPages={data.info.pages} />
          </>
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerInfo)