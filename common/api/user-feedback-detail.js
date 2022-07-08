import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/userFeedbackDetailClient/"

export function listUserFeedbackDetailAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}

export function createUserFeedbackDetailAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}
