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
export function banRoom(data: number,flat:string) {
  return service({
    url: "/room/ban",
    method: "post",
    data: {
      target: data,
      flat
    }
  })
}
export function addRoom(data: object) {
  return service({
    url: "/room/add",
    method: "post",
    data
  })
}
export function useRoom(data: number,flat:string) {
  return service({
    url: "/room/use",
    method: "post",
    data: {
      rid:data,flat
    }
  })
}
export function pushFloor(flat:string,width: number) {
  return service({
    url: "/floor/push",
    method: "post",
    data: {
      flat,
      width
    }
  })
}
export function banFloor(flat: string, floor: number) {
  return service({
    url: "/floor/ban",
    method: "post",
    data: {
      flat,
      floor
    }
  })
}
export function extendFloor(flat: string, floor: number) {
  return service({
    url: "/floor/extend",
    method: "post",
    data: {
      flat,
      floor
    }
  })
}
export function reduceFloor(flat: string, floor: number,target:number) {
  return service({
    url: "/floor/reduce",
    method: "post",
    data: {
      flat,
      floor,
      target
    }
  })
}
export function useFloor(flat:string,floor:number) {
  return service({
    url: "/floor/use",
    method: "post",
    data: {
      floor,
      flat
    }
  })
}
type ChangeRoomForm = {
  rid: number;
  useBed: number;
  tolBed: number;
  tid: number;
};
export function editRoom(data:ChangeRoomForm) {
  return service({
    url: "/floor/edit",
    method: "post",
    data: data
  })
}
export function searchFlat(tid?:number|null,tname?:string|null) {
  return service({
    url: "/flat",
    method: "get",
    params: {
      tid,
      tname
    }
  })
}
export function addFlat(data: object) {
  return service({
    url: "/flat/add",
    method: "post",
    data:data
  })
}
// export function searchFloors(data:string) {
//   return service({
//     url: "/admin/floor/search",
//     method: "get",
//     params: {
//       targetFlat:data
//     }
//   })
// }
export function chumLeave(target: number) {
  return service({
    url: "/chum/leave",
    method: "post",
    data: {
      target
    }
  })
}
export function chumBack(target: number) {
  return service({
    url: "/chum/back",
    method: "post",
    data: {
      target
    }
  })
}
export function gatherRoomByFloor(flat: string, floor: string) {
  return service({
    url: "/room/gather",
    method: "get",
    params: {
      flat,floor
    }
  })
}
export function gatherBedByRoom(flat: string, rid: string) {
  return service({
    url: "/bed/gather",
    method: "get",
    params: {
      flat,rid
    }
  })
}
export function changeOrder(sid:number,data:object) {
  return service({
    url: "/order/change",
    method: "post",
    data: {
      sid,...data
    }
    })
}
export function chumRuin(target: number) {
  return service({
    url: "/chum/ruin",
    method: "post",
    data: {
      target
    }
  })
}
export function orderUser() {
    return service({
        url: "/order/user",
        method:'get'
    })
}
export function deleteUser(target:number) {
  return service({
    url: "/user/delete",
    method: 'post',
    data: {
      target
    }
  })
}
export function linkUser(target:number) {
  return service({
    url:"/user/link",
    method:'get',
    params:{target:target}
  });
}