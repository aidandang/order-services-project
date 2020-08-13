export const setHeader = payload => ({
  type: 'SET_HEADER',
  payload
})

export const setTabActive = payload => ({
  type: 'SET_TAB_ACTIVE',
  payload
})

export const setStageActive = payload => {
  return {
    type: 'SET_STAGE_ACTIVE',
    payload
  }
}

export const setPageActive = payload => {
  return {
    type: 'SET_PAGE_ACTIVE',
    payload
  }
}



