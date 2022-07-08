import http from "../utils/http";
import { debugSearchIp } from "../constant/url_constant";

let resquest = debugSearchIp + "/esProduct/"

export function elasticsearchAPI(params) {
  return http.get(`${resquest}` + `search`, params)
}