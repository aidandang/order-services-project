import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

const PreviewOrderSale = ({ 
  sale 
}) => {

  const location = useLocation();

  const { customer } = sale;

  let address = null

  if (customer) {
    address = sale.customer.shippingInfo.find(item => item._id === sale.customer.shippingAddress)
  }
  
  const total = (salePrice, shippingPrice) => {
    return acctToStr(strToAcct(salePrice, shippingPrice))
  }

  return <>
    <Card width="col" title="Billing Information">
      <Ul>
        {
          customer && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{sale.customer.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{sale.customer.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{sale.customer.fullname}</span><br />
                      <span>{sale.customer.streetAddress1}, {sale.customer.city}, {sale.customer.state}</span><br />
                      <span>Phone# {sale.customer.phone}</span>
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
                        address
                        ? <>
                          <span>{address.fullname}</span><br />
                          <span>{address.streetAddress1}, {address.city}, {address.state}</span><br />
                          <span>Phone# {address.phone}</span>
                        </>
                        : 
                        <span>Same as Billing Address</span>
                      }
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
                      <span>Sale Price:</span>
                    </div>
                    <div className="col-8 align-self-center">
                      {sale.salePrice}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Shipping Price:</span>
                    </div>
                    <div className="col-8 align-self-center">
                      {sale.shippingPrice.length > 0 ? sale.shippingPrice : '.00'}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Total:</span>
                    </div>
                    <div className="col-8 align-self-center">
                      {total(sale.salePrice, sale.shippingPrice)}
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