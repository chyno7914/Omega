import service from "@/utils/request";
export function login(data: object) {
  return service({
    url: "/api/login",
    method: "post",
    data:data
  });
}
export function register(data:object) {
  return service({
    url: "/api/register",
    method: "post",
    data:data
  })
}
export function census(data:object){
  return service({
    url: "/census",
    method: "post",
    data:data
  })
}
export function portrait(data: FormData) {
  return service({
    url: "/portrait",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}