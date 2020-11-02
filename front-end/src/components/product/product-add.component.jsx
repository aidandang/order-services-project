import React, { useState, useEffect } from 'react';

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
import { setProductComp } from '../../state/product/product.actions'; 
import { postReq } from '../../state/api/api.requests'; 
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
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
const ProductAdd = ({
  brandData,
  postReq,
  setProductComp,
  alertMessage
}) => {

  const { allIds } = brandData;

  const [success, setSuccess] = useState(false);

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
      brand: allIds.find(element => element._id === formData.brandId)
    };
    delete newProduct.brandId;
 
    postReq('/products', fetchSuccess, newProduct, setSuccess, 'product-add')
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    setProductComp('')
  }

  useEffect(() => {
    if (success) setProductComp('product-info')
    // eslint-disable-next-line
  }, [success])

  return <>

    { alertMessage && alertMessage.component === 'product-add' && <AlertMesg/> }

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
                  formTitle={"Add a new product"}
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
  brandData: selectBrandData
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess, component) => dispatch(
    postReq(pathname, fetchSuccess, reqBody, setSuccess, component)
  ),
  setProductComp: comp => dispatch(setProductComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAdd);