import { listUserReminderAPI, updateUserReminderAPI, deleteUserReminderListAPI, deleteUserReminderAPI } from "../../common/api/message";
import { listAnnouncementAPI } from "../../common/api/announcement";

Page({
  data: {
    reminderList: [],
    announcementList: [],
  },
  onLoad() {
    this.handleGetReminder();
    this.handleGetAnnouncement();
  },
  handleGetReminder() {
    let temp = {
      userId: 19
    }
    listUserReminderAPI(temp).then((res) => {
      let that = this;
      let reminderList = that.data.reminderList;
      reminderList = res.data.data;
      that.setData({
        reminderList
      })
    })
  },
  handleGetAnnouncement() {
    listAnnouncementAPI().then((res) => {
      let that = this;
      let announcementList = that.data.announcementList;
      announcementList = res.data.data;
      that.setData({
        announcementList
      })
    })
  },
  handleClear() {
    let reminderList = this.data.reminderList;
    dd.confirm({
      title: '温馨提示',
      content: '是否清理所有提醒',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          deleteUserReminderListAPI(reminderList).then((res) => {
            dd.alert({
              content: "清理提醒成功"
            });
            this.handleGetReminder();
          })
        }
      },
    });
  },
  handleDelete() {
    dd.confirm({
      title: '温馨提示',
      content: '是否删除此提醒',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          deleteUserReminderAPI(reminderList).then((res) => {
            dd.alert({
              content: "清理提醒成功"
            });
            this.handleGetReminder();
          })
        }
      },
    });
  },
  handleUpdate(e) {
    let index = e.currentTarget.dataset.index;
    let temp = {
      id: index
    }
    updateUserReminderAPI(temp).then((res) => {
      // dd.navigateTo({
      //   url: '/pages/message/feedback_message/feedback_message'
      // })
      this.handleGetReminder();
    })
  },

  handleToOrdersReminders() {
    dd.navigateTo({
      url: '/pages/message/order_message/order_message'
    })
  },
  handleToFeedbackReminders() {
    dd.navigateTo({
      url: '/pages/message/feedback_message/feedback_message'
    })
  },
  handleToAnnouncement() {
    dd.navigateTo({
      url: '/pages/message/announcement_message/announcement_message'
    })
  },
  handleToOrders(e) {
    this.handleUpdate(e)
    dd.navigateTo({
      url: '/pages/mine/orders/orders'
    })
  },
  handleToFeedback(e) {
    this.handleUpdate(e)
    dd.navigateTo({
      url: '/pages/mine/services/feedback/feedback'
    })
  }
});
