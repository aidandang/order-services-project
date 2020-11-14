import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory } from 'react-router-dom'; 

// components
import { Card, Ul, Li, TextInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import { strToAcct } from '../utils/strToAcct';
import { acctToStr } from '../utils/acctToStr';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateOrderItem } from '../../state/order/order.actions';
import { selectOrderEditing } from '../../state/order/order.selectors';

// inital values
const formSchema = Yup.object().shape({
  salePrice: Yup
    .string()
    .required(),
  shippingPrice: Yup
    .string(),
  int: Yup
    .string(),
  weight: Yup
    .string()
    .required()
});

const formState = {
  salePrice: "",
  shippingPrice: "",
  int: "",
  weight: ""
}

// main component
const OrderSaleForm = ({
  order,
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

  const shippingPriceCalc = (weight) => {
    const price = 1;

    const shippingPrice = price * weight
    return acctToStr(shippingPrice)
  }

  const salePriceCalc = (price, int) => {
    const p = int/10000
    const salePrice = price * (1 + p)
    const s = salePrice.toFixed(0)
    
    return acctToStr(Number(s))
  }
  
  const formSubmit = () => {
    const obj = { ...formData }

    delete obj.index;
    delete obj.int;

    updateOrderItem(obj, Number(item.index))
    const pathname = location.pathname.split('/update-sale-price')[0];
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
    {
      item.index &&
      <Card width="col" title="Update Sale Price">
        <Ul>
          <Li>
            <div className="row">
              <div className="col-xl-4">
                <TextInput
                  label="% Interest" 
                  name="int"
                  id="currencyMask-order-sale-item-form-int"
                  errors={errors}
                  smallText={`Estimated Sale Price: $${salePriceCalc(strToAcct(item.price), strToAcct(formData.int))}`}
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
                  id="currencyMask-order-sale-item-form-weight"
                  errors={errors}
                  smallText={`Estimated Shipping Price: $${shippingPriceCalc(strToAcct(formData.weight))}`}
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
            buttonName={'Save'}
            buttonDisabled={buttonDisabled}
            formSubmit={formSubmit}
            formReset={formReset}
          />
        </Ul>
      </Card>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  updateOrderItem: (item, index) => dispatch(updateOrderItem(item, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSaleForm);