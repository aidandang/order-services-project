import React from 'react'

// dependencies
import { Route, Redirect } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => { 
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect 
            to={'/login'} 
          />
        )
      }
    />
)};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(PrivateRoute);