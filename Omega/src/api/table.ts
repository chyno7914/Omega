import service from "../utils/request";
import { useHermesStore, useTESTStore,useAstraeaStore } from "@/store";
export function searchTname() {
  return service({
    url: "/tname",
    method: "get",
  });
}
export function searchCeiling(data:string|null) {
  return service({
    url: "/ceiling",
    method: "get",
    params: {
      flat:data
    }
  });
}
export function gatherChum(data:object) {
  return service({
    url: "/chum",
    method: "get",
    params:data
  });
}
export function gatherRoom(data:object) {
  return service({
    url: "/room",
    method: "get",
    params:data
  });
}
export function estimate(data: string) {
    return service({
        url: "/estimate",
        method: "get",
        params: {
            librakey:data
    }
  });
}
export function deleteChum(data: string | number) {
  return service({
    url: "/chum/delete",
    method: "post",
    data: {
      sid:data
    }
  })
}
export function searchFloors(data:string) {
  return service({
    url: "/admin/floor/search",
    method: "get",
    params: {
      targetFlat:data
    }
  })
}
export function banRoom(data: number) {
  return service({
    url: "room/ban",
    method: "post",
    data: {
      rid:data
    }
  })
}