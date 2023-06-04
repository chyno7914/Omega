import service from "@/utils/request";
import { useZeusStore } from "@/store";
export function pushSubmit(data: object,status?:string) {
  return service({
    url: "/apply/push",
    method: "post",
    data:{...data,status}
  });
}
export function searchSubmit(searchStatus: string[], searchType: string[], tid?: number) {
    console.log(searchType);
    return service({
    url: "/apply/search",
    method: "get",
    params: {
            tid:tid??null,searchStatus,searchType
    }
  });
}
export function continueSubmit(applId:number|string) {
    return service({
        url: "/apply/continue",
        method: "get",
        params: {
            applId
        }
    })
}
export function continueTokenCheck(applId:number|string,uid:number) {
    return service({
        url: "/apply/permission",
        method: "get",
        params: {
            applId,uid
        }
    })
}
export function deleteSubmit(applId:number|string) {
    return service({
        url: "/apply/delete",
        method: "post",
        data: {
            applId
        }
    })
}
export function gatherAttribution() {
    return service({
        url: "/apply/attribution",
        method:"get"
    })
}
export function gatherDetail(target:number) {
    return service({
        url: "/apply/detail",
        method: "get",
        params: {
            target
        }
    })
}
export function acceptRepair(target: number) {
    return service({
        url: "/apply/accept/repair",
        method: "post",
        data: {
            target
        }
    })
}
export function submitRevocation(target: number,antistop:string) {
    return service({
        url: "/apply/revocation",
        method: "post",
        data: {
            target,antistop
        }
    })
}
export function acceptLeave(target: number) {
    return service({
        url: "/apply/accept/leave",
        method: "post",
        data: {
            target
        }
    })
}
export function acceptComing(target: number) {
    return service({
        url: "/apply/accept/homecoming",
        method: "post",
        data: {
            target
        }
    })
}
