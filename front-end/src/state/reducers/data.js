import { 
  FetchType, 
  SAVE_CUSTOMER_TO_ORDER, 
  SAVE_ITEM_TO_ORDER,
  UPDATE_ITEM_IN_ORDER,
  REMOVE_ITEM_FROM_ORDER 
} from '../actions/data';

const fetchMessage = (message) => ({
  ...message,
  style: "",
  text: "An event message will be shown here after event occurred."
})

// update AllIds array after patch data
const updateAllIds = (state, action, item) => {
  switch (action) {
    case 'PATCH_SUCCESS': 
      return state.map(obj => {
        if (obj._id === item._id) {
          return Object.assign({}, obj, item)
        };
        return obj;
      });
    
    case 'DELETE_SUCCESS':
      return state.filter(obj => obj._id !== item._id);

    case 'POST_SUCCESS':
      return [...state, item];

    default:
      return state;
  }
}

const fetchSuccessBrands = (state, action) => ({
  ...state,
  brands: {
    ...state.brands, 
    allIds: action.payload.brands
  },
  message: fetchMessage(state.message)
})

const fetchSuccessBrand = (state, action) => ({ 
  ...state,
  brands: {
    ...state.brands, 
    byId: action.payload.brand,
    allIds: updateAllIds(state.brands.allIds, action.payload.status, action.payload.brand)
  },
  message: fetchMessage(state.message)
})

const fetchSuccessProducts = (state, action) => ({ 
  ...state,
  products: {
    ...state.products, 
    allIds: action.payload.products,
    info: {
      ...state.products.info, 
      count: action.payload.info.count,
      pages: action.payload.info.pages
    }
  },
  message: fetchMessage(state.message)
})

const fetchSuccessProduct = (state, action) => ({
  ...state,
  products: {
    ...state.products,
    byId: action.payload.product
  },
  message: fetchMessage(state.message)
})

const fetchSuccessCustomers = (state, action) => ({
  ...state,
  customers: {
    ...state.customers, 
    allIds: action.payload.customers,
    info: {
      ...state.customers.info, 
      count: action.payload.info.count,
      pages: action.payload.info.pages
    }
  },
  message: fetchMessage(state.message)
})

const fetchSuccessCustomer = (state, action) => ({
  ...state,
  customers: {
    ...state.customers, 
    byId: action.payload.customer
  },
  message: fetchMessage(state.message)
})

const fetchSuccess = (state, action) => {
  if (action.payload.message) return { 
    ...state,
    message: {
      ...state.message,
      style: "text-success",
      text: action.payload.message
    }
  };
  
  if (action.payload.products) return fetchSuccessProducts(state, action)
  if (action.payload.product) return fetchSuccessProduct(state, action)
  if (action.payload.brands) return fetchSuccessBrands(state, action)
  if (action.payload.brand) return fetchSuccessBrand(state, action)
  if (action.payload.customers) return fetchSuccessCustomers(state, action)
  if (action.payload.customer) return fetchSuccessCustomer(state, action)

  return state
}

const fetchStart = (state, action) => ({
  ...state,
  message: {
    ...state.message,
    style: "text-primary",
    text: "...Fetching."
  }
})

const fetchFail = (state, action) => ({
  ...state,
  message: {
    ...state.message,
    style: "text-danger",
    status: action.payload ? action.payload.data.status : 'ERROR',
    text: action.payload ? action.payload.data.message : 'ERROR: Connection to the server was refused.'
  }
})

const customerToOrder = (state, action) => ({
  ...state,
  orders: {
    ...state.orders, 
    byId: {
      ...state.orders.byId,
      customer: action.payload.customer,
      address: action.payload.address
    } 
  }
})

const itemToOrder = (state, action) => ({
  ...state,
  orders: {
    ...state.orders, 
    byId: {
      ...state.orders.byId,
      items: state.orders.byId.items ? [...state.orders.byId.items, action.item] : [action.item]
    } 
  }
})

const itemOrderUpdate = (state, action) => {
  let newArray = state.orders.byId.items;
  newArray[action.payload.index] = action.payload.item;
  
  return {
    ...state,
    orders: {
      ...state.orders, 
      byId: {
        ...state.orders.byId,
        items: newArray
      } 
    }
  }
}

const itemOrderRemove = (state, action) => {
  const newArray = state.orders.byId.items.filter((item, index) => index !== action.index);
  
  return {
    ...state,
    orders: {
      ...state.orders, 
      byId: {
        ...state.orders.byId,
        items: newArray
      } 
    }
  }
}

const data = (state = {}, action) => {
  switch (action.type) {
    case FetchType.FETCH_START: return fetchStart(state, action);
    case FetchType.FETCH_SUCCESS: return fetchSuccess(state, action);
    case FetchType.FETCH_FAIL: return fetchFail(state, action);
    case SAVE_CUSTOMER_TO_ORDER: return customerToOrder(state, action);
    case SAVE_ITEM_TO_ORDER: return itemToOrder(state, action);
    case UPDATE_ITEM_IN_ORDER: return itemOrderUpdate(state, action);
    case REMOVE_ITEM_FROM_ORDER: return itemOrderRemove(state, action);
      
    // default state if there is no action type
    default:
      return state;
  }
}

export default data;