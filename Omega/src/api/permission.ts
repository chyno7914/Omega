import service from "../utils/request";
import { useHermesStore, useTESTStore,useAstraeaStore } from "@/store";
export function permissionConfirm() {
  const Hermes = useHermesStore()
  return service({
    url: "/permission",
    method: "get",
  });
}