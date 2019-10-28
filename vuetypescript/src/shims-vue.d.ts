declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module 'js-md5' {
  const md5: any
  export default md5
}
declare module 'qs' {
  const qs: any
  export default qs
} 
interface AxiosConfigStick {
  data?: any
  params?: any
}