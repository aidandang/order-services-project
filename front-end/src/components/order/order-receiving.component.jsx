import React from 'react';

// dependencies
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';

const OrderReceiving = ({ 
  order
}) => {

  const { receiving } = order

  const location = useLocation();

  return <>
    <Card width="col" title="Receiving Information">
      <Ul>
        {
          receiving && <>
            <Li>
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-4">
                      <span>Status:</span>
                    </div>
                    <div className="col-8">
                      <span>{receiving.status}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Tracking Number:</span>
                    </div>
                    <div className="col-8">
                      <span>{receiving.tracking.length > 0 ? receiving.tracking : 'Not Available'}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Received Date:</span>
                    </div>
                    <div className="col-8">
                      <span>{receiving.recvDate.length > 0 ? moment(receiving.recvDate).format('MMM DD, YYYY') : 'Not Available'}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <span>Warehouse:</span>
                    </div>
                    <div className="col-8">
                      <span>{receiving.warehouse.name}</span>
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
                to={`${location.pathname}/update-order-receiving`}
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

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

export default connect(mapStateToProps)(OrderReceiving);