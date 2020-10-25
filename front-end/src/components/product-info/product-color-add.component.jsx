import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Ul, Li, Button } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductColorForm from './product-color-form.compoent';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { patchReq } from '../../state/api/api.requests';
import { ProductActionTypes } from '../../state/product/product.types'; 

// initial values
const formSchema = Yup.object().shape({
  color: Yup
    .string()
    .required(),
  image: Yup
    .string(),
  url: Yup
    .string()
});

const formState = {
  color: "",
  image: "",
  url: ""
};

const ProductColorAdd = ({
  patchReq,
  data,
  setAction,
  alertMessage
}) => {

  const { byId } = data;

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const productTemp = { 
      ...byId,
      colors: [ ...byId.colors, formData]
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp, setSuccess, 'product-color-add');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'product-color-add' && <AlertMesg/> }

    { 
      !success &&
      <form onSubmit={formSubmit}>
        <Ul>

          <ProductColorForm
            formData={formData} 
            errors={errors} 
            onInputChange={onInputChange}
          />

          <Li>
            <div className="row">
              <div className="col my-3">
                <Button 
                  type="submit" 
                  disabled={buttonDisabled}
                >
                  Add Color
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
    componnent
  ) => dispatch(patchReq(
    pathname, 
    fetchSuccess, 
    reqBody, 
    setSuccess, 
    componnent
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorAdd);