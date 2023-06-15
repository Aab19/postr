import axios from 'axios'
import {BASE_URL_ENDPOINT} from 'utils'

const TimelineAPI = {
  getList: payload => axios.get(`${BASE_URL_ENDPOINT}/posts`, payload),
  postData: payload => axios.post(`${BASE_URL_ENDPOINT}/posts`, payload),
  updateData: payload =>
    axios.put(`${BASE_URL_ENDPOINT}/posts/${payload.id}`, payload),
  deleteData: id => axios.delete(`${BASE_URL_ENDPOINT}/posts/${id}`),
}

export {TimelineAPI}
