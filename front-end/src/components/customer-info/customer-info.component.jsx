import React, { useState } from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import withCustomerData from '../api/withCustomerData';
import { Container, Card, Ul, Li } from '../tag/tag.component';
import CustomerEdit from './customer-edit.component';
import CustomerShippingInfo from './customer-shipping-info.component';

const CustomerInfo = ({
  data
}) => {

  const location = useLocation();

  const { byId } = data;

  const [edit, setEdit] = useState('');

  const goBack = () => {
    setEdit('')
  }

  return <>
    {
      edit === '' &&
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
                      <a
                        href="/"
                        className="a-link-cs"
                        onClick={e => {
                          e.preventDefault();
                          setEdit('customer-edit')
                        }}
                      >
                        Update Information
                      </a>
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
                      <a
                        href="/"
                        className="a-link-cs"
                        onClick={e => {
                          e.preventDefault();
                          setEdit('customer-shipping-info')
                        }}
                      >
                        Update Shipping Information
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col">
                  <Link
                    to={location.pathname + `?select=customer&action=save&id=${byId._id}`}
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
    }
    {
      edit === 'customer-edit' &&
      <CustomerEdit byId={byId} goBack={goBack} /> 
    }
    {
      edit === 'customer-shipping-info' &&
      <CustomerShippingInfo byId={byId} goBack={goBack} />
    }
  </>
}

export default withCustomerData(CustomerInfo);