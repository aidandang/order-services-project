import React from 'react';

// components
import { Li, TextInput, SelectInput, DateInput } from '../tag/tag.component';

const OrderInfoForm = ({
  formData,
  errors,
  onInputChange,
  warehouses
}) => {
  return <>
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
  </>
}

export default OrderInfoForm;