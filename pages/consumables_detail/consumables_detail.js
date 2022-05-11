Page({
  data: {
    detailHeaderHeight: 0,
    detailHeaderButtons: [
      {
        "text": "耗材",
        "class": "detail-header-button-active"
      },
      {
        "text": "评价",
        "class": "detail-header-button"
      },
      {
        "text": "详情",
        "class": "detail-header-button"
      },
    ],
    consumablesHeight: 0,
    evaluationHeight: 0,
    infoHeight: 0,
    lastindex: 0,
    headerTransparent: 0
  },
  onLoad() {
    let that = this
    dd.createSelectorQuery()
      .select('#detail-header').boundingClientRect()
      .select('#detail-image').boundingClientRect()
      .select('#detail-evaluate').boundingClientRect()
      .select('#detail-info').boundingClientRect().exec((ret) => {
        that.setData({
          detailHeaderHeight: ret[0].bottom,
          consumablesHeight: ret[1].top,
          evaluationHeight: ret[2].top,
          infoHeight: ret[3].top
        })
      })
  },
  handleScrollToConsumables() {
    let that = this
    dd.pageScrollTo({
      scrollTop: that.data.consumablesHeight
    })
  },
  handleScrollToEvaluation() {
    let that = this
    dd.pageScrollTo({
      scrollTop: that.data.evaluationHeight
    })
  },
  handleScrollToInfo() {
    let that = this
    dd.pageScrollTo({
      scrollTop: that.data.infoHeight
    })
  },
  handleChangeDetailHeaderButtonClass(index) {
    let changeclass = 'detailHeaderButtons[' + index + '].class'
    let clearlastclass = 'detailHeaderButtons[' + this.data.lastindex + '].class'
    if (changeclass != clearlastclass) {
      this.setData({
        [changeclass]: 'detail-header-button-active',
        [clearlastclass]: 'detail-header-button',
      })
    }
    this.data.lastindex = index
  },
  handleDetailHeaderButtonTap(e) {
    let index = e.currentTarget.dataset.index
    if (index == 0) {
      this.handleScrollToConsumables()
    } else if (index == 1) {
      this.handleScrollToEvaluation()
    } else {
      this.handleScrollToInfo()
    }
    this.handleChangeDetailHeaderButtonClass(index)
  },
  handleChangeConsumablesClass() {
    this.handleChangeDetailHeaderButtonClass(0)
  },
  handleChangeEvaluationClass() {
    this.handleChangeDetailHeaderButtonClass(1)
  },
  handleChangeInfoClass() {
    this.handleChangeDetailHeaderButtonClass(2)
  },
  onPageScroll(e) {
    let headerTransparentTemp = e.scrollTop / 100
    this.setData({
      headerTransparent: headerTransparentTemp
    })
  }
});
