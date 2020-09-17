import React, { useEffect } from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';
// components
import PublicRoutes from './routes/public/public-routes.component.jsx';
import AuthRoute from './routes/private/auth-route.component';
import PrivateRoutes from './routes/private/private-routes.component';
// firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// redux
import { connect } from 'react-redux';
import { setCurrentUser } from './state/user/user.actions';

const App = ({
  setCurrentUser
}) => {
  useEffect(() => {
    let listener = null;
    listener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()  
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
    return () => {
      listener();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <Switch>
      <AuthRoute path="/app" component={PrivateRoutes} />
      <Route path='/' render={props => <PublicRoutes {...props} />} />    
    </Switch>
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);