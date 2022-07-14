import { getUserInfo } from "../../../../common/api/login"

Page({
  data: {
    name: "",
    avatar: "",
  },
  onLoad() {
    this.getUserInfo()
  },
  handleEditName() {
    dd.showToast({
      type: 'exception',
      content: '请联系管理员修改',
      duration: 1000
    })
  },
  handleEditAvatar() {
    my.chooseImage({
      count: 1,
      success: (res) => {
        img.src = res.apFilePaths[0];
      },
    });

  },


  getUserInfo() {
    let temp = {
      userId: 19
    }
    getUserInfo(temp).then((res) => {
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
  }

});
