import axios from "axios";
const service = axios.create({
  baseURL: "http://127.0.0.1:3008/",
  timeout: 5000,
});
service.interceptors.request.use();
service.interceptors.response.use();
export default service;