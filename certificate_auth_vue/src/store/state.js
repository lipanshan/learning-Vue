const username = window.localStorage.getItem('AuthenticationUsername')
const avatar = window.localStorage.getItem('AuthenticationaAvatar')
const state = {
  username: username ? username : '',
  avatar: avatar? avatar : ''
}
export default state