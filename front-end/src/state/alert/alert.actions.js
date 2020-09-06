import { AlertActionTypes } from './alert.types';

export const setAlertMessage = (alertMessage) => ({
  type: AlertActionTypes.SET_ALERT_MESSAGE,
  payload: alertMessage
})

export const clearAlertMessage = () => ({
  type: AlertActionTypes.CLEAR_ALERT_MESSAGE
})