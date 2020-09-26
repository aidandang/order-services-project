import React from 'react';

// dependecies
import InputMask from 'react-input-mask';
import uuid from 'react-uuid';
// data and ui settings
import { stateList, provinceList } from '../../state/data/data';
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const CustomerForm = ({ 
  formData, 
  formSubmit, 
  errors, 
  onInputChange
}) => {
  return <>
    <form onSubmit={formSubmit}>
      <div className="row">
        <div className="col-12">

          {/* Customer Information Card */}
          <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">Customer Information</div>
              </div>
            </div>
            <ul className="list-group list-group-flush">

              <li className={liClassName}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="username">Username (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="username"
                        value={formData.username}
                        onChange={onInputChange}
                      />
                      <small>Username is required</small>
                      {errors.username.length > 0 ? <p className="mt-2 text-danger">{errors.username}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={formData.email}
                        onChange={onInputChange} 
                      />
                      <small>Email is optional</small>
                      {errors.email.length > 0 ? <p className="mt-2 text-danger">{errors.email}</p> : null}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="nickname">Nickname (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="nickname" 
                        value={formData.nickname}
                        onChange={onInputChange}
                      />
                      <small>Nickname is required</small>
                      {errors.nickname.length > 0 ? <p className="mt-2 text-danger">{errors.nickname}</p> : null}
                    </div>
                  </div> 
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="fullname">Full Name (*)</label>
                      <input 
                        type="text"
                        className="form-control" 
                        id="fullname"
                        value={formData.fullname}
                        onChange={onInputChange}
                      />
                      <small>Othername is optional but fullname is must</small>
                      {errors.fullname.length > 0 ? <p className="mt-2 text-danger">{errors.fullname}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="othername">Other Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="othername" 
                        value={formData.othername}
                        onChange={onInputChange}
                      />
                      <small>Other name is optional</small>
                      {errors.othername.length > 0 ? <p className="mt-2 text-danger">{errors.othername}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="country">Country (*)</label>
                      <select 
                        className="custom-select" 
                        id="country"
                        value={formData.country ? formData.country : ""}
                        onChange={onInputChange}
                      >
                        <option value="">Choose...</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="United States">United States</option>
                      </select>
                      <small>Choose country before state/province</small>
                      {errors.country.length > 0 ? <p className="mt-2 text-danger">{errors.country}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label htmlFor="streetAddress1">Street Address (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="streetAddress1" 
                        value={formData.streetAddress1}
                        onChange={onInputChange} 
                      />
                      <small>Including 'Phuong' if needed</small>
                      {errors.streetAddress1.length > 0 ? <p className="mt-2 text-danger">{errors.streetAddress1}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="streetAddress2">Apt, Suite, Build</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="streetAddress2" 
                        value={formData.streetAddress2}
                        onChange={onInputChange} 
                      />
                      <small>This field is optional</small>
                      {errors.streetAddress2.length > 0 ? <p className="mt-2 text-danger">{errors.streetAddress2}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="city">City/District (*)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="city"
                        value={formData.city}
                        onChange={onInputChange} 
                      />
                      <small>City is for United States, District is for Vietnam</small>
                      {errors.city.length > 0 ? <p className="mt-2 text-danger">{errors.city}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="state">State/Province (*)</label>
                      <select 
                        className="custom-select" 
                        id="state"
                        value={formData.state ? formData.state : ""}
                        onChange={onInputChange}
                      >
                        <option value="">Choose...</option>
                        {formData.country === 'Vietnam' 
                          && provinceList.map(p => <option key={uuid()} value={p.province}>{p.province}</option>)
                        }
                        {formData.country === 'United States'
                          && stateList.map(s => <option key={uuid()} value={s.abbreviation}>{`${s.abbreviation} - ${s.name}`}</option>)
                        }
                      </select>
                      <small>State is for United States, Province is for Vietnam</small>
                      {errors.state.length > 0 ? <p className="mt-2 text-danger">{errors.state}</p> : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="zipcode">Zip Code/Postal Code (*)</label>
                      <InputMask
                        mask="99999"
                        maskChar=" " 
                        type="text" 
                        className="form-control" 
                        id="zipcode"
                        value={formData.zipcode}
                        onChange={onInputChange} 
                      />
                      <small>If country is Vietnam then Zipcode is 10000.</small>
                      {errors.zipcode.length > 0 ? <p className="mt-2 text-danger">{errors.zipcode}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="phone">Phone (*)</label>
                      <InputMask
                        mask="999-999-9999"
                        maskChar=" "
                        type="text" 
                        className="form-control" 
                        id="phone"
                        value={formData.phone}
                        onChange={onInputChange} 
                      />
                      <small>Hanoi home phone is 246-666-6666</small>
                      {errors.phone.length > 0 ? <p className="mt-2 text-danger">{errors.phone}</p> : null}
                    </div>
                  </div>
                </div>
              </li>

              <li className={liClassName}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="shippingIsBilling"
                        defaultChecked
                        onChange={onInputChange}
                      />
                      <label className="form-check-label" htmlFor="shippingIsBilling">
                        Same as Billing Information
                      </label>
                    </div>
                    <small>Shipping Information needed to create after registration if it is not the same as Billing Information.</small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {/* End of Account Information Card */}

        </div>        
      </div>
    </form>
  </>
}

export default CustomerForm;