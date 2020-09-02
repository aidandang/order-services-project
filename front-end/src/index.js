import React from 'react';
import ReactDOM from 'react-dom';

// dependencies
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './app';

// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './state/store';

// styles
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
);