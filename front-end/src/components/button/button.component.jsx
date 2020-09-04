import React from 'react';

import './button.styles.css';

const Button = ({ children, ...otherProps }) => {
  const { buttonDisabled } = otherProps;

  return (
    <button 
      type='submit'
      className={`btn btn-${buttonDisabled ? "secondary btn-custom-disabled" : "primary btn-custom"}`} 
      disabled={buttonDisabled}
    >
      {children}
    </button>
)}

export default Button;