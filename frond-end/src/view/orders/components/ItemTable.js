import React from 'react';

// import dependecies
import uuid from 'react-uuid';

export default function ItemTable({ 
  order,
  pageActive,
  removeItem
}) {
  return <>
    {/* customer table */}
    <div className="row mt-3">
      <div className="col">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Style#/Color</th>
                <th scope="col">Item/Description</th>
                <th scope="col" className="text-right">Price</th>
                <th scope="col" className="text-right">Qty</th>
                <th scope="col" className="text-right">Sale Tax</th>
                <th scope="col" className="text-right">Local Charge</th>
                <th scope="col" className="text-right">Shipping Cost</th>
                <th scope="col" className="text-right">Subtotal</th>
                <th scope="col" className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((item, index) => 
              <tr 
                key={uuid()} 
                className="table-row-cs"
                onClick={(e) => {
                  e.preventDefault();
                  pageActive({
                    name: 'ITEM_DETAILS',
                    itemId: index,
                    colorId: item.color._id
                  })
                }}
              >
                <td>{item.product.styleCode}/{item.product.colors[index].color}</td>
                <td>{`${item.product.name}/Size:${item.size}${item.note && `/${item.note}`}`}</td>
                <td className="text-right">{item.price}</td>
                <td className="text-right">{item.qty}</td>
                <td className="text-right">{item.saleTax}</td>
                <td className="text-right">{item.localCharge}</td>
                <td className="text-right">{item.shippingCost}</td>
                <th scope="row" className="text-right">{item.qty * 1 * (item.price * 1 + item.saleTax * 1 + item.localCharge * 1 + item.shippingCost * 1)}</th>
                <td 
                  className="text-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(index)
                  }}
                >
                  <span className="table-link-cs text-danger"><i className="fas fa-minus"></i></span>
                </td>
              </tr>)}
              <tr 
                className="table-row-cs" 
                onClick={(e) => {
                  e.preventDefault();
                  pageActive({ name: 'PRODUCT_LIST' })
                }}
              >
                <td colSpan="9" className="text-center"><span className="a-link-cs">Add a New Item (+)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* <!-- end of customer table --> */}
  </>
}