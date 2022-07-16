import { updateUserFeedbackFinishedAPI } from '/common/api/user-feedback'
import { debugAdminIp } from '/common/constant/url_constant';
import { listUserFeedbackDetailAPI, createUserFeedbackDetailAPI } from '/common/api/user-feedback-detail';

Page({
  data: {
    feedbackContent: '',
    feedbackTitle: '',
    feedbackPicUrl: '',
    feedbackSendMessage: '',
    isFinished: false,
    isEdit: false,
    id: 0,
    chatContent: [],
  },
  onLoad(query) {
    let that = this;
    if (Object.keys(query) != 0) {
      let info = JSON.parse(query.item);
      let feedbackContent = that.data.feedbackContent;
      let feedbackTitle = that.data.feedbackTitle;
      let feedbackPicUrl = that.data.feedbackPicUrl;
      let isFinished = that.data.isFinished;
      let isEdit = that.data.isEdit;
      let id = that.data.id;
      feedbackContent = info.feedbackContent;
      feedbackTitle = info.feedbackTitle;
      feedbackPicUrl = info.feedbackPicUrl;
      isFinished = info.isFinished;
      id = info.id;
      isEdit = true;
      that.setData({
        feedbackContent,
        feedbackTitle,
        feedbackPicUrl,
        isFinished,
        isEdit,
        id
      })
      that.handleGetUserFeedbackDetail();
    }
  },
  handleUpdate() {
    my.chooseImage({
      count: 1,
      success: (res) => {
        img.src = res.apFilePaths[0];
      },
    });

  },
  handleClear(e) {
    let name = e.currentTarget.dataset.name;
    let that = this
    if (name == "feedbackTitle") {
      that.setData({
        feedbackTitle: ''
      })
    } else if (name == "feedbackContent") {
      that.setData({
        feedbackContent: ''
      })
    } else if (name == "feedbackSendMessage") {
      that.setData({
        feedbackSendMessage: ''
      })
    }
  },
  bindInputFeedbackTitle(e) {
    this.setData({
      feedbackTitle: e.detail.value
    })
  },
  bindInputFeedbackContent(e) {
    this.setData({
      feedbackContent: e.detail.value
    })
  },
  bindInputFeedbackSendMessage(e) {
    this.setData({
      feedbackSendMessage: e.detail.value
    })
  },
  handleClose() {
    dd.confirm({
      title: '温馨提示',
      content: '是否确认结束反馈',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let that = this;
          let id = that.data.id;
          let temp = {
            id: id
          }
          updateUserFeedbackFinishedAPI(temp).then((res) => {
            dd.navigateBack();
            dd.showToast({
              type: 'success',
              content: '关闭反馈成功',
              duration: 1000,
            })
          })
        }
      },
    });
  },
  handleGetUserFeedbackDetail() {
    let that = this;
    let id = that.data.id;
    let chatContent = that.data.chatContent;
    let temp = {
      userFeedbackId: id
    }
    listUserFeedbackDetailAPI(temp).then((res) => {
      console.log("resssssssss:", res.data.data)
      chatContent = res.data.data;
      that.setData({
        chatContent,
      })
    })
  },
  handleSendMessage() {
    let that = this;
    let feedbackSendMessage = that.data.feedbackSendMessage;
    let id = that.data.id;
    let temp = {
      content: feedbackSendMessage,
      userFeedbackId: id
    }
    createUserFeedbackDetailAPI(temp).then((res) => {
      dd.showToast({
        type: 'success',
        content: '发送消息成功',
        duration: 1000,
      })
      that.handleGetUserFeedbackDetail();
    })
  }
});
