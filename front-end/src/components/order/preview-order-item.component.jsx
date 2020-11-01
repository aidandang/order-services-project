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

  const { items } = order;

  const subTotal = (qty, price) => {
    const value = strToAcct(price) * Number(qty);
    return acctToStr(value);
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
                <th scope="col" className="text-right">Subtotal</th>
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
                <td colSpan="8" className="text-center">
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
                    Add a New Item
                  </Link>
                </td>
              </tr>
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