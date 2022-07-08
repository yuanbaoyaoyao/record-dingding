
let usertoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTcyNjk2NTAsInVzZXJuYW1lIjoiMSJ9.e9dArlcM16sA6Ng9h4YmtMvn4OUg_0hZ9yW5wNdqgxw";
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
          Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
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
          Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
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
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        headers: {
          "Content-Type": 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + dd.getStorage({ key: 'usertoken' })
        },
        url: url,
        method: 'DELETE',
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
  }
}

export default http