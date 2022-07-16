import { listUserFeedbackAPI } from '/common/api/user-feedback'

Page({
  data: {
    feedbackList: []
  },
  onShow() {
    this.getFeedbackList();
  },
  getFeedbackList() {
    let that = this;
    let feedbackList = that.data.feedbackList;
    let temp = {
      userId: 19
    };
    listUserFeedbackAPI(temp).then((res) => {
      feedbackList = res.data.data.records;
      that.setData({
        feedbackList
      })
    })
  },
  handleToFeedbackDetail() {
    dd.navigateTo({
      url: '/pages/mine/services/feedback/feedback_detail/feedback_detail'
    })
  },
  handleToFeedbackDetailWithParam(e) {
    // let item = e.currentTarget.dataset.item;
    let item = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item));
    dd.navigateTo({
      url: '/pages/mine/services/feedback/feedback_detail/feedback_detail?item=' + item
    })
  }
});
