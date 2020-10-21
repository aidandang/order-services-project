import React from 'react';

import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import './tag.styles.css';

export const Container = ({
  children,
  width
}) => {

  return (
    <div className="card mt-3">
      <div className="card-body pb-2">
        <div className="row my-0 py-0">
          <div className={`${width ? width : 'col'} text-right`}>
            <Link
              to={{
                key: 'goBack'
              }}
              className="a-link-cs"
            >
              Close ( x )
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export const Card = ({ children, width, title }) => {
  return (
    <div className="row">
      <div className={width}>
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">{title}</div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export const Li = ({ children }) => {
  return (
    <li className="list-group-item bg-item-list-cs list-group-item-action">
      {children}
    </li>
  )
}

export const Ul = ({ children }) => {
  return (
    <ul className="list-group list-group-flush">
      {children}
    </ul>
  )
}

export const Button = ({ children, isGoogleSignIn, disabled, ...otherProps }) => {
  return (
    <button 
      className={`btn ${disabled ? 'btn-secondary' : 'btn-primary'} btn-custom ${isGoogleSignIn && 'btn-custom-google'}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
)}

export const SelectInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  defaultValue,
  defaultText,
  data,
  valueKey,
  textKey,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <select
            name={name} 
            className="custom-select text-capitalize"
            {...otherProps}
          >
            <option value={defaultValue}>{defaultText}</option>
            {data && data.map(item => <option key={uuid()} value={item[valueKey]}>{item[textKey]}</option>)}
          </select>
          <small>{smallText}</small>
          {errors && errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}

export const TextInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            name={name} 
            type="text"
            className="form-control"
            {...otherProps}
          />
          <small>{smallText}</small>
          {errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}

export const TextareaInput = ({
  label,
  name,
  errors,
  size,
  smallText,
  ...otherProps
}) => {
  return <>
    <div className="row">
      <div className={size}>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <textarea
            name={name} 
            type="text"
            className="form-control"
            {...otherProps}
          />
          <small>{smallText}</small>
          {errors[name].length > 0 ? <p className="mt-2 text-danger">{errors[name]}</p> : null}
        </div>
      </div>
    </div>
  </>
}