import React from 'react';

// dependencies
import * as Yup from "yup";

// components
import { useForm } from '../hook/use-form';
import Button from '../button/button.component';
import CustomerAddressForm from '../customer-address-form/customer-address-form.component';

// redux
import { connect } from 'react-redux';
import { addCustomerAddress } from '../../state/customer/customer.actions';

// data and ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

// initial values
const formSchema = Yup.object().shape({
  fullname: Yup
    .string()
    .required(),
  othername: Yup
    .string()
    .ensure(),
  country: Yup
    .string()
    .required(),
  streetAddress1: Yup
    .string()
    .required(),
  streetAddress2: Yup
    .string()
    .ensure(),
  city: Yup
    .string()
    .required(),
  state: Yup
    .string()
    .required(),
  zipcode: Yup
    .string()
    .required(),
  phone: Yup
    .string()
    .required()
});

const formState = {
  addressId: "",
  fullname: "",
  othername: "",
  country: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipcode: "",
  phone: ""
};

const AddCustomerAddress = ({
  addCustomerAddress,
  setAddAddress
}) => {

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    addCustomerAddress(formData);
    setAddAddress(false)
  }

  const formReset = () => {
    setValues(formState)
  }

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">Add Shipping Address</div>
                <div className="col text-right">
                  <a 
                    href="/" 
                    className="a-link-cs"
                    onClick={e => {
                      e.preventDefault();
                      setAddAddress(false)
                    }}
                  >
                    Close
                  </a>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <CustomerAddressForm
                formData={formData} 
                errors={errors} 
                onInputChange={onInputChange}
              />
              <li className={liClassName}>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="form-group">
                      <Button 
                        type="submit" 
                        disabled={buttonDisabled}
                      >
                        Add Address
                      </Button>
                      <span className="mr-3"></span>
                      <Button
                        onClick={e => {
                          e.preventDefault();
                          formReset()
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>       
  </>
}

const mapDispatchToProps = dispatch => ({
  addCustomerAddress: address => dispatch(addCustomerAddress(address))
})

export default connect(null, mapDispatchToProps)(AddCustomerAddress);