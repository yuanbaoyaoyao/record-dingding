import http from "../utils/http";
import { debugAdminIp } from "../constant/url_constant";


let resquest = debugAdminIp + "/upload/"

export function getToken(params) {
  return http.get(`${resquest}` + 'qiniu/policy', params)
}