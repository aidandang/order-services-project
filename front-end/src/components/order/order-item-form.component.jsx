import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { Link, useLocation, useHistory } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderItem, updateOrderItem } from '../../state/order/order.actions';
import { selectOrderEditing } from '../../state/order/order.selectors';

// initial form state
const formSchema = Yup.object().shape({
  product: Yup
    .object(),
  color: Yup
    .object(),
  size: Yup
    .string(),
  qty: Yup
    .string()
    .required(),
  price: Yup
    .string()
    .required(),
  note: Yup
    .string()
})

const formState = {
  product: null,
  color: null,
  size: "",
  qty: "",
  price: "",
  salePrice: "",
  weight: "",
  shippingPrice: "",
  note: ""
}

// main component
const OrderItemForm = ({
  order,
  saveOrderItem,
  updateOrderItem
}) => {

  const location = useLocation();
  const history = useHistory();

  const { item } = order;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const { product, color } = formData;

  const formSubmit = () => {
    const obj = { ...formData }
    delete obj.index;

    if (item.index) {
      updateOrderItem(obj, Number(item.index))
    } else {
      saveOrderItem(obj);
    }

    const pathname = location.pathname.split('/update-order-item')[0]
    history.push(pathname)
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (Object.keys(item).length > 0) setValues(prevState => ({
      ...prevState, ...item
    }))
    // eslint-disable-next-line
  }, [])

  return <>
    <Card width="col" title={`${item.index ? 'Edit Item' : 'Add Item'}`}>
      <Ul>
        <Li>
          <div className="row">
            <div className="col-12">
              <Link 
                to={`${location.pathname}/select-product`} 
                className="a-link-cs"
              >
                {formData.product ? 'Reselect Product' : 'Select Product'}
              </Link>
            </div>
          </div>
        </Li>
        {
          formData.product && <>
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
            <SubmitOrReset
              buttonName={'Save'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </>
        }
      </Ul>
    </Card>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderItem: payload => dispatch(saveOrderItem(payload)),
  updateOrderItem: (item, index) => dispatch(updateOrderItem(item, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemForm);