import jwtDecode from 'jwt-decode';

export const jwtToUser = (token) => {
  if (token) {
    return jwtDecode(token)
  } else {
    return null
  }
}

