import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/productSkusClient/"

export function listProductSkusSearchIPageAPI(params) {
  return http.get(`${resquest}` + `listSearchIPage`, params)
}
export function listProductSkusSearchAPI(params) {
  return http.get(`${resquest}` + `listSearch`, params)
}
export function listProductSkusLimitAPI(params) {
  return http.get(`${resquest}` + `listLimit`, params)
}
export function listProductSkusLimitByNumberAPI(params) {
  return http.get(`${resquest}` + `listLimitByNumber`, params)
}
export function updateProductSkusAPI(params) {
  return http.put(`${resquest}` + `update`, params)
}
export function listProductSkusByTypeIPageAPI(params) {
  return http.get(`${resquest}` + `listByTypeIPage`, params)
}
export function listCountByProductIdAndTypeIPageAPI(params) {
  return http.get(`${resquest}` + `listCountByProductIdAndTypeIPage`, params)
}
