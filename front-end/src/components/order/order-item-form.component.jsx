import React from 'react';

// components
import { Li, TextInput } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { setIsSelectingProduct } from '../../state/order/order.actions';

const OrderItemForm = ({
  formData,
  errors,
  onInputChange,
  setIsSelectingProduct
}) => {

  const { product, color } = formData;

  return <>
    {
      product && color && <>
        <Li>
          <div className="row">
            <div className="col-4 align-self-center"><span className="font-weight-bold">Name:</span></div>
            <div className="col-8">{product.name}</div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-4 align-self-center"><span className="font-weight-bold">Brand:</span></div>
            <div className="col-8">{product.brand.name}</div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-4 align-self-center"><span className="font-weight-bold">Style No:</span></div>
            <div className="col-8">{product.styleCode}</div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-4 align-self-center"><span className="font-weight-bold">Color:</span></div>
            <div className="col-8">{color.color}</div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-4 align-self-center"><span className="font-weight-bold">Description:</span></div>
            <div className="col-8">{product.desc}</div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-4">
              <TextInput
                label="Size (*)" 
                name="size"
                errors={errors}
                smallText="Size of the product."
                value={formData.size}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-4">
              <TextInput
                label="Qty (*)" 
                name="qty"
                id="integerMask-order-item-form-qty"
                errors={errors}
                smallText="Qty of the item."
                value={formData.qty}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-4">
              <TextInput
                label="Price (*)" 
                name="price"
                id="currencyMask-order-item-form-price"
                errors={errors}
                smallText="Price per unit."
                value={formData.price}
                onChange={onInputChange}
              />
            </div>
          </div>
        </Li>
        <Li>
          <TextInput
            label="Note" 
            name="note"
            errors={errors}
            smallText="Additional note to the item."
            value={formData.note}
            onChange={onInputChange}
          />
        </Li>
      </>
    }
    <Li>
      <div className="row">
        <div className="col">
          <a 
            href="/" 
            className="a-link-cs"
            onClick={e => {
              e.preventDefault();
              setIsSelectingProduct(true)
            }}
          >
            {formData.product ? 'Reselect Product' : 'Select Product'}
          </a>
        </div>
      </div>
    </Li>
  </>
}

const mapDispatchToProps = dispatch => ({
  setIsSelectingProduct: payload => dispatch(setIsSelectingProduct(payload))
})

export default connect(null, mapDispatchToProps)(OrderItemForm);