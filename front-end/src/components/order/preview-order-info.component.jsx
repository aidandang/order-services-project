import React from 'react';

// dependencies
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

const PreviewOrderInfo = ({ 
  orderInfo 
}) => {

  const location = useLocation();

  return <>
    <Card width="col" title="Order Information">
      <Ul>
        {
          orderInfo && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Order Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderInfo.orderNumber}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Order Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{moment(orderInfo.orderDate).format('MMM DD, YYYY')}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Order Type:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderInfo.orderType}</span>
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
                      <span>Merchant:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderInfo.merchant.name}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Official Website:</span>
                    </div>
                    <div className="col-8">
                      <a 
                        href={orderInfo.merchant.url}
                        className="a-link-cs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {orderInfo.merchant.url}
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
                      <span>Status:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderInfo.status}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Warehouse:</span>
                    </div>
                    <div className="col-8">
                      <span>{orderInfo.warehouse.name}</span>
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
                  search: `${location.search}&select=order-info`,
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

export default PreviewOrderInfo;