import service from "@/utils/request";
export function detailSearch(data: string) {
  return service({
    url: "/chart/detail",
    method: "get",
      params: {
        flat:data
    }
  });
}
export function broadSearch() {
  return service({
    url: "/chart/broad",
    method:"get"
  })
}
export function rollSearch() {
  return service({
    url: "/chart/roll",
    method:"get"
  })
}
export function mapSearch() {
  return service({
    url: "/chart/map",
    method:"get"
  })
}
export function listSearch() {
  return service({
    url: "/chart/list",
    method:"get"
  })
}