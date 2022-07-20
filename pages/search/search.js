Page({
  data: {
    historylist: [],
    searchContent: ''
    // popularlist: [
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    //   ['123'],
    // ],
    // contentlist: [
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    //   {
    //     "checkedpic": "/image/checked.svg",
    //     "pic": "/image/mock/88a1.png",
    //     "num": 2
    //   },
    // ],
  },
  onLoad() {
    let that = this
    dd.getStorage({
      key: 'historylist',
      success: function (res) {
        that.setData({
          historylist: res.data
        })
      }
    })
  },
  handlelabeltap(e) {
    let searchItem = e.target.dataset.item
    this.handletosearchdetails(searchItem)
  },
  handlesearch(e) {
    let searchItem = e.detail.value.searchInput
    if (searchItem.length == 0) {
      dd.alert({
        content: "请输入搜索内容"
      });
    } else {
      this.handletosearchdetails(searchItem)
    }
  },
  handletosearchdetails(searchItem) {
    let that = this
    let temphistorylistitem = searchItem
    if (that.data.historylist == null) {
      that.data.historylist = []
      that.handlesethistorydatastorage(temphistorylistitem, that.data.historylist)
    } else if (that.data.historylist.indexOf(temphistorylistitem) == -1 && that.data.historylist.length < 20) {
      that.handlesethistorydatastorage(temphistorylistitem, that.data.historylist)
    } else if (that.data.historylist.indexOf(temphistorylistitem) == -1 && that.data.historylist.length == 20) {
      that.data.historylist.splice(19, 1)
      that.handlesethistorydatastorage(temphistorylistitem, that.data.historylist)
    } else {
      let index = that.data.historylist.indexOf(temphistorylistitem)
      that.data.historylist.splice(index, 1)
      that.handlesethistorydatastorage(temphistorylistitem, that.data.historylist)
    }
    console.log("searchItem:", searchItem)
    dd.navigateTo({
      url: '/pages/search/search_details/search_details?searchItem=' + searchItem
    })
  },
  handlesethistorydatastorage(tempitem, data) {
    this.data.historylist.unshift(tempitem)
    this.setData({
      historylist: data
    })
    dd.setStorage({
      key: 'historylist',
      data: data
    })
  },
  handleclearhistory() {
    let that = this
    dd.confirm({
      content: '确定情况历史搜索记录',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success({ confirm }) {
        if (confirm) {
          dd.clearStorage("historylist")
          that.setData({
            historylist: null
          })
        }
      },
    })
  },
  bindInputSearchContent(e) {
    this.setData({
      searchContent: e.detail.value
    })
  },
  // handletocart(){
  //   dd.switchTab({
  //     url:'/pages/cart/cart'
  //   })
  // }
});
