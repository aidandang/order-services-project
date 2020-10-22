import React, { useState } from 'react';

// dependencies
import uuid from 'react-uuid';

// components
import { Container, Ul, Li, Card } from '../tag/tag.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

const OrderAdd = () => {

  const [formData, setFormData] = useState(() => ({
    items: []
  }))

  const { items } = formData; 

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

  console.log(setFormData)

  return <>
    <Container width="col">
      <form onSubmit={formSubmit}>
        <div className="row mb-3">
          <div className="col">
            <span className="h5">Add a New Order</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8"> 
            <Card width="col" title="Order Details">
              <Ul>
                <Li>
                  <div className="row">
                    <div className="col">
                      <a href="/" className="a-link-cs">Update Details</a>
                    </div>
                  </div>  
                </Li>
              </Ul>
            </Card>    
          </div>             
          <div className="col-xl-4"> 
            <Card width="col" title="Customer">
              <Ul>
                <Li>      
                  <div className="row">
                    <div className="col">
                      <a href="/" className="a-link-cs">Update Details</a>
                    </div>
                  </div>  
                </Li>
              </Ul>
            </Card>   
          </div>    
        </div>

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
                  {Object.keys(items).length > 0
                    ? items.map((item, index) => 
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
                    :
                      <tr className="table-row-no-link-cs">
                        <td colSpan="8" className="text-center"><a href="/" className="a-link-cs">Add Item to the Order</a></td>
                      </tr>
                  }
                  {
                    Object.keys(items).length > 0 && <>
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

export default OrderAdd;