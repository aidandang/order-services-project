import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitCard from '../submit-card/submit-card.component';
import ProductForm from '../product-form/product-form.component';
import ProductBrand from '../product-brand/product-brand.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// inital values
const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(),
  brandId: Yup
    .string()
    .required(),
  styleCode: Yup
    .string()
    .required(),
  styleImage: Yup
    .string()
    .required(),
  sku: Yup
    .string(),
  desc: Yup
    .string()
    .required(),
  url: Yup
    .string()
});

const formState = {
  name: "",
  brandId: "",
  styleCode: "",
  styleImage: "",
  sku: "",
  desc: "",
  url: ""
}

// main component
const ProductEdit = ({
  byId,
  brands,
  patchReq,
  goBack,
  alertMessage
}) => {

  const productTemp = {
    ...byId,
    brandId: byId.brand._id 
  }

  const [success, setSuccess] = useState(false);

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(productTemp, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const updatedProduct = { 
      ...formData,
      brand: brands.find(element => element._id === formData.brandId)
    };
    delete updatedProduct.brandId;
 
    patchReq('/products/' + updatedProduct._id, fetchSuccess, updatedProduct, setSuccess, 'product-edit') 
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    if (success) goBack()
    // eslint-disable-next-line
  }, [success])

  return <>
    { alertMessage && alertMessage.component === 'product-edit' && <AlertMesg/> }
    { 
      !success &&
      <Container width="col" goBack={goBack}>
        <div className="row">
          <div className="col-12 col-xl-8">
            <form onSubmit={formSubmit}>
              <ProductForm
                formData={formData}
                errors={errors} 
                onInputChange={onInputChange}
                brands={brands}
                formTitle={'Edit product'}
              />
            </form>  
          </div>
          <div className="col-12 col-xl-4">
            <SubmitCard 
              formSubmit={formSubmit}
              handleSecond={formReset}
              buttonDisabled={buttonDisabled}
              buttonText={['Update', 'Reset']} 
            />
            <ProductBrand allIds={brands} />
          </div>
        </div>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);