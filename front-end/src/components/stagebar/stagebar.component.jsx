import React from 'react';

// dependencies
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// main component
const Stagebar = ({ 
  stageList,
  active
}) => {

  const location = useLocation();
  const queryObj = queryString.parse(location.search);
  if (queryObj && queryObj.stage) {
    delete queryObj.stage
  }
  const search = queryString.stringify(queryObj);

  return <>
    <div className="row">
      <div className="col-12">
        <div className="card my-3">
          <div className="card-body">
            {
              stageList && stageList.map((element, index) => element.name === active 
                ? 
                  <span key={index} className="mr-2">
                    <span className="mr-2">{element.text}</span>
                    {index < stageList.length - 1 && <span>&raquo;</span>} 
                  </span>
                : 
                  <span key={index} className="mr-2">
                    <Link  
                      to={location.pathname + location.search ? `?${search}&stage=${element.name}` : `?stage=${element.name}`}
                      className="stage-link-cs mr-2"
                    >
                      {element.text}
                    </Link>
                    {index < stageList.length - 1  && <span>&raquo;</span>}      
                  </span>
              )
            }
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Stagebar;