export const TABBAR_LIST = {
  login: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Member Information',
        message: 'Member can login by choosing either Google account or Order Services account.' 
      }
    ]
  },
  register: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Create a New Account',
        message: 'Only admins can create a new account.' 
      }
    ]
  },
  forgotPassword: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Reset Password',
        message: 'Enter your email to receive instructions on how to reset your password.' 
      }
    ]
  },
  resetPassword: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Create a New Password',
        message: 'Enter your new password and confirm the password.' 
      }
    ]
  },
  productList: {
    selectedTab: 1,
    list: [
      {
        id: 1,
        name: 'Product List',
        message: 'Search for products by names or styles.'
      },
      {
        id: 2,
        name: 'Brand',
        message: 'Each product has to have a brand. If a brand is not found, create new.'
      }
    ]
  },
  productById: {
    selectedTab: 1,
    list: [
      {
        id: 1,
        name: 'Style Information',
        message: 'General infomation of the product style.'
      },
      {
        id: 2,
        name: 'Color Information',
        message: 'Color options of this produc style.'
      }
    ]
  }
}