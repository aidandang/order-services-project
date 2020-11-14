import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';

// components
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';
import { integerStrToNum } from '../utils/helpers';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';
import { copyOrderItemToEdit } from '../../state/order/order.actions';

const OrderSale = ({ 
  order,
  copyOrderItemToEdit 
}) => {

  const location = useLocation();
  const history = useHistory();

  const { items } = order;

  let sum = 0;

  const subTotalCalc = () => (qty, salePrice, shippingPrice) => {
    const value = strToAcct(salePrice, shippingPrice) * integerStrToNum(qty);
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

  const editOrderItem = (item, index) => {
    item.index = index.toString()
    copyOrderItemToEdit(item);

    history.push(`${location.pathname}/update-sale-price`)
  }

  return <>   
    <div className="row mb-2">
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
                    onClick={e => {
                      editOrderItem(item, index);
                    }}
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
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td className="text-right"></td>
                <td colSpan="2" className="text-right">Total</td>
                <td className="text-right">{acctToStr(sum)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  copyOrderItemToEdit: item => dispatch(copyOrderItemToEdit(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSale);