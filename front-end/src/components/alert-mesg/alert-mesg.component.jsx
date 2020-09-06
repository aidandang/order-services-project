import React from 'react';

// ui settings
import './alert-mesg.styles.css';

const AlertMesg = ({ alertMessage }) => {
  return <>
    <div className='row my-4'>
      <div className='col'>
        <span className={`alert alert-${alertMessage.color}`} role="alert">
          {alertMessage.result.message}
        </span>  
      </div>
    </div>
  </>
}

export default AlertMesg;