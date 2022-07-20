import { listUserAddressAPI } from '/common/api/user-address'
import { createUserOrderAPI } from '/common/api/user-order';
import { createOrderProductAPI } from '/common/api/order-product';
import { deleteCartListAPI } from '/common/api/cart'

Page({
  data: {
    defaultAddress: '',
    receiver: '',
    user: '',
    phone: '',
    isDefault: false,
    objectArray: [],
    arrIndex: 0,
    remarks: '',
    isInputRemark: false,
    consumableInfo: [],
    addressId: 0,
    countAll: 0,
    orderId: 0,
    orderSn: 0,
  },
  onLoad(query) {
    let that = this;
    let consumableInfo = that.data.consumableInfo;
    let countAll = that.data.countAll;
    consumableInfo = []
    let addressId = that.data.addressId;
    console.log("JSON.parse(query.info).consumables:", JSON.parse(query.info).consumables)
    for (let i = 0; i < JSON.parse(query.info).consumables.length; i++) {
      let temp = {
        productName: JSON.parse(query.info).consumables[i].productName,
        title: JSON.parse(query.info).consumables[i].title,
        avatar: JSON.parse(query.info).consumables[i].avatar,
        number: JSON.parse(query.info).countList[i],
        productId: JSON.parse(query.info).consumables[i].productId,
        productSkusId: JSON.parse(query.info).consumables[i].productSkusId,
        id: JSON.parse(query.info).consumables[i].id
      }
      countAll += temp.number;
      consumableInfo.push(temp)
    }
    that.setData({
      consumableInfo,
      addressId,
      countAll
    })
    this.handleGetAddress()
  },
  handleGetAddress() {
    let that = this;
    let defaultAddress = that.data.defaultAddress;
    let objectArray = that.data.objectArray;
    let isDefault = that.data.isDefault;
    let receiver = that.data.receiver;
    let phone = that.data.phone;
    let user = that.data.user;
    let addressId = that.data.addressId;
    let temp = {
      userId: 19
    }
    listUserAddressAPI(temp).then((res) => {
      let index = 0;
      for (let data of res.data.data) {
        let temp = {
          id: index++,
          name: data.addressDetail,
          isDefault: false,
          receiver: data.receiver,
          phone: data.phone,
        }
        if (addressId == 0) {
          if (data.isDefault) {
            addressId = data.id;
            defaultAddress = data.addressDetail;
            temp.isDefault = true;
            isDefault = true;
            receiver = data.receiver;
            phone = data.phone;
            user = data.user;
            if (defaultAddress.length > 10) {
              defaultAddress = defaultAddress.substring(0, 10)
            }
          }
        }
        else {
          if (data.id == addressId) {
            defaultAddress = data.addressDetail;
            if (data.isDefault) {
              temp.isDefault = true;
              isDefault = true;
            }
            receiver = data.receiver;
            phone = data.phone;
            user.data.user;
            if (defaultAddress.length > 10) {
              defaultAddress = defaultAddress.substring(0, 10)
            }
          }
        }
        objectArray.push(temp);
      }
      that.setData({
        addressId,
        defaultAddress,
        objectArray,
        isDefault,
        receiver,
        phone,
        user
      })
    })
  },
  bindObjPickerChange(e) {
    let that = this;
    let addressId = that.data.addressId;
    let defaultAddress = that.data.defaultAddress;
    let isDefault = that.data.isDefault;
    let receiver = that.data.receiver;
    let phone = that.data.phone;
    let user = that.data.user;
    console.log("that.data.objectArray[e.detail.value]:", that.data.objectArray[e.detail.value]);
    defaultAddress = that.data.objectArray[e.detail.value].name
    receiver = that.data.objectArray[e.detail.value].receiver
    phone = that.data.objectArray[e.detail.value].phone
    addressId = that.data.objectArray[e.detail.value].id;
    user = that.data.objectArray[e.detail.value].user;
    if (that.data.objectArray[e.detail.value.isDefault]) {
      isDefault = true;
    } else {
      isDefault = false;
    }
    that.setData({
      arrIndex: e.detail.value,
      defaultAddress,
      isDefault,
      receiver,
      phone,
      addressId,
      user
    });
  },
  handleInputRemarks() {
    let that = this;
    let isInputRemark = that.data.isInputRemark;
    isInputRemark = true;
    that.setData({
      isInputRemark
    })
  },
  bindInputRemarks(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  handleFinishedRemarks() {
    let that = this;
    let isInputRemark = that.data.isInputRemark;
    isInputRemark = false;
    that.setData({
      isInputRemark
    })
  },
  handleCreateOrder() {
    let that = this;
    let addressId = that.data.addressId;
    let receiver = that.data.receiver;
    let user = that.data.user;
    let defaultAddress = that.data.defaultAddress;
    let remarks = that.data.remarks;
    let orderId = that.data.orderId;
    let orderSn = that.data.orderSn;
    let temp = {
      userId: 19,
      userAddressId: addressId,
      receiver: receiver,
      user: user,
      addressDetail: defaultAddress,
      orderRemarks: remarks
    }
    createUserOrderAPI(temp).then((res) => {
      if (res.data.code == 200) {
        orderId = res.data.data.id;
        orderSn = res.data.data.orderSn;
        that.setData({
          orderId,
          orderSn
        })
        this.handleCreateOrderProducts();
      }
    })
  },
  handleCreateOrderProducts() {
    let that = this;
    let orderId = that.data.orderId;
    let orderSn = that.data.orderSn;
    let consumableInfo = that.data.consumableInfo;
    for (var data of consumableInfo) {
      let temp = {
        userOrderId: orderId,
        orderSn: orderSn,
        productId: data.productId,
        productSkusId: data.productSkusId,
        productTitle: data.productName,
        productSkusTitle: data.title,
        number: data.number,
        productPicUrl: data.avatar
      }
      createOrderProductAPI(temp).then((res) => {
        if (res.data.code == 200) {
          this.handleDeleteCartList()
        }
      })
    }
  },
  // 判断一下是否是从cart传过来的
  handleDeleteCartList() {
    let that = this;
    let consumableInfo = that.data.consumableInfo;
    deleteCartListAPI(consumableInfo).then((res) => {
      if (res.data.code == 200) {
        dd.navigateTo({
          url: '/pages/mine/orders/orders'
        })
      }
    })
  }
});
