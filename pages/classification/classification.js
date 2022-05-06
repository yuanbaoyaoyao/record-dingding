Page({
  data: {
    contentHeaderHeight: 0,
    navlist: [
      {
        "text": "这是导航",
        "class": "classification-nav-detail-active"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
      {
        "text": "这是导航",
        "class": "classification-nav-item-detail"
      },
    ]
  },
  onLoad() {
    dd.createSelectorQuery().select('#classification-content-header').boundingClientRect().exec((ret) => {
      this.setData({
        contentHeaderHeight: ret[0].height
      })
    })
  },
  handlenavtap(e) {
    console.log("eeeeeeee:", e)
    dd.showToast({
      content: `第${e.currentTarget.dataset.index}个Item`,
      success: (res) => {

      },
    });
  }
});
