
let usertoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTgwNDU1MTMsInVzZXJuYW1lIjoiMSJ9.PRkGMGwPR67QIbyK4xg_LQnTvgPlA-VmC_Vy-KNZTIk"
const http = {
  get(url, data) {
    dd.showLoading();
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
          // Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
          Authorization: 'Bearer ' + usertoken
        },
        url: url,
        method: 'GET',
        // data: JSON.stringify(data),
        data: data,
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)

        },
        complete: (res) => {
          dd.hideLoading()
        }
      })
    })
  },
  post(url, data) {
    dd.showLoading();
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": 'application/json;charset=utf-8',
          // Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
          Authorization: 'Bearer ' + usertoken
        },
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)

        },
        complete: (res) => {
          dd.hideLoading()
        }
      })
    })
  },
  put(url, data) {
    dd.showLoading();
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": 'application/json;charset=utf-8',
          // Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
          Authorization: 'Bearer ' + usertoken

        },
        url: url,
        method: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)

        },
        complete: (res) => {
          dd.hideLoading()
        }
      })
    })
  },
  delete(url, data) {
    dd.showLoading();
    console.log("delete data:", data)
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": 'application/json;charset=utf-8',
          // Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
          Authorization: 'Bearer ' + usertoken
        },
        url: url,
        //似乎不支持delete
        method: 'POST',
        data: JSON.stringify(data),
        // data:data,
        dataType: 'json',
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)

        },
        complete: (res) => {
          dd.hideLoading()
        }
      })
    })
  }
}

export default http