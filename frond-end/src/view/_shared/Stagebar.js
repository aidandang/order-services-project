import React from 'react';

// import dependencies
import uuid from 'react-uuid';

// main component
export default function Stagebar({ 
  stageList,
  active,  
  onClickHandler
}) {

  return <>
    <div className="row">
      <div className="col-12">
        <div className="card my-3">
          <div className="card-body">
            {
              stageList && stageList.map((element, index) => element.name === active 
                ? 
                  <span key={uuid()} className="mr-2">
                    <span className="mr-2">{element.text}</span>
                    {/* the first array index is 0 so the last index is the array length - 1 */}
                    {index < stageList.length - 1 && <span>&raquo;</span>} 
                  </span>
                : 
                  <span key={uuid()} className="mr-2">
                    <a 
                      key={uuid()} 
                      href="/"
                      name={element.name} 
                      onClick={onClickHandler}
                      className="stage-link-cs mr-2"
                    >
                      {element.text}
                    </a>
                    {/* the first array index is 0 so the last index is the array length - 1 */}
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