/*初始化接口axios baseurl*/
import axios from 'axios'
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = false
