import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect, useHistory } from 'react-router-dom'; 
import queryString from 'query-string';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import Merchant from '../merchant/merchant.component';
import OrderInfoForm from './order-info-form.component';

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

// main component
const OrderInfo = ({
  merchantData,
  order,
  saveOrderInfo
}) => {

  const location = useLocation();
  const history = useHistory();
  const queryStr = queryString.parse(location.search);
  const { comp } = queryStr;
  const [redirect, setRedirect] = useState(false)

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

    saveOrderInfo(obj)
    setRedirect(true)
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    history.push(`${location.pathname}?comp=${comp}`)
  }

  return <>

    {
      redirect && <Redirect to={`${location.pathname}?comp=${comp}`} />
    }

    <Container width="col" goBack={goBack}>
      <div className="row">
        <div className="col-12 col-xl-8">
          <form>
            <Card width="col" title="Order Information">
              <Ul>
                <OrderInfoForm
                  formData={formData}
                  errors={errors} 
                  onInputChange={onInputChange}
                  merchants={merchants}
                />
                <SubmitOrReset
                  buttonName={'Save'}
                  buttonDisabled={buttonDisabled}
                  formSubmit={formSubmit}
                  formReset={formReset}
                />
              </Ul>
            </Card>
          </form>  
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
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  merchantData: selectMerchantData,
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderInfo: payload => dispatch(saveOrderInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);