import React from 'react';

// components
import { Card, Ul, Li, TextInput, TextareaInput, SelectInput } from '../tag/tag.component';

const ProductForm = ({
  formData,
  errors,
  onInputChange,
  brands,
  formTitle
}) => {
  return <>
    <Card width="col" title={formTitle}>
      <Ul>
        <Li>
          <TextInput
            label="Name (*)" 
            name="name"
            errors={errors}
            size="col col-xl-9"
            smallText="Name is required and should be unique."
            value={formData.name}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <SelectInput
            label="Brand (*)" 
            name="brandId"
            errors={errors}
            size="col col-xl-6"
            smallText="Select a brand, add new if there is no brand."
            defaultValue=""
            defaultText="..."
            value={formData.brandId ? formData.brandId : ""}
            onChange={onInputChange}
            data={brands}
            valueKey="_id"
            textKey="name"
          />
        </Li>
        <Li>
          <TextInput
            label="Style Code (*)" 
            name="styleCode"
            errors={errors}
            size="col col-xl-6"
            smallText="Style code is required."
            value={formData.styleCode}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <TextInput
            label="SKU" 
            name="sku"
            errors={errors}
            size="col col-xl-6"
            smallText="SKU can be scanned from the product label."
            value={formData.sku}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <TextareaInput
            label="Description (*)" 
            name="desc"
            errors={errors}
            size="col"
            smallText="Copy a short description of the product in here."
            value={formData.desc}
            onChange={onInputChange} 
          />
        </Li>
        <Li>
          <TextInput
            label="Image URL (*)" 
            name="styleImage"
            errors={errors}
            size="col"
            smallText="Copy image hyperlink in here."
            value={formData.styleImage}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <TextInput
            label="Reference URL" 
            name="url"
            errors={errors}
            size="col"
            smallText="Copy product hyperlink of the website in here."
            value={formData.url}
            onChange={onInputChange} 
          />
        </Li>
      </Ul>
    </Card>
  </>
}

export default ProductForm;