import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/productClient/"

export function listProductAllAPI(params) {
  return http.get(`${resquest}` + `listAll`, params)
}
// export function createProductAPI(params){
//     return http.post(`${resquest}`+`create`,params)
// }
// export function deleteProductAPI(params){
//     return http.delete(`${resquest}`+`delete`,params)
// }
// export function updateProductAPI(params){
//     return http.post(`${resquest}`+`update`,params)
// }