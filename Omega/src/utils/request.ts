import axios from "axios";
import qs from 'qs'
import { useZeusStore } from "../store";
const service = axios.create({
  baseURL: "http://127.0.0.1:3008/",
  timeout: 5000,
});
service.interceptors.request.use((config) => {
  const Zeus = useZeusStore()
  config.headers.Authorization = Zeus.token
  if(config.method==='post'){
    config.data = qs.stringify({
      uid: Zeus.uid,
      ...config.data
    })
  }else if(config.method==='get'){
    config.params={
      uid: Zeus.uid,
      ...config.params
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
});
service.interceptors.response.use();
export default service;