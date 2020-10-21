import React from 'react';

// dependecies
import InputMask from 'react-input-mask';

// component
import { Card, Ul, Li, TextInput, SelectInput } from '../tag/tag.component';

// initial data
import { stateList, provinceList } from '../../state/data/data';

// main component
const CustomerForm = ({
  formData, 
  errors,
  onInputChange,
  formTitle
}) => {

  const country = [
    {
      name: 'Vietnam'
    },
    {
      name: 'United States'
    }
  ]

  let state = []

  if (formData.country === 'Vietnam') {
    state = provinceList;
  } 

  if (formData.country === 'United States') {
    state = stateList;
  }
  
  return <>
    <Card width="col" title={formTitle}>
      <Ul>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="Email" 
                name="email"
                errors={errors}
                size="col"
                smallText="Email is optional."
                value={formData.email}
                onChange={onInputChange} 
              />
            </div>
            <div className="col-xl-6">
              <TextInput
                label="Nickname (*)" 
                name="nickname"
                errors={errors}
                size="col"
                smallText="Nickname is required."
                value={formData.nickname}
                onChange={onInputChange} 
              />
            </div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="Full Name (*)" 
                name="fullname"
                errors={errors}
                size="col"
                smallText="Fullname is required."
                value={formData.fullname}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-6">
              <TextInput
                label="Other Name" 
                name="othername"
                errors={errors}
                size="col"
                smallText="Special information can be fill in here."
                value={formData.othername}
                onChange={onInputChange}
              />
            </div>
          </div> 
        </Li>
        <Li>
          <SelectInput
            label="Country (*)" 
            name="country"
            errors={errors}
            size="col col-xl-6"
            smallText="Choose country before state/province."
            defaultValue=""
            defaultText="Choose..."
            value={formData.country ? formData.country : ""}
            onChange={onInputChange}
            data={country}
            valueKey="name"
            textKey="name" 
          />
        </Li>
        <Li>
          <TextInput
            label="Street Address (*)" 
            name="streetAddress1"
            errors={errors}
            size="col"
            smallText="Including 'Phuong' if needed."
            value={formData.streetAddress1}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <TextInput
            label="Apt, Suite, Build" 
            name="streetAddress2"
            errors={errors}
            size="col col-xl-6"
            smallText="This field is optional."
            value={formData.streetAddress2}
            onChange={onInputChange}
          />
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <TextInput
                label="City/District (*)" 
                name="city"
                errors={errors}
                size="col"
                smallText="City is for United States, District is for Vietnam."
                value={formData.city}
                onChange={onInputChange}
              />
            </div>
            <div className="col-xl-6">
              <SelectInput
                label="State/Province (*)" 
                name="state"
                errors={errors}
                size="col"
                smallText="Choose country before state/province."
                defaultValue=""
                defaultText="Choose..."
                value={formData.state ? formData.state : ""}
                onChange={onInputChange}
                data={state}
                valueKey="name"
                textKey="name" 
              />
            </div>
          </div>     
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code/Postal Code (*)</label>
                <InputMask
                  mask="99999"
                  maskChar=" " 
                  type="text" 
                  className="form-control" 
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onInputChange} 
                />
                <small>If country is Vietnam then Zipcode is 10000.</small>
                {errors.zipcode.length > 0 ? <p className="mt-2 text-danger">{errors.zipcode}</p> : null}
              </div>
            </div>
          </div>
        </Li>
        <Li>
          <div className="row">
            <div className="col-xl-6">
              <div className="form-group">
                <label htmlFor="phone">Phone (*)</label>
                <InputMask
                  mask="999-999-9999"
                  maskChar=" "
                  type="text" 
                  className="form-control" 
                  name="phone"
                  value={formData.phone}
                  onChange={onInputChange} 
                />
                <small>Hanoi home phone is 246-666-6666.</small>
                {errors.phone.length > 0 ? <p className="mt-2 text-danger">{errors.phone}</p> : null}
              </div>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    
  </>
}

export default CustomerForm;