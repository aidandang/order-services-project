import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';

const OrderCustomer = ({ 
  order 
}) => {

  const location = useLocation();
  const { billing } = order;

  let address = null

  if (billing.customer) {
    address = billing.customer.shippingInfo.find(item => item._id === billing.customer.shippingAddress)
  }

  return <>
    <Card width="col" title="Customer Information">
      <Ul>
        {
          billing.customer && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Nickname:</span>
                    </div>
                    <div className="col-8">
                      <span>{billing.customer.nickname}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Account Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{billing.customer.account}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Billing Address:</span>
                    </div>
                    <div className="col-8">
                      <span>{billing.customer.fullname}</span><br />
                      <span>{billing.customer.streetAddress1}, {billing.customer.city}, {billing.customer.state}</span><br />
                      <span>Phone# {billing.customer.phone}</span>
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
          </>
        }
        <Li>
          <Link 
            to={`${location.pathname}/select-customer`}
            className="a-link-cs"
          >
            {`${billing.customer ? 'Reselect Customer' : 'Select Customer'}`}
          </Link>
        </Li> 
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

export default connect(mapStateToProps)(OrderCustomer);