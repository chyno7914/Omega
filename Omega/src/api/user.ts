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
  console.log(data.getAll("omega_protrait"));
  return service({
    url: "/portrait",
    method: "post",
    data:data,
    headers: {
      "Content-Type": "multipart/form-data"
    },
  })
}
export function cureUser(){
  return service({
    url: "/user/cure",
    method: "get",
  })
}
export function setUsername(alternative: string) {
  return service({
    url: "/user/username/set",
    method: "post",
    data: {
      alternative
    }
  })
}
export function setTelephone(alternative:string) {
  return service({
    url: "/user/telephone/set",
    method: "post",
    data: {
      alternative
    }
  })
}
export function setPassword(oldPassword: string, newPassword:string) {
  return service({
    url: "/user/password/set",
    method: "post",
    data: {
      oldPassword,newPassword
    }
  })
}
export function studentenausweis() {
  
}