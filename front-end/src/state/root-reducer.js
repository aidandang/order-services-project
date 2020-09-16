import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import tabbarReducer from './tabbar/tabbar.reducer';
import sidebarReducer from './sidebar/sidebar.reducer';
import navbarReducer from './navbar/navbar.reducer';
import productReducer from './product/product.reducer';
import alertReducer from './alert/alert.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['']
}

const appReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
  tabbar: tabbarReducer,
  sidebar: sidebarReducer,
  navbar: navbarReducer,
  product: productReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer)