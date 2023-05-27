import axios,{ AxiosRequestConfig,InternalAxiosRequestConfig } from "axios";
import qs from 'qs'
import { useZeusStore } from "../store";
const service = axios.create({
  baseURL: "http://127.0.0.1:3008/",
  timeout: 5000,
});
interface OmegaAxiosRequestConfig<T = any> extends InternalAxiosRequestConfig {
  toSerialize?: boolean;
}
service.interceptors.request.use((config:OmegaAxiosRequestConfig<any>) => {
  const Zeus = useZeusStore()
  config.headers = config.headers || {Authorization:""}
  config.headers.Authorization = Zeus.token
  if (config.method === 'post') {
    if (config.headers['Content-Type'] !== 'multipart/form-data') {
      config.data ={
        uid: Zeus.uid,
        ...config.data,
      }
       config.data=qs.stringify(config.data)
    } else {
      config.data.append("uid", Zeus.uid);
    }
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