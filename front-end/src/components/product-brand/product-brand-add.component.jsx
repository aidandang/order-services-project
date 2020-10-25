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
import { postReq } from '../../state/api/api.requests';

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
  name: "",
  preferredName: ""
};

const ProductBrandAdd = ({
  postReq,
  alertMessage,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    const newBrand = { ...formData}

    postReq('/brands', fetchSuccess, newBrand, setSuccess, 'product-brand-add');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  // main component
  return <>

    { alertMessage && alertMessage.component === 'product-brand-add' && <AlertMesg/> }

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
                  Add Brand
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
  postReq: (
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ) => dispatch(postReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandAdd);