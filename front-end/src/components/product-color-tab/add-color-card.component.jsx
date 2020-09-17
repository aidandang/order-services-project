import React from 'react';

// ui settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

const AddColorCard = () => {
  return (
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">ADD COLOR</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
    
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <a 
                href="/" 
                className="a-link-cs" 
                name="colorInfo" 
                onClick={(e) => { 
                  e.preventDefault();
                }}
              >
                Add a New Color (+)
              </a>
            </div>
          </div>
        </li> 

      </ul>
    </div>
  )
}

export default AddColorCard;