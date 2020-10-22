import React, { useEffect } from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// components
import { Container, Card, Ul, Li } from '../tag/tag.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getReq } from '../../state/api/get-request';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectCustomerData } from '../../state/customer/customer.selectors';
import { CustomerActionTypes } from '../../state/customer/customer.types';

const CustomerInfo = ({
  getReq,
  data,
  alertMessage
}) => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { id } = queryObj;

  const { byId } = data;

  useEffect(() => {
    const fetchSuccess = CustomerActionTypes.CUSTOMER_FETCH_SUCCESS;

    if ((byId === undefined) || (byId && byId._id !== id)) {
      getReq('/customers/' + id, fetchSuccess)
    }
    // eslint-disable-next-line
  }, [])

  return <>
    { alertMessage && <AlertMesg /> }

    { 
      byId && byId._id === id &&
      <>
      <Container width="col">
        <Card width="col" title="Customer Information">
          <Ul>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{byId.fullname}</span><br />
                      <span>{byId.streetAddress1}, {byId.city}, {byId.state}</span><br />
                      <span>Phone# {byId.phone}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Link 
                        to={{
                          pathname: location.pathname,
                          search: `?${id}&action=customer-edit`,
                          state: {
                            from: location.pathname + location.search
                          }
                        }}
                        className="a-link-cs"
                      >
                        Update Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Shipping Address:</span>
                    </div>
                    <div className="col-8 align-self-center">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor='billing'>
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="shippingAddress" 
                            value='' 
                            defaultChecked={(byId.shippingAddress === undefined || byId.shippingAddress === '')}
                            disabled={!(byId.shippingAddress === undefined || byId.shippingAddress === '')}
                          />
                            Same as Billing Address
                          </label>
                      </div>
                      {
                        byId.shippingInfo && byId.shippingInfo.map((address, index) => 
                          <div key={index} className="form-check">
                            <label className="form-check-label" htmlFor={address._id}>
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="shippingAddress" 
                                id={address._id}
                                value={address._id}
                                defaultChecked={(byId.shippingAddress === address._id)}
                                disabled={!(byId.shippingAddress === address._id)}
                              />
                                <span>{address.fullname}</span><br />
                                <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                                <span>Phone# {address.phone}</span>
                            </label>
                          </div>
                        )
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <Link 
                        to={{
                          pathname: location.pathname,
                          search: `?id=${id}&action=customer-shipping-info`,
                          state: {
                            from: location.pathname + location.search
                          }
                        }}
                        className="a-link-cs"
                      >
                        Update Shipping Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <Link
                    to="/"
                    className="a-link-cs"
                  >
                    Select to Order
                  </Link>
                </div>
              </div>
            </Li>
          </Ul>
        </Card>
      </Container>
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectCustomerData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);