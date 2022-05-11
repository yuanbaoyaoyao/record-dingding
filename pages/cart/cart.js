Page({
  data: {
    contentlist: [
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
      {
        "checkedpic": "/image/checked.svg",
        "pic": "/image/mock/88a1.png",
        "num": 2
      },
    ],
    cartBottomHeight: 0
  },
  onLoad() {
    let that = this
    dd.createSelectorQuery()
      .select('#cart-bottom').boundingClientRect()
      .exec((ret) => {
        that.setData({
          cartBottomHeight: ret[0].height
        })
      })
  },
  handleCartEdit(){
    console.log("点击了编辑按钮")
  }
});
