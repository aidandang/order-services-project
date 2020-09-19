import React from 'react';

// ui settings
import './title.styles.css';

const Title = ({
  title
}) => {
  return <>
    <div className="card border-0">
      <div className="card-header title_card_header">
        <h4 className="mb-0 mr-3 title_font">{title.name}</h4>
      </div>
      <div className="card-body py-2 title_card_header">
        <small className='card-text text-muted'>{title.message}</small>
      </div>
    </div>
  </>
}

export default Title;