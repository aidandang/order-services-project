export const PageWrapperList = {
  dashboard: {
    header: {
      title: 'Dashboard',
      button: {}
    },
    tabbar: {
      list: [
        {
          name: 'GENERAL_INFO',
          text: 'General Information',
          message: ''
        },
        {
          name: 'REPORTS',
          text: 'Reports',
          message: ''
        }
      ],
      active: {
        tab: "GENERAL_INFO",
        page: {}
      } 
    }
  },
  products: {
    header: {
      title: 'Products',
      button: {
        href: '/app/products',
        text: 'Import Files'
      }
    },
    tabbar: {
      list: [
        {
          name: 'PRODUCT_LIST',
          text: 'Product List',
          message: ''
        },
        {
          name: 'BRANDS',
          text: 'Brands',
          message: ''
        }
      ],
      active: {
        tab: 'PRODUCT_LIST',
        page: {}
      } 
    }
  },
  productSettings: {
    header: {
      title: 'Product Settings',
      button: {
        href: '/app/orders',
        text: 'Create Order'
      }
    },
    tabbar: {
      list: [
        {
          name: 'GENERAL_SETTINGS',
          text: 'General Settings',
          message: ''
        },
        {
          name: 'COLOR_INFO',
          text: 'Color Information',
          message: ''
        }
      ],
      active: {
        tab: "GENERAL_SETTINGS",
        page: {}
      } 
    }
  },
  customers: {
    header: {
      title: 'Customers',
      button: {
        href: '/app/customers',
        text: 'Import Files'
      }
    },
    tabbar: {
      list: [
        {
          name: 'CUSTOMER_LIST',
          text: 'Customer List',
          message: ''
        }
      ],
      active: {
        tab: "CUSTOMER_LIST",
        page: {}
      } 
    }
  },
  customerSettings: {
    header: {
      title: 'Customer Settings',
      button: {
        href: '/app/orders',
        text: 'Create Order'
      }
    },
    tabbar: {
      list: [
        {
          name: 'GENERAL_SETTINGS',
          text: 'General Settings',
          message: ''
        },
        {
          name: 'SHIPPING_INFO',
          text: 'Shipping Information',
          message: ''
        }
      ],
      active: {
        tab: "GENERAL_SETTINGS",
        page: {}
      } 
    }
  },
  orders: {
    header: {
      title: 'Orders',
      button: {
        href: '/app/orders/add',
        text: 'Import Files'
      }
    },
    tabbar: {
      list: [
        {
          name: 'ORDER_LIST',
          text: 'Order List',
          message: ''
        },
        {
          name: 'ADD_ORDER',
          text: 'Add Order',
          stages: [
            {
              name: 'SELECT_CUSTOMER',
              text: '1. Select Customer'
            },
            {
              name: 'ADD_ITEMS',
              text: '2. Add Item(s)'
            },
            {
              name: 'SUBMIT_ORDER',
              text: '3. Preview/Submit'
            }
          ],
          message: ''
        }
      ],
      active: {
        tab: 'ORDER_LIST',
        stage: 'SELECT_CUSTOMER',
        page: {}
      } 
    }
  },
  userLogin: {
    header: {
      title: 'User Login',
      button: {}
    },
    tabbar: {
      list: [
        {
          name: 'LOG_IN',
          text: 'Login',
          message: ''
        },
        {
          name: 'FORGOT_PASSWORD',
          text: 'Forgot Password',
          message: 'Enter your email address below, and if an account exists, we’ll send you a link to reset your password.'
        }
      ],
      active: {
        tab: "LOG_IN",
        page: {}
      } 
    }
  },
  resetPassword: {
    header: {
      title: 'RESET PASSWORD',
      button: {}
    },
    tabbar: {
      list: [
        {
          name: 'CREATE_A_NEW_PASSWORD',
          text: 'Create a New Password',
          message: ''
        }
      ],
      active: {
        tab: "CREATE_A_NEW_PASSWORD",
        page: {}
      } 
    }
  }                
}

export const navbarItemList = [
  {
    text: 'Application',
    link: '/app',
    icon: 'fas fa-briefcase'
  },
  {
    text: 'Read Me',
    link: '/app',
    icon: 'fab fa-readme'
  }
];

export const navbarItemListUser = []

export const sidebarItemList = [
  { 
    text: 'Dashboard',
    link: '/app',
    icon: 'fas fa-tachometer-alt'
  },
  {
    text: 'Products',
    link: '/app/products',
    icon: 'fas fa-socks'
  },
  {
    text: 'Customers',
    link: '/app/customers',
    icon: 'fas fa-address-card'
  },
  { 
    text: 'Orders',
    link: '/app/orders',
    icon: 'fas fa-folder'
  },
  {
    text: 'Receiving',
    link: '/app/receiving',
    icon: 'fas fa-barcode'
  },
  {
    text: 'Warehouse',
    link: '/app/warehouse',
    icon: 'fas fa-warehouse'
  },
  {
    text: 'Shipping',
    link: '/app/shipping',
    icon: 'fas fa-truck'
  }
];

export const navbarSettings = {
  bg: 'navbar-bg',
  isLogo: true
};

export const navbarSettingsUser = {
  bg: 'navbar-bg',
  isLogo: false
};

export const liClassName = "list-group-item bg-item-list-cs list-group-item-action";