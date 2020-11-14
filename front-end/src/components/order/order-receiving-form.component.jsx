import React from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, useHistory } from 'react-router-dom'; 

// components
import { Card, Ul, Li, TextInput, SelectInput, DateInput } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import Warehouse from '../warehouse/warehouse.component';

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
const OrderReceivingForm = ({
  warehouseData,
  order,
  saveOrderReceiving
}) => {

  const location = useLocation();
  const history = useHistory();

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
    saveOrderReceiving(obj);

    const pathname = location.pathname.split('/update-order-receiving')[0]
    history.push(pathname);
  }

  const formReset = () => {
    setValues(formState);
  }

  return <>
    <div className="row">
      <div className="col-12 col-xl-8">
        <Card width="col" title="Order Receiving">
          <Ul>
            <Li>
              <TextInput
                label="Status (*)" 
                name="status"
                errors={errors}
                smallText="Status of the order is required."
                value={formData.status}
                onChange={onInputChange}
              />
            </Li>
            <Li>
              <div className="row">
                <div className="col-xl-6">
                  <TextInput
                    label="Tracking Number" 
                    name="tracking"
                    errors={errors}
                    smallText="Tracking is optional."
                    value={formData.tracking}
                    onChange={onInputChange}
                  />
                </div>
                <div className="col-xl-6">
                  <DateInput
                    label="Received Date" 
                    name="recvDate"
                    errors={errors}
                    smallText="Received date is optional."
                    value={formData.recvDate}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </Li>
            <Li>
              <SelectInput
                label="Warehouse (*)" 
                name="warehouse"
                errors={errors}
                size="col-xl-6"
                smallText="Select a warehouse, add new if there is no warehouse."
                defaultValue=""
                defaultText="..."
                value={formData.warehouse ? formData.warehouse : ""}
                onChange={onInputChange}
                data={warehouses}
                valueKey="_id"
                textKey="name"
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
  </>
}

const mapStateToProps = createStructuredSelector({
  warehouseData: selectWarehouseData,
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderReceiving: payload => dispatch(saveOrderReceiving(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderReceivingForm);