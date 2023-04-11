import service from "../utils/request";
import { useHermesStore, useTESTStore,useAstraeaStore } from "@/store";
export function searchTname() {
  return service({
    url: "/tname",
    method: "get",
  });
}
export function gatherChum(data:object) {
  return service({
    url: "/chum",
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