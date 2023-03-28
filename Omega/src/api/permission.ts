import service from "../utils/request";
import qs from 'qs'
import { useHorkesStore } from "../store";
import store from "../store/pinia"

export function permissionConfirm() {
  const Horkes = useHorkesStore()
  return service({
    url: "/token",
    method: "post",
    headers: {
        Authorization:Horkes.token
    },
  });
}