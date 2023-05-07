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