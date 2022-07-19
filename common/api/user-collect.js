import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/userCollectClient/"

export function listUserCollectAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}
export function IsLikeUserCollectAPI(params) {
  return http.get(`${resquest}` + `IsLike`, params)
}
export function createUserCollectAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}
export function deleteUserCollectAPI(params) {
  return http.delete(`${resquest}` + `deleteDD`, params)
}
export function deleteUserCollectListAPI(params) {
  return http.delete(`${resquest}` + `deleteListDD`, params)
}