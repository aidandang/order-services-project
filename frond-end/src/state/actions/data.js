export const FetchType = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL'
}

export const SAVE_CUSTOMER_TO_ORDER = 'SAVE_CUSTOMER_TO_ORDER';
export const SAVE_ITEM_TO_ORDER = 'SAVE_ITEM_TO_ORDER';
export const UPDATE_ITEM_IN_ORDER = 'UPDATE_ITEM_IN_ORDER';
export const REMOVE_ITEM_FROM_ORDER = 'REMOVE_ITEM_FROM_ORDER';

export const saveCustomerToOrder = ({ customer, address }) => ({
  type: SAVE_CUSTOMER_TO_ORDER,
  payload: { customer, address }
})

export const saveItemToOrder = (item) => ({
  type: SAVE_ITEM_TO_ORDER,
  item
})

export const updateItemInOrder = ({ item, index }) => ({
  type: UPDATE_ITEM_IN_ORDER,
  payload: { item, index }
})

export const removeItemFromOrder = (index) => ({
  type: REMOVE_ITEM_FROM_ORDER,
  index
})