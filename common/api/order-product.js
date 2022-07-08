import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";

let resquest = debugClientIp + "/orderProductClient/"

export function listOrderProductAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}
export function createOrderProductAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}
// export function deleteOrderProductAPI(params){
//     return http.delete(`${resquest}`+`delete`,params)
// }
// export function updateOrderProductAPI(params){
//     return http.put(`${resquest}`+`update`,params)
// }
