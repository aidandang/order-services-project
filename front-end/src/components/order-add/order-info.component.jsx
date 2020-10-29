import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom'; 

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SaveAndReset from './save-end-reset.component';
import Merchant from '../merchant/merchant.component';
import Warehouse from '../warehouse/warehouse.component';
import OrderInfoForm from './order-info-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderInfo } from '../../state/order/order.actions';
import { selectMerchantData } from '../../state/merchant/merchant.selectors';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';
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
    .required(),
  status: Yup
    .string(),
  warehouse: Yup
    .string()
    .required()
});

const formState = {
  merchant: "",
  orderNumber: "",
  orderDate: "",
  orderType: "",
  status: "",
  warehouse: ""
}

// main component
const OrderInfo = ({
  warehouseData,
  merchantData,
  order,
  saveOrderInfo
}) => {

  const location = useLocation();

  const [redirect, setRedirect] = useState(false)

  const { orderInfo } = order;

  let orderEditing = null;

  if (orderInfo) {
    orderEditing = {
      ...formState,
      merchant: orderInfo.merchant._id,
      orderNumber: orderInfo.orderNumber,
      orderDate: orderInfo.orderDate,
      orderType: orderInfo.orderType,
      status: orderInfo.status,
      warehouse: orderInfo.warehouse._id
    }
  }

  let warehouses = null;
  let merchants = null;

  if (warehouseData.allIds) warehouses = warehouseData.allIds;
  if (merchantData.allIds) merchants = merchantData.allIds;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = (e) => {
    e.preventDefault();
    
    const warehouseObj = warehouseData.allIds.find(item => item._id === formData.warehouse)
    const merchantObj = merchantData.allIds.find(item => item._id === formData.merchant)

    const obj = { 
      ...formData,
      warehouse: warehouseObj,
      merchant: merchantObj,
    }

    saveOrderInfo(obj)
    setRedirect(true)
  }

  const formReset = (e) => {
    e.preventDefault();
    setValues(formState);
  }

  return <>

    {
      redirect && <Redirect to={location.pathname} />
    }

    <Container width="col">
      <div className="row">
        <div className="col-12 col-xl-8">
          <form onSubmit={formSubmit}>
            <Card width="col" title="Order Information">
              <Ul>
                <OrderInfoForm
                  formData={formData}
                  errors={errors} 
                  onInputChange={onInputChange}
                  merchants={merchants}
                  warehouses={warehouses}
                />
                <SaveAndReset
                  buttonDisabled={buttonDisabled}
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
          <Card width="col" title="Update Warehouses">
            <Ul>
              <Warehouse 
                pathname={'/warehouses'}
                component={'warehouse'}
              />
            </Ul>
          </Card>
        </div>
      </div> 
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  warehouseData: selectWarehouseData,
  merchantData: selectMerchantData,
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderInfo: payload => dispatch(saveOrderInfo(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);