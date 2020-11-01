import React from 'react';

// components
import { Li, Button } from '../tag/tag.component';

const SubmitOrReset = ({
  buttonName,
  buttonDisabled,
  formSubmit,
  formReset
}) => {
  return <>
    <Li>      
      <div className="row">
        <div className="col my-3">
          <Button
            onClick={e => {
              e.preventDefault();
              formSubmit()
            }}
            disabled={buttonDisabled}
          >
            {buttonName}
          </Button>
          <span className="mr-3"></span>
          <Button
            onClick={e => {
              e.preventDefault();
              formReset()
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </Li>
  </>
}

export default SubmitOrReset;