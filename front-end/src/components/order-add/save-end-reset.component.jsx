import React from 'react';

// components
import { Li, Button } from '../tag/tag.component';

const SaveAndReset = ({
  buttonDisabled,
  formReset
}) => {
  return <>
    <Li>      
      <div className="row">
        <div className="col my-3">
          <Button
            type="submit"
            disabled={buttonDisabled}
          >
            Save
          </Button>
          <span className="mr-3"></span>
          <Button
            onClick={e => formReset(e)}
          >
            Reset
          </Button>
        </div>
      </div>
    </Li>
  </>
}

export default SaveAndReset;