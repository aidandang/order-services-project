import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
// components
import { useForm } from '../hook/use-form';
import Button from '../button/button.component';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderTemp } from '../../state/order/order.selectors';
import { updateReferenceToOrder } from '../../state/order/order.actions';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

// set form schema
const formSchema = Yup.object().shape({
  refNumber: Yup
    .string()
    .required(),
  refDate: Yup
    .date()
    .required(),
  refInfo: Yup
    .string()
    .required(),
  refStatus: Yup
    .string()
})

const AddReference = ({
  orderTemp,
  updateReferenceToOrder
}) => {

  const [change, setChange] = useState(true);

  const { refNumber, refDate, refInfo, refStatus } = orderTemp.ref;

  const formState = {
    refNumber: refNumber ? refNumber : "",
    refDate: refDate ? refDate : "",
    refInfo: refInfo ? refInfo : "",
    refStatus: refStatus ? refStatus : ""
  }

  const initialErrorState = {
    refNumber: "",
    refDate: "",
    refInfo: "",
    refStatus: ""
  }

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(formState, initialErrorState, formSchema);

  const formSubmit = e => {
    e.preventDefault();
    updateReferenceToOrder(formData);
    setChange(false)
  }

  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-xl-8"> 
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Item Information</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label htmlFor="refNumber">Reference Number</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="refNumber" 
                        value={formData.refNumber}
                        onChange={onInputChange}
                        readOnly={!change}
                      />
                      <small>This could be reference order number or bill.</small>
                      {errors.refNumber.length > 0 ? <p className="mt-2 text-danger">{errors.refNumber}</p> : null}
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <label htmlFor="refDate">Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="refDate" 
                        value={formData.refDate}
                        onChange={onInputChange}
                        readOnly={!change}
                      />
                      <small>Date of the reference.</small>
                      {errors.refDate.length > 0 ? <p className="mt-2 text-danger">{errors.refDate}</p> : null}
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="refStatus">Status</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="refStatus" 
                        value={formData.refStatus}
                        onChange={onInputChange}
                        readOnly={!change}
                      />
                      <small>Status of the order.</small>
                      {errors.refStatus.length > 0 ? <p className="mt-2 text-danger">{errors.refStatus}</p> : null}
                    </div>
                  </div>
                </div>
              </li>
              <li className={liClassName}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="refInfo">Reference Information</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="refInfo" 
                        value={formData.refInfo}
                        onChange={onInputChange}
                        readOnly={!change}
                      />
                      <small>If online then paste the link, if offline then provide the shop.</small>
                      {errors.refInfo.length > 0 ? <p className="mt-2 text-danger">{errors.refInfo}</p> : null}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>           
        </div>
        <div className="col-xl-4"> 
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Action</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className={liClassName}>      
                <div className="row">
                  <div className="col mt-3">
                    <div className="form-group">
                      {
                        change 
                        ? <>
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
                              updateReferenceToOrder({});
                              setValues(initialErrorState)
                            }}
                          >
                            Clear
                          </Button>
                        </>
                        :
                          <Button
                            onClick={e => {
                              e.preventDefault();
                              setChange(true)
                            }}
                          >
                            Back to Edit
                          </Button>
                      }
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
  orderTemp: selectOrderTemp
})

const mapDispatchToProps = dispatch => ({
  updateReferenceToOrder: ref => dispatch(updateReferenceToOrder(ref))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddReference);