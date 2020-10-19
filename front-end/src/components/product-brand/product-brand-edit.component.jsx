import React from 'react';

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
import { patchReq } from '../../state/api/patch-request';

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

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(brand ? brand : formState, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    const updatedBrand = { ...formData }

    patchReq(`/brands/${updatedBrand._id}`, fetchSuccess, updatedBrand);
    setAction('')
  }

  // main component
  return <>

    { 
      alertMessage 
      ? 
      <AlertMesg />
      : 
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
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandEdit);