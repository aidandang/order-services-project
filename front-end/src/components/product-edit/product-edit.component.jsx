import React, { useEffect, useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect } from 'react-router-dom';

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
import { selectBrandData } from '../../state/brand/brand.selectors';
import { selectProductData } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';
import { patchReq } from '../../state/api/patch-request';
import { BrandActionTypes } from '../../state/brand/brand.types';
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
  getReq,
  data,
  patchReq,
  brandData,
  alertMessage
}) => {

  const location = useLocation();

  const { byId } = data;
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
      brand: brandData.allIds.find(element => element._id === formData.brandId)
    };
    delete updatedProduct.brandId;
 
    patchReq('/products/' + updatedProduct._id, fetchSuccess, updatedProduct, setSuccess) 
  }

  const formReset = () => {
    setValues(formState);
  }

  useEffect(() => {
    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    getReq('/brands', fetchSuccess)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    {
      success && <Redirect to={{
        pathname: location.state.path,
        state: {
          key: location.key,
          path: location.pathname + location.search
        }
      }} />
    }

    { alertMessage && <AlertMesg /> }
    
    <Container width="col">
      <div className="row">
        <div className="col-12 col-xl-8">
          <form onSubmit={formSubmit}>
            <ProductForm
              formData={formData}
              errors={errors} 
              onInputChange={onInputChange}
              brands={brandData.allIds}
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
          <ProductBrand />
        </div>
      </div>
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  brandData: selectBrandData,
  data: selectProductData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  ),
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);