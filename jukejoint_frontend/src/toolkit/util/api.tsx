import axios from 'axios';

// Utils
// Constants
import { API_METHOD_TYPE } from '../const/api';
// Actions
// Models
// Interfaces

export const apiRequest = (
  url:string,
  method:API_METHOD_TYPE = API_METHOD_TYPE.GET,
  data?:any) => {
  return axios({
    method,
    url,
  })
}