import { deleteUserAddressAPI, updateUserAddressAPI, createUserAddressAPI } from '/common/api/user-address'

Page({
  data: {
    addressInfo: '',
    isEdit: false,
    receiver: '',
    phone: '',
    user: '',
    addressDetail: '',
    isDefault: false,
  },
  onLoad(query) {
    let that = this;
    let addressInfo = that.data.addressInfo;
    let receiver = that.data.receiver;
    let phone = that.data.phone;
    let user = that.data.user;
    let addressDetail = that.data.addressDetail;
    let isDefault = that.data.isDefault;
    let isEdit = that.data.isEdit;
    if (Object.keys(query) != 0) {
      isEdit = true;
      addressInfo = JSON.parse(query.item);
      console.log("addressInfo:", addressInfo)
      that.setData({
        addressInfo,
        receiver,
        phone,
        user,
        addressDetail,
        isDefault,
        isEdit
      })
    }
  },
  onSubmit(e) {
    let that = this;
    let isEdit = that.data.isEdit;
    let temp = e.detail.value
    let addressInfo = that.data.addressInfo;
    // my.alert({
    //   content: `数据：${JSON.stringify(e.detail.value)}`,
    // });
    if (isEdit) {
      addressInfo.isDefault = temp.isDefault;
      addressInfo.phone = temp.phone;
      addressInfo.receiver = temp.receiver;
      addressInfo.addressDetail = temp.addressDetail;
      updateUserAddressAPI(addressInfo).then((res) => {
        dd.navigateBack();
        dd.showToast({
          type: 'success',
          content: '修改地址成功',
          duration: 1000,
        })
      })
    } else {
      temp.userId = 19
      createUserAddressAPI(temp).then((res) => {
        dd.navigateBack();
        dd.showToast({
          type: 'success',
          content: '新建地址成功',
          duration: 1000,
        })
      })
    }
  },
  handleDelete() {
    let that = this;
    let addressInfo = that.data.addressInfo;
    dd.confirm({
      title: '温馨提示',
      content: '是否确认删除此地址',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        let temp = {
          id: addressInfo.id
        }
        if (result.confirm) {
          deleteUserAddressAPI(temp).then((res) => {
            dd.navigateBack();
            dd.showToast({
              type: 'success',
              content: '删除地址成功',
              duration: 1000,
            })
          })
        }
      },
    });
  },
  bindInputReceiver(e) {
    this.setData({
      receiver: e.detail.value
    })
  },
  bindInputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindInputUser(e) {
    this.setData({
      user: e.detail.value
    })
  },
  bindInputAddressDetail(e) {
    this.setData({
      addressDetail: e.detail.value
    })
  },
  handleClear(e) {
    let name = e.currentTarget.dataset.name;
    let that = this
    if (name == "receiver") {
      that.setData({
        receiver:''
      })
    } else if (name == "phone") {
      that.setData({
        phone: ''
      })
    } else if (name == "user") {
      that.setData({
        user: ''
      })
    } else if (name == "addressDetail") {
      that.setData({
        addressDetail: ''
      })
    }
  },
});
