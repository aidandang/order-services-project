import { AlertActionTypes } from './alert.types';

const INITIAL_STATE = {
  isFetching: false,
  alertMessage: null
}

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AlertActionTypes.FETCH_START:
      return {
        ...state,
        isFetching: true
      }
    case AlertActionTypes.FETCH_STOP:
      return {
        ...state,
        isFetching: false
      }
    case AlertActionTypes.SET_ALERT_MESSAGE:
      return {
        ...state,
        isFetching: false,
        alertMessage: {
          ...state.alertMessage,
          result: action.payload.result,
          color: action.payload.color
        }
      }
    case AlertActionTypes.CLEAR_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: null
      }
    default:
      return state;
  }
}

export default alertReducer;