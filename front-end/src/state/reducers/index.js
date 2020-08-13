import data from './data';
import ui from './ui';
import { preloadedState } from '../_shared/store/preloadedState';

const rootReducer = (state = {}, action) => {
  if (action.type === 'COMPONENT_CLEANUP') return preloadedState;

  return {
    data: data(state.data, action),
    ui: ui(state.ui, action)
  }
};

export default rootReducer;