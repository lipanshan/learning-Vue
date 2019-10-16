import axios from 'axios'

export default function getUntestExam () {
  return axios.get('/getUntestExam').then((res) => {
    return Promise.resolve(res.data)
  })
}
