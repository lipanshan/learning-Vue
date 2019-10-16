import axios, {createSign} from './axios'
import rsa from '../assets/rsa.js'

export function getVcode ({ length = 4, width = 140, height = 60, fontsize = 26} = {}) {
  const time = new Date().getTime()
  const sign = createSign(Object.assign({
      service: 'App.User.VcodeCreate',
      tips: time,
      length,
      width,
      height,
      fontsize
  }, ))
  return `${axios.defaults.baseURL}?service=App.User.VcodeCreate&tips=${time}&sign=${sign}&length=${length}&width=${width}&height=${height}&fontsize=${fontsize}`
}

export function submitForm (data) {
  const rasUsername = getRSACode(data.username)
  const ragPassword = getRSACode(data.password)
  const time = new Date().getTime()
  return axios.post("/",{
    'service': 'App.User.Login',
    tips: time,
    username: rasUsername,
    password: ragPassword,
    vcode: data.vcode
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function signOut () {
  const time = new Date().getTime()
  return axios.post('/', {
    service: 'App.User.LoginOut',
    tips: time
  }).then((res) => {
      return Promise.resolve(res.data)
  })
}

function getRSACode (newStr){
  //公钥
  const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm39nQmLTyX/Ej961KxU+gJW4UgqEQnoaJowSgkK/4qNJAduIz7bhHWtxZ9SRNwUAXwZWZzh81dfYIkvhc5jikIVOEZoChOtUnkP+2jrpQmYMRSHwVQbsM+/k3U4Al7gQrJDwzRgxePyrtisZHpUtkN77bJXgQGEfDX09WytG4MTFk99hdXM8vllw4Nyw+ErZL3uVGK2tjFc1hCFXMXQwpWkDH2NDcGTxYacQp4ljyIouDQCf3Lhw0m+qhxL1jNYxk9oCzFkZFOoat2PRhmV7Lp6E/+dWnWXIT86EaI7Fqy238rhnD2WQ4dD/fxq1yXADgaoT24549Xzmywd3hDo8mQIDAQAB-----END PUBLIC KEY-----';
  const obj = rsa()
  const crypt = new obj.JSEncrypt();
  crypt.setPublicKey(PUBLIC_KEY);
  //使用公钥加密
  const encrypted = crypt.encrypt(newStr);
  return encrypted
}

