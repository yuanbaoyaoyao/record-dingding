import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";

let resquest = debugClientIp + "cartClient/"

export function listCartAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}
export function listCartCheckedAPI(params) {
  return http.get(`${resquest}` + `listChecked`, params)
}
export function listOneCartAPI(params) {
  return http.get(`${resquest}` + `listOne`, params)
}
export function createCartAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}
export function updateCartAPI(params) {
  return http.put(`${resquest}` + `update`, params)
}
export function updateCartListAPI(params) {
  return http.put(`${resquest}` + `updateList`, params)
}
export function updateCartCheckedDefaultAPI(params) {
  return http.put(`${resquest}` + `updateCheckedDefault`, params)
}
export function deleteCartAPI(params) {
  return http.delete(`${resquest}` + `delete`, params)
}