import React from 'react';

import './button.styles.css';

const Button = ({ children, isGoogleSignIn, disabled, ...otherProps }) => {
  return (
    <button 
      className={`btn ${disabled ? 'btn-secondary' : 'btn-primary'} btn-custom ${isGoogleSignIn && 'btn-custom-google'}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
)}

export default Button;