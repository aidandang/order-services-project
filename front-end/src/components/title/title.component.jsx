import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// ui settings
import './title.styles.css';

// MAIN COMPONET
const Title = ({ 
  settings: { title, button }
}) => {
  return <>
    <div className="row align-items-center">
      <div className="col-7">
        <h4 className="font-weight-bold">{title}</h4>
      </div>
      <div className="col-5 text-right">
        { button 
          ? <Link to={button.href} className="btn btn-primary btn-custom">{button.text}</Link>
          : null
        }
      </div>
    </div>
  </>
}

export default Title;