import Cookies from 'js-cookie'


export default {
  getToken: (tokenName) => {
    return Cookies.get(tokenName)
  },
  setToken: (tokenName,tokenValue) => {
    return Cookies.set(tokenName, tokenValue)
  },
  removeToken: (tokenName) => {
    return Cookies.remove(tokenName)
  }
}
