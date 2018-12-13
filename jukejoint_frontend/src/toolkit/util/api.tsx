import axios from 'axios';

// Utils
// Constants
import { API_METHOD_TYPE } from '../const/api';
import { API_PORT, API_URL } from '@jukejoint/common/lib/util/const';
// Actions
// Models
// Interfaces

export const apiRequest = (
  url:string,
  method:API_METHOD_TYPE = API_METHOD_TYPE.GET,
  data?:any,
  headers?: any,
  params?: any,
) => {
  return axios({
    method,
    url,
    headers,
    data,
    params
  })
}
const baseURL = process.env.NODE_ENV === 'development'
  ? `localhost:${API_PORT}`
  : `dj.mantro.services:${API_PORT}`

export const getWSURL = () => `ws://${baseURL}${API_URL.WS_CONN}`;

export const getApiURL = (endpoint:API_URL) => `http://${baseURL}${endpoint}`;