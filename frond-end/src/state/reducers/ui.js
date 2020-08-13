// functions
const setHeader = (state, action) => ({
  ...state, 
  pageWrapper: action.payload
});

const setTabActive = (state, action) => ({
  ...state,
  pageWrapper: {
    ...state.pageWrapper,
    tabbar: {
      ...state.pageWrapper.tabbar,
      active: {
        ...state.pageWrapper.tabbar.active, 
        tab: action.payload.tab,
        page: action.payload.page
      }
    }
  }
})

const setStageActive = (state, action) => ({
  ...state,
  pageWrapper: {
    ...state.pageWrapper,
    tabbar: {
      ...state.pageWrapper.tabbar,
      active: {
        ...state.pageWrapper.tabbar.active, 
        stage: action.payload,
        page: {}
      }
    }
  }
})

const setPageActive = (state, action) => ({
  ...state,
  pageWrapper: {
    ...state.pageWrapper,
    tabbar: {
      ...state.pageWrapper.tabbar,
      active: {
        ...state.pageWrapper.tabbar.active, 
        page: action.payload
      }
    }
  }
})

// ui reducer start here
const ui = (state = {}, action) => {
  switch (action.type) {
    case 'SET_HEADER': return setHeader(state, action);
    case 'SET_TAB_ACTIVE': return setTabActive(state, action);
    case 'SET_STAGE_ACTIVE': return setStageActive(state, action);
    case 'SET_PAGE_ACTIVE': return setPageActive(state, action);
    // default state if there is no action type
    default: return state;
  }
}

export default ui;