import http from "../utils/http";
import { debugClientIp } from "../constant/url_constant";

let resquest = debugClientIp + "/announcementClient/"

export function listAnnouncementAPI() {
  return http.get(`${resquest}` + `list`)
}