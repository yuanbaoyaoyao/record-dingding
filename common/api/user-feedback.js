import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/userFeedbackClient/"

export function listUserFeedbackAPI(params) {
  return http.get(`${resquest}` + `list`, params)
}

export function createUserFeedbackAPI(params) {
  return http.post(`${resquest}` + `create`, params)
}

export function updateUserFeedbackFinishedAPI(params) {
  return http.put(`${resquest}` + `updateFinished`, params)
}
