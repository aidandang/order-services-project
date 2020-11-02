import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

const PreviewOrderSale = ({ 
  orderSale 
}) => {

  const location = useLocation();

  let address = null

  if (orderSale && orderSale.customer) {
    address = orderSale.customer.shippingInfo.find(item => item._id === orderSale.customer.shippingAddress)
  } 

  return <>
    <Card width="col" title="Sale Information">
      <Ul>
        {
          orderSale && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderSale.customer.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderSale.customer.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderSale.customer.fullname}</span><br />
                      <span>{orderSale.customer.streetAddress1}, {orderSale.customer.city}, {orderSale.customer.state}</span><br />
                      <span>Phone# {orderSale.customer.phone}</span>
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
                      {
                        address === null
                        ? 
                          <span>Same as Billing Address</span>
                        : <>
                          <span>{address.fullname}</span><br />
                          <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                          <span>Phone# {address.phone}</span>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        <Li>
          <div className="row">
            <div className="col">
              <Link 
                to={{
                  pathname: location.pathname,
                  search: `${location.search}&select=order-sale`,
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
        </Li> 
      </Ul>
    </Card>  
  </>
}

export default PreviewOrderSale;