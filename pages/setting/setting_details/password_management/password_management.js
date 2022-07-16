import { deleteUserAddressAPI, updateUserAddressAPI, createUserAddressAPI } from '/common/api/user-address'
import { getEmailCode, forget } from '/common/api/register'


Page({
  data: {
    isEdit: false,
    email: '',
    code: '',
    password: '',
    rePassword: '',
    isSendingEmail: false,
    count: 60,
  },
  onLoad() { },
  onSubmit(e) {
    let that = this;
    // my.alert({
    //   content: `数据：${JSON.stringify(e.detail.value)}`,
    // });

    forget(e.detail.value).then((res) => {
      dd.navigateBack();
      dd.showToast({
        type: 'success',
        content: '修改密码成功',
        duration: 2000,
      })
    })
  },
  bindInputEmail(e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindInputCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindInputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindInputRePassword(e) {
    this.setData({
      rePassword: e.detail.value
    })
  },
  handleClear(e) {
    let name = e.currentTarget.dataset.name;
    let that = this
    if (name == "email") {
      that.setData({
        email: ''
      })
    } else if (name == "code") {
      that.setData({
        code: ''
      })
    } else if (name == "password") {
      that.setData({
        password: ''
      })
    } else if (name == "rePassword") {
      that.setData({
        rePassword: ''
      })
    }
  },
  handleSendEmail() {
    let that = this;
    let count = that.data.count;
    let isSendingEmail = that.data.isSendingEmail;
    let email = that.data.email;
    let check = '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$';
    if (!email.match(check) && email != "") {
      dd.alert({
        content: "请输入正确邮箱格式"
      })
    } else {
      getEmailCode(email).then((res) => {
        dd.showToast({
          type: 'success',
          content: '发送验证码成功',
          duration: 1000,
        })
        isSendingEmail = true;
        that.setData({
          isSendingEmail
        })
        setInterval(function () {
          count--;
          that.setData({
            count
          })
          if (count == 0) {
            count = 60;
            isSendingEmail = false;
            that.setData({
              isSendingEmail,
              count
            })
          }
        }, 1000);
      })
    }
  },

});
