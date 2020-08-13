import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, button }) {
  return <>
    <div className="row align-items-center mt-4">
      <div className="col-7">
        <h4 className="font-weight-bold">{title}</h4>
      </div>
      <div className="col-5 text-right">
        { button !== undefined 
          ? Object.keys(button).length > 0 
            && <Link to={button.href} className="btn btn-primary btn-custom">{button.text}</Link>
          : null
        }
      </div>
    </div>
  </>
}