import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/client/userAddress/"

export function listUserAddressAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}
export function listOneUserAddressAPI(params) {
  return http.get(`${resquest}` + `listOne`, params)
}
export function createUserAddressAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}
export function deleteUserAddressAPI(params) {
  return http.delete(`${resquest}` + `deleteDD`, params)
}
export function updateUserAddressAPI(params) {
  return http.put(`${resquest}` + `update`, params)
}
