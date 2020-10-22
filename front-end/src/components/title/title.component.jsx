import React from 'react';

// dependencies
import { Link } from 'react-router-dom'; 

const Title = ({
  title
}) => {
  return <>
    <div className="card border-0">
      <div className="card-header mb-0 title_card_header">
        <div className="d-flex justify-content-start">
          <div>
            <span className="h4 mr-3 title-font">{title.name}</span>
          </div>
          {
            title.button && 
            <div className="text-right align-self-center">
              <Link to={title.button.link} className="px-3 py-1 title-btn">{title.button.text}</Link>
            </div>
          }
        </div>
      </div>
      <div className="card-body py-2 title_card_header">
        <small className='card-text text-muted'>{title.message}</small>
      </div>
    </div>
  </>
}

export default Title;