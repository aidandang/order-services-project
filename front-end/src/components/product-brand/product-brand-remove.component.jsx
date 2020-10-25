import React, { useEffect, useState } from 'react';

// components
import { Ul, Li, Button } from '../tag/tag.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { BrandActionTypes } from '../../state/brand/brand.types';
import { deleteReq } from '../../state/api/api.requests';

const ProductBrandRemove = ({
  brand,
  deleteReq,
  alertMessage,
  setAction
}) => {

  const [success, setSuccess] = useState(false);

  const formSubmit = () => {

    const fetchSuccess = BrandActionTypes.BRAND_FETCH_SUCCESS;
    const id = brand._id

    deleteReq(`/brands/${id}`, fetchSuccess, setSuccess, 'product-brand-remove');
  }

  useEffect(() => {
    if (success) setAction('')
    // eslint-disable-next-line
  }, [success])

  // main component
  return <>

    { alertMessage && alertMessage.component === 'product-brand-remove' && <AlertMesg/> }

    {
      !success &&
      <form onSubmit={formSubmit}>
        <Ul>
          <Li>
            <div className="row">
              <div className="col my-3">
                Do you want to remove {brand.name}?
              </div>
            </div>
          </Li>
          <Li>
            <div className="row">
              <div className="col mt-3">
                <div className="form-group">
                  <Button
                    type="submit" 
                    onClick={e => {
                      e.preventDefault();
                      formSubmit();
                    }}
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
            </div>
          </Li>

        </Ul>
      </form>  
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  deleteReq: (
    pathname, 
    fetchSuccess, 
    setSuccess, 
    component
  ) => dispatch(deleteReq(
    pathname, 
    fetchSuccess, 
    setSuccess, 
    component
  ))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrandRemove);