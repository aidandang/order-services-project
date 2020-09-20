import React, { useState } from 'react';

// dependencies
import { Redirect, useLocation } from 'react-router-dom';
// components
import Button from '../button/button.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postReq } from '../../state/api/post-request';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectProductObj } from '../../state/product/product.selectors';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";
 
const SubmitProduct = ({
  productObj,
  postReq,
  alertMessage
}) => {

  const location = useLocation();

  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    console.log('hello')

    postReq('/products', fetchSuccess, productObj, setSuccess);
  }

  return <>
    {success && <Redirect to={location.pathname} />}

    {alertMessage && <AlertMesg />}

    <div className="row">
      <div className="col-12">

        {/* The Card */}
        <div className="card my-3">

          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">Add Product Confirmation</div>
            </div>
          </div>

          <ul className="list-group list-group-flush">

            <li className={liClassName}>
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="form-group">
                    {/* Submit button */}
                    <Button
                      onClick={handleSubmit} 
                      disabled={false}
                    >
                      Submit
                    </Button>
                    {/* End of submit button */}
                  </div>
                </div>
              </div>
            </li>  
            
          </ul>
        </div>
        {/* End of the Card */}

      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  productObj: selectProductObj,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  postReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(postReq(
    pathname, fetchSuccess, reqBody, setSuccess
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProduct);