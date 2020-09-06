import { UserActionTypes } from './user.types';
import { jwtToUser } from './user.utils';

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isFetching: false,
        currentUser: jwtToUser(action.payload)
      };
    default:
      return state;
  }
}

export default userReducer;