import React, { useState } from 'react';

// dependencies
import { useLocation, Link, Redirect } from 'react-router-dom';
import queryString from 'query-string';

// components
import { Button } from '../tag/tag.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { patchReq } from '../../state/api/patch-request';
import { selectProductData } from '../../state/product/product.selectors';
import { ProductActionTypes } from '../../state/product/product.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors'; 

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const ProductColorAdd = ({
  patchReq,
  data,
  alertMessage
}) => {

  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const { byId } = data;

  const queryObj = queryString.parse(location.search);
  const { id } = queryObj;

  const formSubmit = e => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;

    let newArray = byId.colors.slice()
    newArray.splice(id, 1)

    const productTemp = { 
      ...byId,
      colors: newArray
    }
    patchReq('/products/' + byId._id, fetchSuccess, productTemp, setSuccess);
  }

  return <>

    {
      success && <Redirect to={`${location.pathname}?action=product-colors-update`} />
    }

    {
      alertMessage 
      ? <AlertMesg />
      : <form onSubmit={formSubmit}>
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
                  <li className={liClassName}>
                    <span>Do you want to remove?</span>
                  </li>
                  <li className={liClassName}>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="form-group">
                          <Button 
                            type="submit"
                          >
                            Remove
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
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData,
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  patchReq: (pathname, fetchSuccess, reqBody, setSuccess) => dispatch(
    patchReq(pathname, fetchSuccess, reqBody, setSuccess))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductColorAdd);