import axios from './axios'

/* 培训期数 */
export function getCerTrainingPeriodList (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerTrainingPeriod.GetList',
    tips: time,
    pageIndex: 1,
    pageSize: 10
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteCerTrainingPeriod (train_id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerTrainingPeriod.DelInfo',
    tips: time,
    train_id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function SetTrainingPeriod (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerTrainingPeriod.SetInfo',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}



export function EditTrainingPeriod (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerTrainingPeriod.UpInfo',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}



export function GetCerTrainingPeriodInfo (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerTrainingPeriod.GetInfo',
    tips: time,
    train_id:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getCerTrainingList () {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerType.TypeTempList',
    tips: time
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}



// 证书类型  //


export function getCerTypeList (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerType.TypeList',
    tips: time,
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteCerType (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerType.DelInfo',
    tips: time,
    cer_id:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetCerTypeGetInfo (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerType.GetInfo',
    tips: time,
    cer_id:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function SetCerTypeSetInfo (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerType.SetInfo',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function EditCerTypeUpInfo (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerType.UpInfo',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}



export function getTempList () {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerTemplate.TempList',
    tips: time
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}



export function Preview (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerType.Preview',
    tips: time,
    cer_id:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}


// 厂商证书 //

export function getFirmCertificateList (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerManufacturer.GetList',
    tips: time,
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function EditFirmCertificate (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerManufacturer.UpManuf',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function GetManufInfo (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerManufacturer.GetManufInfo',
    tips: time,
    manufId:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function GetListByManuId (data = {}) {
  const time = new Date().getTime()
  const param = Object.assign({
    service: 'App.CerManufacturerTrainee.GetListByManuId',
    tips: time
  }, data)
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function RenewCertificate (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerManufacturer.RenewCertificate',
    tips: time,
    manufId:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function IssueCertificate (id) {
  const time = new Date().getTime()
  const param = {
    service: 'App.CerManufacturer.IssueCertificate',
    tips: time,
    manufId:id
  }
  return axios.post('/', param).then((res) => {
    return Promise.resolve(res.data)
  })
}