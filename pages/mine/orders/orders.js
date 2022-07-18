import { listUserOrderIPageAPI } from '/common/api/user-order'
import { listOrderProductAPI } from '/common/api/order-product'

Page({
  data: {
    orderStatus: null,
    isQuery: false,
    queryIndex: -1,
    lastindex: 0,
    listbutton: [
      {
        "text": "全订单",
        "class": "orders-header-button-active"
      },
      {
        "text": "审核中",
        "class": "orders-header-button"
      },
      {
        "text": "待收货",
        "class": "orders-header-button"
      },
      {
        "text": "待评价",
        "class": "orders-header-button"
      }
    ],
    orderList: [],
    orderProductList: []
  },
  onLoad(query) {
    let that = this;
    let queryIndex = that.data.queryIndex;
    let isQuery = that.data.isQuery;
    if (query.index != "undefined") {
      queryIndex = query.index
      isQuery = true;
      that.setData({
        queryIndex,
        isQuery
      })
      this.handlelistbuttontap();
    }else{
      this.getOrderList();
    }
  },
  handlelistbuttontap(e) {
    let index = this.data.queryIndex;
    let isQuery = this.data.isQuery;
    if (!isQuery) {
      index = e.currentTarget.dataset.index
    }
    let orderStatus = this.data.orderStatus;
    if (index == 0) {
      orderStatus = null;
    } else {
      orderStatus = index;
    }
    let changeclass = 'listbutton[' + index + '].class'
    let clearlastclass = 'listbutton[' + this.data.lastindex + '].class'
    this.type = index + 1;
    if (changeclass != clearlastclass) {
      this.setData({
        [changeclass]: 'orders-header-button-active',
        [clearlastclass]: 'orders-header-button',
        orderStatus
      })
    }
    this.data.lastindex = index
    this.getOrderList()
  },
  getOrderList() {
    let that = this;
    let orderStatus = that.data.orderStatus;
    let orderList = that.data.orderList;
    let temp = {
      userId: 19,
      orderStatus: orderStatus
    }
    listUserOrderIPageAPI(temp).then((res) => {
      orderList = res.data.data.records;
      that.setData({
        orderList
      })
      that.getOrderProductList();
    })
  },
  getOrderProductList() {
    let that = this;
    let orderProductList = that.data.orderProductList;
    let orderList = that.data.orderList;
    for (var data of orderList) {
      let temp = {
        userOrderId: data.id,
      }
      listOrderProductAPI(temp).then((res) => {
        let count = 0;
        for (var data of res.data.data) {
          count += data.number
        }
        let tempRes = {
          count: count,
          content: res.data.data
        }
        orderProductList.push(tempRes)
        that.setData({
          orderProductList
        })
      })
    }
  },
  handleToOrderDetail(e) {
    let item = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item));
    dd.navigateTo({
      url: '/pages/mine/orders/order_detail/order_detail?item=' + item
    })
  }
});
