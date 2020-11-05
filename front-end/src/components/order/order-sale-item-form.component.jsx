import React from 'react';

// components
import { Card, Ul, Li, TextInput} from '../tag/tag.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';

const OrderSaleItemForm = ({
  formSubmit,
  formReset,
  buttonDisabled,
  formData,
  errors,
  onInputChange,
  order,
  itemIndex,
  setItemIndex
}) => {

  const { items } = order;

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
    {
      itemIndex !== null 
      ? <>
        <Card width="col" title="Update Item">
          <Ul>
            <Li>
              <div className="row">
                <div className="col-xl-4">
                  <TextInput
                    label="% Interest" 
                    name="int"
                    id="integerMask-order-sale-item-form-int"
                    errors={errors}
                    smallText={`Estimated Sale Price: $${salePriceCalc(strToAcct(items[itemIndex].price), Number(formData.int))}`}
                    value={formData.int}
                    onChange={onInputChange}
                  />
                </div>
                <div className="col-xl-4">
                  <TextInput
                    label="Actual Sale Price" 
                    name="salePrice"
                    id="currencyMask-order-sale-item-form-sale-price"
                    errors={errors}
                    smallText="Sale price if other than estimated."
                    value={formData.salePrice}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </Li>
            <Li>
              <div className="row">
                <div className="col-xl-4">
                  <TextInput
                    label="Weight" 
                    name="weight"
                    id="integerMask-order-sale-item-form-weight"
                    errors={errors}
                    smallText={`Estimated Shipping Price: $${shippingPriceCalc(Number(formData.weight))}`}
                    value={formData.weight}
                    onChange={onInputChange}
                  />
                </div>
                <div className="col-xl-4">
                  <TextInput
                    label="Actual Shipping Price" 
                    name="shippingPrice"
                    id="currencyMask-order-sale-item-form-shipping-price"
                    errors={errors}
                    smallText="Sale price if other than estimated."
                    value={formData.shippingPrice}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </Li>
            <SubmitOrReset
              buttonName={'Update'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
              props={{ itemIndex }}
            />
          </Ul>
        </Card>
      </>
      : <>
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
                          e.stopPropagation();
                          setItemIndex(index);
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End of Item Table */}
      </>
    }
  </>
}

export default OrderSaleItemForm;
