import React from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// components
import Title from '../title/title.component';
import { useForm } from '../custom-hooks/use-form';
import CustomerForm from './customer-form.component';
import AddAddress from './add-address.component';
import PreviewAddresses from './preview-addresses.component';
import SubmitCard from '../product-by-id-edit/submit-card.component';

// set form schema
// set form schema
const formSchema = Yup.object().shape({
  username: Yup
    .string()
    .required("Username is required"),
  email: Yup
    .string()
    .email("Must be a valid email address."),
  nickname: Yup
    .string()
    .required("Must include a nickname"),
  fullname: Yup
    .string()
    .required("Name is required"),
  othername: Yup
    .string()
    .ensure(),
  country: Yup
    .string()
    .required("Country is required"),
  streetAddress1: Yup
    .string()
    .required("Street Address is required"),
  streetAddress2: Yup
    .string()
    .ensure(),
  city: Yup
    .string()
    .required("City is required"),
  state: Yup
    .string()
    .required("State is required"),
  zipcode: Yup
    .string()
    .required("Zip Code is required"),
  phone: Yup
    .string()
    .required("Phone is required"),
  shippingIsBilling: Yup
    .boolean(),
  shippingInfo: Yup
    .array()
});
// set form state
const formState = {
  username: "",
  email: "",
  nickname: "",
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
  shippingInfo: [],
  shippingIsBilling: true
}

const CustomerByIdEdit = ({
  customer
}) => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type, action } = queryObj;

  let titleName = 'Edit Customer';
  if (type === 'add') titleName = 'Add Customer';

  const title = {
    name: titleName,
    message: 'Add or edit a customer and his/her shipping address.'
  }

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(type === 'edit' ? customer : formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
  }

  return <>
    <Title title={title} />
    <div className="row">
      <div className="col-xl-8 add-style-col">
        { 
          action !== 'add-address' && 
            <CustomerForm
              formSubmit={formSubmit}
              formData={formData} 
              errors={errors} 
              onInputChange={onInputChange}
            />
        }
        { action === 'add-address' && <AddAddress setNewAddress={setValues} /> }
      </div>
      <div className="col-xl-4 add-color-col">
        <div className="row flex-column">
          <div className="col">
            <SubmitCard formSubmit={formSubmit} buttonDisabled={buttonDisabled} />
          </div>
          <div className="col">
            <PreviewAddresses addresses={formData.shippingInfo} setValues={setValues} />
          </div>
        </div>        
      </div>
    </div>
  </>
}

export default CustomerByIdEdit;