import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import ProductForm from './product-form.component';
import Brand from '../brand/brand.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/api.requests';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { selectProductData } from '../../state/product/product.selectors';
import { selectBrandData } from '../../state/brand/brand.selectors';

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
  productData,
  brandData,
  patchReq,
  setComp,
  alertMessage
}) => {

  const { byId } = productData;
  
  const { allIds } = brandData;

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
      brand: allIds.find(element => element._id === formData.brandId)
    };
    delete updatedProduct.brandId;
 
    patchReq('/products/' + updatedProduct._id, fetchSuccess, updatedProduct, setSuccess, 'product-edit') 
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    setComp('product-info')
  }

  useEffect(() => {
    if (success) setComp('product-info')
    // eslint-disable-next-line
  }, [success])

  return <>
  
    { alertMessage && alertMessage.component === 'product-edit' && <AlertMesg/> }
    
    <Container width="col" goBack={goBack}>
      <div className="row">
        <div className="col-12 col-xl-8">
          <form>
            <Card width="col" title={'Edit Product'}>
              <Ul>
                <ProductForm
                  formData={formData}
                  errors={errors} 
                  onInputChange={onInputChange}
                  brands={allIds}
                  formTitle={'Edit product'}
                />
                <SubmitOrReset 
                  buttonName={'Submit'}
                  buttonDisabled={buttonDisabled}
                  formSubmit={formSubmit}
                  formReset={formReset}
                />
              </Ul>
            </Card>
          </form>  
        </div>
        <div className="col-12 col-xl-4">
          <Card width="col" title={'Update Brand'}>
            <Ul>
              <Brand
                pathname={`/brands`}
                component={'brand'}
              />
            </Ul>
          </Card>
        </div>
      </div>
    </Container>
    
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  productData: selectProductData,
  brandData: selectBrandData
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