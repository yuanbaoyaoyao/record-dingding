import { listUserReminderAPI, updateUserReminderAPI, deleteUserReminderListAPI, deleteUserReminderAPI } from "../../../common/api/message";

Page({
  data: {
    reminderList: [],
  },
  onLoad() {
    this.handleGetReminder();
  },
  handleGetReminder() {
    let temp = {
      userId: 19
    }
    listUserReminderAPI(temp).then((res) => {
      let that = this;
      let reminderList = that.data.reminderList;
      for(var data of res.data.data){
        if(data.orderProductId!=null){
          reminderList.push(data);
        }
      }
      console.log("reminderList:",reminderList)
      that.setData({
        reminderList
      })
    })
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
  handleToOrders(e) {
    this.handleUpdate(e)
    dd.navigateTo({
      url: '/pages/mine/orders/orders'
    })
  },
  handleClear() {
    let reminderList = this.data.reminderList;
    dd.confirm({
      title: '温馨提示',
      content: '是否清理所有订单提醒',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          deleteUserReminderListAPI(reminderList).then((res) => {
            dd.alert({
              content: "清理订单提醒成功"
            });
            this.handleGetReminder();
          })
        }
      },
    });
  },
});
