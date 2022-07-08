import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";

let resquest = debugClientIp + "/userOrderClient/"

export function listUserOrderIPageAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}
export function createUserOrderAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}
export function deleteUserOrderAPI(params) {
  return http.delete(`${resquest}` + `delete`, params)
}
export function updateUserOrderAPI(params) {
  return http.put(`${resquest}` + `update`, params)
}
