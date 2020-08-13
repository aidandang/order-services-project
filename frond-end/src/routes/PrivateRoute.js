import React from 'react'

// import routes
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => { 
  
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect 
            to={{
              pathname: "/login",
              state: { pathname: location.pathname }
            }} 
          />
        )
      }
    />
)};

export default PrivateRoute;