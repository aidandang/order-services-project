import React from 'react';

// components
import { Ul, Li, Button } from '../tag/tag.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { selectProductData } from '../../state/product/product.selectors';
import { ProductActionTypes } from '../../state/product/product.types';

const ProductColorAdd = ({
  patchReq,
  data,
  colorTemp,
  setAction
}) => {

  const { byId } = data;

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    const productTemp = { 
      ...byId,
      colors: byId.colors.filter(color => color._id !== colorTemp._id)
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp);
    setAction('')
  }

  return <>
    <form onSubmit={formSubmit}>
      <Ul>

        <Li>
          <span>Do you want to remove?</span>
        </Li>

        <Li>
          <div className="row">
            <div className="col my-3">
              <Button 
                type="submit"
              >
                Remove
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorAdd);