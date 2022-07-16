Page({
  data: {},
  onLoad() { },
  handleToUserInfo() {
    dd.navigateTo({
      url: '/pages/setting/setting_details/user_info/user_info'
    })
  },
  handleToAddressManagement() {
    dd.navigateTo({
      url: '/pages/setting/setting_details/address_management/address_management'
    })
  },
  handleToPasswordManagement() {
    dd.navigateTo({
      url: '/pages/setting/setting_details/password_management/password_management'
    })
  },
  handleToAboutMe() {
    dd.navigateTo({
      url: '/pages/setting/setting_details/about_me/about_me'
    })
  },
  handleLogOut() {
    dd.confirm({
      title: '温馨提示',
      content: '是否退出登录',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          // deleteUserReminderAPI(reminderList).then((res) => {
            dd.alert({
              content: "已退出登录"
            });
          //   this.handleGetReminder();
          // })
        }
      },
    });
  },
});
