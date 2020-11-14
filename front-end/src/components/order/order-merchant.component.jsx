import React from 'react';

// dependencies
import moment from 'moment';
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';

const OrderMerchant = ({ 
  order
}) => {

  const location = useLocation()

  const { info } = order

  return <>
    <Card width="col" title="Merchant's Order">
      <Ul>
        {
          info && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Order Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{info.orderNumber}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Order Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{moment(info.orderDate).format('MMM DD, YYYY')}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Order Type:</span>
                    </div>
                    <div className="col-8">
                      <span>{info.orderType}</span>
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
                      <span>{info.merchant.name}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Official Website:</span>
                    </div>
                    <div className="col-8">
                      <a 
                        href={info.merchant.url}
                        className="a-link-cs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.merchant.url}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Li>
          </>
        }
        <Li>
          <Link
            to={`${location.pathname}/update-order-merchant`}
            className="a-link-cs"
          >
            Update Merchant's Order
          </Link>
        </Li> 
      </Ul>
    </Card>  
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

export default connect(mapStateToProps)(OrderMerchant);