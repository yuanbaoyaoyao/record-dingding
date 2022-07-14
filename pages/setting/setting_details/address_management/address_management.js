import { listUserAddressAPI } from "/common/api/user-address"

Page({
  data: {
    addressInfo: []
  },
  onLoad() {
    // this.handleGetAddress()
  },
  onShow() {
    this.handleGetAddress()
  },
  handleGetAddress() {
    let temp = {
      userId: 19
    }
    listUserAddressAPI(temp).then((res) => {
      console.log("resssssssssss:", res.data.data);
      let that = this;
      let addressInfo = that.data.addressInfo;
      addressInfo = res.data.data;
      that.setData({
        addressInfo
      })
    })
  },
  handleToAddressDetail() {
    dd.navigateTo({
      url: '/pages/setting/setting_details/address_management/address_management_detail/address_management_detail'
    })
  },
  handleToAddressDetailWithParam(e) {
    // let item = e.currentTarget.dataset.item;
    let item = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item));
    console.log("itemmmmmmmmm:", item)
    dd.navigateTo({
      url: '/pages/setting/setting_details/address_management/address_management_detail/address_management_detail?item=' + item
    })
  }
});
