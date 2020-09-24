import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import uuid from 'react-uuid';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const PreviewColors = ({
  colors,
  setValues
}) => {

  const location = useLocation();

  const queryObj = queryString.parse(location.search);
  const { type } = queryObj;

  const removeColor = (e, index) => {
    e.preventDefault();
    setValues(prevState => ({ 
      ...prevState,
      colors: prevState.colors.filter((color, idx) => idx !== index)
    }))
  } 

  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">Product Colors</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
    
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <Link 
                to={`${location.pathname}?type=${type}&action=add-color`} 
                className="a-link-cs"
              >
                (+) Add a New Color 
              </Link>
            </div>
          </div>
        </li>
        { 
          colors.length > 0 &&
            colors.map((color, index) => 
              <li key={uuid()} className={liClassName}>
                <div className="row"> 
                  <div className="col align-self-center text-center">
                    <img
                      className="my-2 product-img"
                      src={color.image} alt={color.color}
                    />
                  </div>
                  <div className="col align-self-center">
                    <span>{color.color}</span><br />
                    <span className="on-click" onClick={e => removeColor(e, index)}>Remove</span>
                  </div>
                </div>
              </li>
            )
        }  
      </ul>
    </div>
  </>
}

export default PreviewColors;