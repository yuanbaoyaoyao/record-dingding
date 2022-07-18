import { getUserInfo } from "../../common/api/login";

Page({
  data: {
    name: "",
    avatar: "",
  },
  onLoad() {
    this.getUserInfo()
  },
  handleEditSetting() {
    dd.navigateTo({
      url: '/pages/setting/setting_details/user_info/user_info'
    })
  },
  handleReturns() {
    dd.showToast({
      type: 'exception',
      content: '请联系管理员退换货',
      duration: 1000
    })
  },
  getUserInfo() {
    let temp = {
      userId: 19
    }
    getUserInfo(temp).then((res) => {
      console.log("resssssssss:", res)
      let that = this;
      let name = that.data.name;
      let avatar = that.data.avatar;
      name = res.data.data.name;
      avatar = res.data.data.avatar;
      that.setData({
        name,
        avatar
      })
    })
  },
  handleToCollections() {
    dd.navigateTo({
      url: '/pages/mine/services/collections/collections'
    })
  },
  handleToFeedback() {
    dd.navigateTo({
      url: '/pages/mine/services/feedback/feedback'
    })
  },
  handleToApplications() {
    dd.navigateTo({
      url: '/pages/mine/services/applications/applications'
    })
  },
  handleToOrders(e) {
    let index = e.currentTarget.dataset.index
    dd.navigateTo({
      url: '/pages/mine/orders/orders?index=' + index
    })
  },
  handleToSettings() {
    dd.navigateTo({
      url: '/pages/setting/setting'

    })
  },
});
