import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';

const PreviewOrderSale = ({ 
  order 
}) => {

  const location = useLocation();

  const { sale, items } = order;

  let address = null

  if (sale.customer) {
    address = sale.customer.shippingInfo.find(item => item._id === sale.customer.shippingAddress)
  }

  let sum = 0;

  const subTotalCalc = () => (qty, salePrice, shippingPrice) => {
    const value = strToAcct(salePrice, shippingPrice) * Number(qty);
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = subTotalCalc();

  const percentageCalc = (salePrice, price) => {

    let p = 0;

    if (salePrice) {
      p = (salePrice - price) / price * 100
    }

    if (p === 0) {
      return '.00'
    } else {
      return p.toFixed(2)
    }
  }

  const salePriceCalc = (price, int) => {
    const salePrice = price / 100 * (1 + int/100);

    return acctToStr(salePrice.toFixed(2)*100)
  }

  const shippingPriceCalc = (weight) => {
    const price = 1;

    const shippingPrice = price * weight * 100
    return acctToStr(shippingPrice)
  }

  return <>
    <Card width="col" title="Billing Information">
      <Ul>
        {
          sale.customer && <>
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

    { 
      sale.customer &&
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
                  <th scope="col" className="text-right">% Int</th>
                  <th scope="col" className="text-right">Sale Price</th>
                  <th scope="col" className="text-right">Shipping</th>
                  <th scope="col" className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 &&
                  items.map((item, index) => 
                    <tr 
                      key={index} 
                      className="table-row-no-link-cs span-link-cs"
                    >
                      <td>{item.product.styleCode}</td>
                      <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                      <td className="text-right">{item.qty}</td>
                      <td className="text-right">{item.price}</td>
                      <td className="text-right">{percentageCalc(strToAcct(item.salePrice), strToAcct(item.price))}</td>
                      <td className="text-right">{item.salePrice.length > 0 ? item.salePrice : '.00'}</td>
                      <td className="text-right">{item.shippingPrice.length > 0 ? item.shippingPrice : '.00'}</td>
                      <th scope="row" className="text-right">
                        {subTotal(item.qty, item.salePrice, item.shippingPrice)}
                      </th>
                    </tr>
                  ) 
                }
                
                <tr className="table-row-no-link-cs">
                  <td colSpan="8" className="text-left">
                    <Link 
                      to={{
                        pathname: location.pathname,
                        search: `${location.search}&select=order-cost`,
                        state: {
                          from: location.pathname + location.search
                        }
                      }}
                      className="a-link-cs"
                    >
                      Update Costs
                    </Link>
                  </td>
                </tr>
                {/* <tr className="table-row-no-link-cs">
                  <td className="text-right"></td>
                  <td className="text-right"></td>
                  <td colSpan="2" className="text-right">Subtotal</td>
                  <td className="text-right">{acctToStr(sum)}</td>
                  <td className="text-right"></td>
                </tr>
                <tr className="table-row-no-link-cs">
                  <td className="text-right"></td>
                  <td className="text-right"></td>
                  <td colSpan="2" className="text-right">
                    Local Shipping
                  </td>
                  <td className="text-right">{shippingCost.length > 0 ? shippingCost : '.00'}</td>
                  <td className="text-right"></td>
                </tr>
                <tr className="table-row-no-link-cs">
                  <td className="text-right"></td>
                  <td className="text-right"></td>
                  <td colSpan="2" className="text-right">
                    Local Sale Tax
                  </td>
                  <td className="text-right">{saleTax.length > 0 ? saleTax : '.00'}</td>
                  <td className="text-right"></td>
                </tr>
                <tr className="table-row-no-link-cs">
                  <td className="text-right"></td>
                  <td className="text-right"></td>
                  <th scope="row" colSpan="2" className="text-right">Total</th>
                  <th scope="row" className="text-right">
                    {total(sum, shippingCost, saleTax)}
                  </th>
                  <td className="text-right"></td>
                </tr> */}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

export default connect(mapStateToProps)(PreviewOrderSale);