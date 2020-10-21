import React from 'react';

// components
import { Card, Ul, Li, Button } from '../tag/tag.component';

const SubmitCard = ({
  formSubmit,
  handleSecond,
  buttonDisabled,
  buttonText
}) => {
  return <>
    <Card width="col" title="Action">
      <Ul>  
        <Li>      
          <div className="row">
            <div className="col my-3">
              <Button
                type="submit" 
                onClick={e => {
                  e.preventDefault();
                  formSubmit();
                }}
                disabled={buttonDisabled}
              >
                {buttonText[0]}
              </Button>
              <span className="mr-3"></span>
              <Button
                onClick={e => {
                  e.preventDefault();
                  handleSecond();
                }}
              >
                {buttonText[1]}
              </Button>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
  </>
}

export default SubmitCard;