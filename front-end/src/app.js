import React, { useEffect } from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Public from './containers/public/public.container.jsx';
import Private from './containers/private/private.container.jsx';
import PrivateRoute from './components/private-route/private-route.component';

// redux
import { connect } from 'react-redux';
import { getAuthStateChanged } from './state/api/auth-requests';
import { setCurrentUser } from './state/user/user.actions';

// MAIN COMPONENT
const App = ({ getAuthStateChanged, setCurrentUser }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) getAuthStateChanged()
    else setCurrentUser(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <Switch>
      <PrivateRoute path="/app" component={Private} />
      <Route path='/' component={Public} />    
    </Switch>
  )
}

const mapDispatchToProps = dispatch => ({
  getAuthStateChanged: () => dispatch(getAuthStateChanged()),
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);