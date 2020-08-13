import React from 'react';
import ReactDOM from 'react-dom';

// import redux components
import { Provider } from 'react-redux';
import configureStore from './state/_shared/store';
import { preloadedState } from './state/_shared/store/preloadedState';

// import route components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

// import application css
import './index.css';

// import main components
import LandingPage from './view/landing';
import UserLogin from './view/users/containers/UserLogin';
import ResetPassword from './view/users/containers/ResetPassword';
import App from './view/app/containers/App';

const store = configureStore(preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <PrivateRoute path="/app" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);