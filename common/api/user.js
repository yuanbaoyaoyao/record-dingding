import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";


let resquest = debugClientIp + "/client/user/"

export function updateUserAvatarAPI(params) {
  return http.put(`${resquest}` + `updateAvatar`, params)
}
