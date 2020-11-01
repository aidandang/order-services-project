import React from 'react';

// components
import { Li, TextInput, SelectInput, DateInput } from '../tag/tag.component';

const OrderInfoForm = ({
  formData,
  errors,
  onInputChange,
  merchants,
  warehouses
}) => {
  return <>
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
    <Li>
      <TextInput
        label="Status" 
        name="status"
        errors={errors}
        smallText="Status of the order."
        value={formData.status}
        onChange={onInputChange}
      />
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