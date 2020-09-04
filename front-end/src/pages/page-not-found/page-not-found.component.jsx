import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// components
import Title from '../../components/title/title.component';

// ui settings
import './page-not-found.styles.css';
const titleSettings = {
  title: 'Sorry. We could not find that page.',
  button: undefined
}

// MAIN FUNCTION
const PageNotFound = () => {
  return <>
    <Title settings={titleSettings} />
    <div className="row mt-3">
      <div className="col">
        <small>Go back to <Link to='/' className="a-link-cs">Home Page</Link></small>
      </div>
    </div>
  </>   
}

export default PageNotFound;