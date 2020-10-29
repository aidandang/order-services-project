import React from 'react';

// dependencies
import uuid from 'react-uuid';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';

// components
import { Container, Ul, Li, Card } from '../tag/tag.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';

const OrderAdd = ({
  order
}) => {

  const { orderInfo, items } = order;

  const location = useLocation()

  let sum = 0;

  const total = () => (qty, price, saleTax, localCharge, shippingCost) => {
    const value = strToAcct(price, saleTax, localCharge, shippingCost) * Number(qty);
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = total();

  const handleColor = (product, selectedColor) => {
    const result = product.colors.find(color => color._id === selectedColor);
    return result.color
  }

  const formSubmit = (e) => {
    e.preventDefault();
  }

  return <>
    <Container width="col">
      <form onSubmit={formSubmit}>
        <Card width="col" title="Order Information">
          <Ul>
            {
              orderInfo 
              ? 
              <>
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
                <Li>
                  <div className="row">
                    <div className="col">
                      <Link 
                        to={{
                          pathname: location.pathname,
                          search: '?select=order-info',
                          state: {
                            from: location.pathname
                          }
                        }}
                        className="a-link-cs"
                      >
                        Reselect customer
                      </Link>
                    </div>
                  </div> 
                </Li> 
              </>
              : 
              <Li>
                <div className="row">
                  <div className="col">
                    <Link 
                      to={{
                        pathname: location.pathname,
                        search: '?select=order-info',
                        state: {
                          from: location.pathname
                        }
                      }}
                      className="a-link-cs"
                    >
                      Update Details
                    </Link>
                  </div>
                </div> 
              </Li> 
            }
          </Ul>
        </Card>    
         
        {/* Item Table */}
        <div className="row mt-3">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Style#</th>
                    <th scope="col">Item/Description</th>
                    <th scope="col" className="text-right">Qty</th>
                    <th scope="col" className="text-right">Price</th>
                    <th scope="col" className="text-right">Sale Tax</th>
                    <th scope="col" className="text-right">Local Charge</th>
                    <th scope="col" className="text-right">Shipping Cost</th>
                    <th scope="col" className="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 &&
                    items.map((item, index) => 
                      <tr key={uuid()} className="table-row-no-link-cs">
                        <td>{item.product.styleCode}</td>
                        <td>{`${item.product.name}/Color:${handleColor(item.product, item.color)}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                        <td className="text-right">{item.qty}</td>
                        <td className="text-right">{item.price}</td>
                        <td className="text-right">{item.saleTax}</td>
                        <td className="text-right">{item.localCharge}</td>
                        <td className="text-right">{item.shippingCost}</td>
                        <th scope="row" className="text-right">
                          {subTotal(item.qty, item.price, item.saleTax, item.localCharge, item.shippingCost)}
                        </th>
                      </tr>
                    ) 
                  }
                  <tr className="table-row-no-link-cs">
                        <td colSpan="8" className="text-center"><a href="/" className="a-link-cs">Add a New Item</a></td>
                      </tr>
                  {
                    items.length > 0 && <>
                      <tr className="table-row-no-link-cs">
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td colSpan="2" className="text-right">Subtotals</td>
                        <td className="text-right"></td>
                        <td className="text-right">{acctToStr(sum)}</td>
                      </tr>
                      <tr className="table-row-no-link-cs">
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td colSpan="2" className="text-right">Discount</td>
                        <td className="text-right"></td>
                        <td className="text-right">.00</td>
                      </tr>
                      <tr className="table-row-no-link-cs">
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <td className="text-right"></td>
                        <th scope="row" colSpan="2" className="text-right">Total</th>
                        <td className="text-right"></td>
                        <th scope="row" className="text-right">{acctToStr(sum)}</th>
                      </tr>
                    </>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End of Item Table */}
      </form>   
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

export default connect(mapStateToProps)(OrderAdd);