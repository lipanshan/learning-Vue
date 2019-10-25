import axios from 'axios'
import qs from 'qs'
import createSign from '../assets/createsign.js'
import rsa from '../assets/rsa.js'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export function getVcode () {
  const time = new Date().getTime()
  const str = {
    service: 'App.User.VcodeCreate', tips: time
  }
  return `${axios.defaults.baseURL}?service=App.User.VcodeCreate&sign=${createSign(str)}&tips=${time}`
}

export function submitForm (data) {
  const rasUsername = getRSACode(data.username)
  const ragPassword = getRSACode(data.password)
  const time = new Date().getTime()
  const str = {
    'service': 'App.User.Login',
    'username': rasUsername,
    'password': ragPassword,
    'vcode': data.vcode,
    'tips': time
  }
  return axios.post("/",qs.stringify({
    'service': 'App.User.Login',
    sign: createSign(str),
    tips: time,
    username: rasUsername,
    password: ragPassword,
    vcode: data.vcode
  })).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function signOut () {
  const time = new Date().getTime()
  const str = {
    service: 'App.User.LoginOut', tips: time
  }
  return axios.post('/', qs.stringify({
    service: 'App.User.LoginOut',
    sign: createSign(str),
    tips: time
  })).then((res) => {
      return Promise.resolve(res.data)
  })
}

function getRSACode (newStr){
  //公钥
  const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAm39nQmLTyX/Ej961KxU+gJW4UgqEQnoaJowSgkK/4qNJAduIz7bhHWtxZ9SRNwUAXwZWZzh81dfYIkvhc5jikIVOEZoChOtUnkP+2jrpQmYMRSHwVQbsM+/k3U4Al7gQrJDwzRgxePyrtisZHpUtkN77bJXgQGEfDX09WytG4MTFk99hdXM8vllw4Nyw+ErZL3uVGK2tjFc1hCFXMXQwpWkDH2NDcGTxYacQp4ljyIouDQCf3Lhw0m+qhxL1jNYxk9oCzFkZFOoat2PRhmV7Lp6E/+dWnWXIT86EaI7Fqy238rhnD2WQ4dD/fxq1yXADgaoT24549Xzmywd3hDo8mQIDAQAB-----END PUBLIC KEY-----';
  //私钥
  const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCbf2dCYtPJf8SP3rUrFT6AlbhSCoRCehomjBKCQr/io0kB24jPtuEda3Fn1JE3BQBfBlZnOHzV19giS+FzmOKQhU4RmgKE61SeQ/7aOulCZgxFIfBVBuwz7+TdTgCXuBCskPDNGDF4/Ku2KxkelS2Q3vtsleBAYR8NfT1bK0bgxMWT32F1czy+WXDg3LD4Stkve5UYra2MVzWEIVcxdDClaQMfY0NwZPFhpxCniWPIii4NAJ/cuHDSb6qHEvWM1jGT2gLMWRkU6hq3Y9GGZXsunoT/51adZchPzoRojsWrLbfyuGcPZZDh0P9/GrXJcAOBqhPbjnj1fObLB3eEOjyZAgMBAAECggEAONW+VkNtCY9LtxI9wbuIFtOihUoWwX2DpWc5NKdVH29zNdyaCuHbMjedQcguM5/+XL0iQ6Qf7MFx3EdD5k6RMSWoPUK/fPnO+fH8aqNxsrU98t7OyyU2nF0ol8L08H90iL6JZU1cd85SrMjf64+3EeaOm0fEqYNWKEYIcRRGWczATihYsf0K7ANPrAc5NDV82igHyRJ4q2yezvk9lCAQSzzVbXILPKlecR+JtF+giFAmioeBvbyWpngHH2/IkfRuWfQbBynPYAw2xVFaEZxsjbeEY1066PkYZowAYyVyZskPMvaY4nh7uu19izq/z1ERi3cKm4E5hPP3Uf+XpU/WiQKBgQDMUy3pzL1h7tWKaVCciyk+cxgxGJGT4sBc77+xP9Mtqj4ouQqyRLPd3zUjjphOr/G0fLCJUpPCADQLBWg5IJigdKSY8Jn3uYsgDxfWoV+YAxeymUU30yuvJAnkn/mfyHdq+4E1Qf85v22Dl2XNPJ7FHkBSXJLAfo4+la+Zi8zlOwKBgQDC0vNa8yNz0WTIW48EKqDghtuJQ/L1HQ+QyaVKvxqbBiRIux9BWftiAxjfOfjf1Ps8gu6Y0vZGcHAv1N4OPxZXfiCFNDS0XvHltzGA/Jf1JPFOuc4FKPUxu96Ki+yS3uRR1rqVgIXt77J0/lbDzpOiPk0SHTKZTIf41SYs9c24OwKBgQCM4snkzVTEY0+Ayc9Ysaf1tJy4ta0joJVtP68Yw96UPS/xGm5ir3aqhQ75/ofMsgrinZuIhJT3jvZTpx3PTkePU/5uqnAv3RMuPtn8F3d3tKIxdvfAX25erGXZ6+jOoQaekN7t3xziL7mOo+UBGEyNtKc7YzOZYWopg0L6h+f3IwKBgCzU8E0okCrxr3hvoUx7JsQkJFbE/R6sjk1qKZA2w7+SvTzDWqDmPPPD9LBBneScFShKlO8z9Jom+5n2KRcsK0785izg45PyGUYcTtb4yVsPIjxUg3UqhKnqKn7FTi5J/k5a1Frc1XT4aJ+Fe5/ZZJ28Km4Vq/Qc6Vk4a22DLtDLAoGAQTxau++vP8xO4dqILhhyEhXWNqUVFf7jHZlqtldkcYpx5XNLimbbfnX/ro+iug5ZcsLx06VwYx2INsDGU2mrXGIUy5wkTB4I5ARxWJOISpIoQluAMC9r3AU7ihPmBuVwbu2xjE39rFCLr/xADK++9CCwU6ulBbEX4BrIkE/ucbw=-----END PRIVATE KEY-----';
  const obj = rsa()
  const crypt = new obj.JSEncrypt();
  crypt.setPublicKey(PUBLIC_KEY);
  //使用公钥加密
  const encrypted = crypt.encrypt(newStr);
  return encrypted
}

