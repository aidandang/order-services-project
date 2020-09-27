import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
// components
import Button from '../button/button.component';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const SubmitCard = ({
  formSubmit,
  buttonDisabled
}) => {

  const location = useLocation();
  const history = useHistory();

  return <>
    <form onSubmit={formSubmit}>
      <div className="card my-3">
        <div className="card-header bg-card-cs">
          <div className="row">
            <div className="col text-uppercase font-weight-bold">Update Confirmation</div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className={liClassName}>      
            <div className="row">
              <div className="col mt-3">
                <div className="form-group">
                  <Button 
                    type="submit" 
                    disabled={buttonDisabled}
                  >
                    Submit
                  </Button>
                  <span className="mr-3"></span>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      history.push(location.pathname);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </form>
  </>
}

export default SubmitCard;