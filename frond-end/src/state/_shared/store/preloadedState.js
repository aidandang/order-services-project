const elementState = {
  byId: {},
  allIds: [],
  info: {
    count: 0,
    pages: 0
  }
}

export const preloadedState = {
  data: {
    users: elementState,
    products: elementState,
    brands: elementState,
    customers: elementState,
    orders: elementState,
    message: {
      style: "",
      text: "An event message will be shown here after event occurred."
    }
  },
  ui: {
    pageWrapper: {}
  }
};