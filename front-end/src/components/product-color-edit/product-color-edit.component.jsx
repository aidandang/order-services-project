import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

// components
import { useForm } from '../hook/use-form';
import { Button } from '../tag/tag.component';
import ProductColorForm from '../product-color-form/product-color-form.compoent';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { selectProductData } from '../../state/product/product.selectors';
import { ProductActionTypes } from '../../state/product/product.types'; 

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

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
  data
}) => {

  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const { byId } = data;

  const queryObj = queryString.parse(location.search);
  const { id } = queryObj;

  const colorTemp = byId.colors.find(color => color._id === id)

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(colorTemp ? colorTemp : formState, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const productTemp = { 
      ...byId,
      colors: byId.colors.map(color => {
        if (color._id !== id) {
          return color
        }
        return {
          ...color,
          ...formData
        }
      })
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp, setSuccess);
  }

  const formReset = () => {
    setValues(formState)
  }

  return <>

    {
      success && <Redirect to={`${location.pathname}?action=product-colors-update`} />
    }

    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold align-self-center">Edit Color</div>
                <div className="col text-right">
                  <Link 
                    to={`${location.pathname}?action=product-colors-update`} 
                    className="a-link-cs"
                  >
                    Close
                  </Link>
                </div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <ProductColorForm
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
                        Update
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

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorAdd);