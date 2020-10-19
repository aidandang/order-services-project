import React from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Ul, Li, Button } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductColorForm from './product-color-form.compoent';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { selectProductData } from '../../state/product/product.selectors';
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

const ProductColorEdit = ({
  patchReq,
  data,
  colorTemp,
  setAction
}) => {
  
  const { byId } = data;

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(colorTemp, formState, formSchema);

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const productTemp = { 
      ...byId,
      colors: byId.colors.map(color => {
        if (color._id !== colorTemp._id) {
          return color
        }
        return {
          ...color,
          ...formData
        }
      })
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp);
    setAction('')
  }

  return <>
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
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorEdit);