import React from 'react';

// dependencies
import { Link, useLocation, useHistory } from 'react-router-dom';

// components
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeOrderItem } from '../../state/order/order.actions';
import { selectOrderEditing } from '../../state/order/order.selectors';

const PreviewOrderItem = ({
  order,
  removeOrderItem
}) => {

  const location = useLocation();
  const history = useHistory();

  const { items, orderCost } = order;

  let shippingCost = ""
  let saleTax = ""

  if (orderCost) {
    shippingCost = orderCost.shippingCost
    saleTax = orderCost.saleTax
  }

  let sum = 0;

  const subTotalCalc = () => (qty, price) => {
    const value = strToAcct(price) * Number(qty);
    sum = sum + value;
    return acctToStr(value);
  }
  
  const subTotal = subTotalCalc();

  const total = (sum, shippingCost, saleTax) => {
    return acctToStr(sum + strToAcct(shippingCost, saleTax))
  }

  const editOrderItem = (index) => {
    history.push(
      `${location.pathname}${location.search}&select=order-item&index=${index}`,
      { from: `${location.pathname}${location.search}`}
    )
  }

  return <>
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
                <th scope="col" className="text-right">Amount</th>
                <th scope="col" className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 &&
                items.map((item, index) => 
                  <tr 
                    key={index} 
                    className="table-row-no-link-cs span-link-cs"
                    onClick={e => {
                      editOrderItem(index);
                    }}
                  >
                    <td>{item.product.styleCode}</td>
                    <td>{`${item.product.name}/Color:${item.color.color}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">{item.price}</td>
                    <th scope="row" className="text-right">
                      {subTotal(item.qty, item.price)}
                    </th>
                    <td 
                      className="text-right"
                    >
                      <span 
                        className="span-link-cs text-danger"
                        onClick={e => {
                          e.stopPropagation();
                          removeOrderItem(index)
                        }}
                      >
                        {/* eslint-disable-next-line */}
                        &#10134;
                      </span>
                    </td>
                  </tr>
                ) 
              }
              <tr className="table-row-no-link-cs">
                <td colSpan="6" className="text-left">
                  <Link 
                    to={{
                      pathname: location.pathname,
                      search: `${location.search}&select=order-item`,
                      state: {
                        from: location.pathname + location.search
                      }
                    }}
                    className="a-link-cs"
                  >
                    Add Item
                  </Link>
                </td>
              </tr>
              {
                Object.keys(items).length > 0 && <>
                  <tr className="table-row-no-link-cs">
                    <td colSpan="6" className="text-left">
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
                        Update Local Costs
                      </Link>
                    </td>
                  </tr>
                  <tr className="table-row-no-link-cs">
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
                  </tr>
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* End of Item Table */}
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  removeOrderItem: index => dispatch(removeOrderItem(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewOrderItem);