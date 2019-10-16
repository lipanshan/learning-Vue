import axios from './axios'

/*
*
* 学员未获取证书api
* */
export function getUnobtainList (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.StuHaveNotCer.TabList',
    tips: time,
    page: 1,
    perpage: 10
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteUnobtain (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHaveNotCer.DelStu',
    tips: time,
    id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function createCertificate (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHaveNotCer.CreateCer',
    tips: time,
    id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getCompanyNameList (word = '') {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHaveNotCer.CompanyNameList',
    tips: time,
    company_name_key: word
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getCertificateType () {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHaveNotCer.CertypeTrainSelectList',
    tips: time
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function createStudent (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.StuHaveNotCer.CreateStu',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function uploadImage (data={}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.Upload.UploadImage',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function studentSeeInfo (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHaveNotCer.ViewStuInfo',
    tips: time,
    id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function editorStudent (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.StuHaveNotCer.EditStu',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

/*
*
* 学员已获取证书api
* */
export function getobtainedList (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.StuHasCer.TabList',
    tips: time,
    page: 1,
    perpage: 10
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteObtained (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHasCer.DelStu',
    tips: time,
    id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function studentObtainedSeeInfo (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHasCer.ViewStuInfo',
    tips: time,
    id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function editorObtainedStudent (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.StuHasCer.EditStu',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function certificateRenew (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.StuHasCer.RenewCer',
    tips: time,
    id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}