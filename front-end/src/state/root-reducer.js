import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import tabbarReducer from './tabbar/tabbar.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const appReducer = combineReducers({
  user: userReducer,
  tabbar: tabbarReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer)