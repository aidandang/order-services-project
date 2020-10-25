import React, { useEffect, useState } from 'react';

//dependencies
import * as Yup from "yup";

// components
import { Ul, Li, Button } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductBrandForm from './product-brand-form.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { BrandActionTypes } from '../../state/brand/brand.types';
import { patchReq } from '../../state/api/api.requests';

// initial values
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  preferredName: Yup
    .string()
    .required()
});

const formState = {
  _id: "",
  name: "",
  preferredName: ""
};

const ProductBrandEdit = ({
  patchReq,
  alertMessage,
  brand,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(brand ? brand : formState, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    const updatedBrand = { ...formData }

    patchReq(`/brands/${updatedBrand._id}`, fetchSuccess, updatedBrand, setSuccess, 'product-brand-edit');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  // main component
  return <>
    { alertMessage && alertMessage.component === 'product-brand-edit' && <AlertMesg/> }

    { 
      !success &&
      <form onSubmit={formSubmit}>
        <Ul>

          <ProductBrandForm
            formData={formData} 
            errors={errors} 
            onInputChange={onInputChange}
          />

          <Li>
            <div className="row">
              <div className="col my-3">
                
                  <Button
                    type="submit" 
                    onClick={e => {
                      e.preventDefault();
                      formSubmit();
                    }}
                    disabled={buttonDisabled}
                  >
                    Update
                  </Button>
                  <span className="mr-3"></span>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      setAction('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
           
          </Li>   
   
        </Ul>
      </form>   
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(patchReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandEdit);