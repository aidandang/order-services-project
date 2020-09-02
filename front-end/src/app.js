import React, { useEffect } from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Public from './containers/public/public.container.jsx';
import Private from './containers/private/private.container.jsx';
import PrivateRoute from './routes/PrivateRoute';

// redux
import { connect } from 'react-redux';
import { getAuthStateChanged } from './state/api/api.requests';

// MAIN COMPONENT
const App = ({ getAuthStateChanged }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) { 
      getAuthStateChanged() 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <Switch>
      <PrivateRoute path="/app" component={Private} />
      <Route path='/' component={Public} />    
    </Switch>
  )
}

export default connect(null, { getAuthStateChanged })(App);