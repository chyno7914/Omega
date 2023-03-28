import service from "../utils/request";
import qs from 'qs'
export function login(data:object) {
  return service({
    url: "api/login",
    method: "post",
    data:qs.stringify(data)
  });
}
export function register(data:object) {
  return service({
    url: "api/register",
    method: "post",
    data:qs.stringify(data)
  });
}
