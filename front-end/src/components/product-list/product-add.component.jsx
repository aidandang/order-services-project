import React, { useEffect } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductForm from '../product-form/product-form.component';
import ProductBrand from '../product-brand/product-brand.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBrandData } from '../../state/brand/brand.selectors';
import { getReq } from '../../state/api/get-request';
import { postReq } from '../../state/api/post-request';
import { BrandActionTypes } from '../../state/brand/brand.types';
import { ProductActionTypes } from '../../state/product/product.types';

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
const ProductAdd = ({
  getReq,
  postReq,
  brandData,
  setAction
}) => {

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, formState, formSchema);

  const formSubmit = () => {

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const newProduct = { 
      ...formData,
      brand: brandData.allIds.find(element => element._id === formData.brandId)
    };
    delete newProduct.brandId;
 
    postReq('/products', fetchSuccess, newProduct)
    setAction('')
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
    <Container width="col" setAction={setAction}>
      <div className="row">
        <div className="col-12 col-xl-8">
          <form onSubmit={formSubmit}>
            <ProductForm
              formData={formData}
              formSubmit={formSubmit}
              formReset={formReset} 
              errors={errors} 
              onInputChange={onInputChange}
              buttonDisabled={buttonDisabled}
              brands={brandData.allIds}
              formTitle={"Add a new product"}
              buttonName={'Add Product'}
            />
          </form>  
        </div>
        <div className="col-12 col-xl-4">
          <ProductBrand />
        </div>
      </div> 
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  brandData: selectBrandData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(
    getReq(pathname, fetchSuccess, queryStr)
  ),
  postReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);