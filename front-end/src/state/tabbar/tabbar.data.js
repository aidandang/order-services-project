export const INITIAL_STATE = {
  login: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Member Information' 
      },
    ],
    message: {
      style: '',
      text: 'Member can login by choosing either Google account or Order Services account.'
    }
  },
  register: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Create a New Account' 
      },
    ],
    message: {
      style: '',
      text: 'Only admins can create a new account.'
    }
  },
  forgotPassword: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Reset Password' 
      },
    ],
    message: {
      style: '',
      text: 'Enter your email to receive instructions on how to reset your password.'
    }
  },
  resetPassword: {
    selectedTab: 1,
    list: [
      { 
        id: 1,
        name: 'Create a New Password' 
      },
    ],
    message: {
      style: '',
      text: 'Enter your new password and confirm the password.'
    }
  }
}