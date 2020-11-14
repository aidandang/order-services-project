import React from 'react';

// dependencies
import * as Yup from "yup";
import { useHistory, useLocation } from 'react-router-dom';

// components
import { Card, Ul, Li, TextInput, SelectInput, DateInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import Merchant from '../merchant/merchant.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderInfo } from '../../state/order/order.actions';
import { selectMerchantData } from '../../state/merchant/merchant.selectors';
import { selectOrderEditing } from '../../state/order/order.selectors';

// inital values
const formSchema = Yup.object().shape({
  merchant: Yup
    .string()
    .required(),
  orderNumber: Yup
    .string()
    .required(),
  orderDate: Yup
    .string()
    .required(),
  orderType: Yup
    .string()
    .required()
});

const formState = {
  merchant: "",
  orderNumber: "",
  orderDate: "",
  orderType: ""
}

const OrderMerchantForm = ({
  order,
  merchantData,
  saveOrderInfo
}) => {

  const location = useLocation();
  const history = useHistory();

  const { info } = order;

  let orderEditing = null;

  if (info) {
    orderEditing = {
      ...formState,
      merchant: info.merchant._id,
      orderNumber: info.orderNumber,
      orderDate: info.orderDate,
      orderType: info.orderType
    }
  }

  let merchants = null;

  if (merchantData.allIds) merchants = merchantData.allIds;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = () => {
    
    const merchantObj = merchantData.allIds.find(item => item._id === formData.merchant)

    const obj = { 
      ...formData,
      merchant: merchantObj,
    }

    saveOrderInfo(obj);

    const pathname = location.pathname.split('/update-order-merchant')[0]
    history.push(pathname)
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>
    <div className="row">
      <div className="col-12 col-xl-8">
        <Card width="col" title="Merchant's Order">
          <Ul>
            <Li>
              <SelectInput
                label="Merchant (*)" 
                name="merchant"
                errors={errors}
                size="col-xl-6"
                smallText="Select a merchant, add new if there is no merchant."
                defaultValue=""
                defaultText="..."
                value={formData.merchant ? formData.merchant : ""}
                onChange={onInputChange}
                data={merchants}
                valueKey="_id"
                textKey="name"
              />
            </Li>
            <Li>
              <div className="row">
                <div className="col-xl-6">
                  <TextInput
                    label="Order Number (*)" 
                    name="orderNumber"
                    errors={errors}
                    smallText="Order number is required."
                    value={formData.orderNumber}
                    onChange={onInputChange}
                  />
                </div>
                <div className="col-xl-6">
                  <DateInput
                    label="Order Date (*)" 
                    name="orderDate"
                    errors={errors}
                    smallText="Order date is required."
                    value={formData.orderDate}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </Li>
            <Li>
              <SelectInput
                label="Order Type" 
                name="orderType"
                errors={errors}
                size="col-xl-6"
                smallText="Online or walk-in."
                defaultValue=""
                defaultText="Choose..."
                value={formData.orderType ? formData.orderType : ""}
                onChange={onInputChange}
                data={[{ type: 'Online'}, { type: 'Walk-in'}]}
                valueKey="type"
                textKey="type" 
              />
            </Li>
            <SubmitOrReset
              buttonName={'Save'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </Ul>
        </Card>
      </div>
      <div className="col-12 col-xl-4">
        <Card width="col" title="Update Merchants">
          <Ul>
            <Merchant
              pathname={'/merchants'}
              component={'merchant'}
            />
          </Ul>
        </Card>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing,
  merchantData: selectMerchantData
})

const mapDispatchToProps = dispatch => ({
  saveOrderInfo: payload => dispatch(saveOrderInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderMerchantForm);