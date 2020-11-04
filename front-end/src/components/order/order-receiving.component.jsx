import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect, useHistory } from 'react-router-dom'; 
import queryString from 'query-string';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import Warehouse from '../warehouse/warehouse.component';
import OrderReceivingForm from './order-receiving-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderReceiving } from '../../state/order/order.actions';
import { selectWarehouseData } from '../../state/warehouse/warehouse.selectors';
import { selectOrderEditing } from '../../state/order/order.selectors';

// inital values
const formSchema = Yup.object().shape({
  status: Yup
    .string()
    .required(),
  tracking: Yup
    .string(),
  recvDate: Yup
    .string(),
  warehouse: Yup
    .string()
    .required()
});

const formState = {
  status: "",
  tracking: "",
  recvDate: "",
  warehouse: ""
}

// main component
const OrderReceiving = ({
  warehouseData,
  order,
  saveOrderReceiving
}) => {

  const location = useLocation();
  const history = useHistory();
  const queryStr = queryString.parse(location.search);
  const { comp } = queryStr;
  const [redirect, setRedirect] = useState(false)

  const { receiving } = order;
  let orderEditing = null;

  if (receiving) {
    orderEditing = {
      ...formState,
      status: receiving.status,
      tracking: receiving.tracking,
      recvDate: receiving.recvDate,
      warehouse: receiving.warehouse._id
    }
  }

  let warehouses = null;

  if (warehouseData.allIds) warehouses = warehouseData.allIds;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = () => {
    
    const warehouseObj = warehouseData.allIds.find(item => item._id === formData.warehouse)

    const obj = { 
      ...formData,
      warehouse: warehouseObj,
    }

    saveOrderReceiving(obj)
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
            <Card width="col" title="Order Receiving">
              <Ul>
                <OrderReceivingForm
                  formData={formData}
                  errors={errors} 
                  onInputChange={onInputChange}
                  warehouses={warehouses}
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
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderReceiving: payload => dispatch(saveOrderReceiving(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderReceiving);