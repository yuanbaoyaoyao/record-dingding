import { listOrderProductAPI } from '/common/api/order-product'


Page({
  data: {
    orderId: 0,
    addressDetail: '',
    orderSn: '',
    createdAt: '',
    orderProductList: {}
  },
  onLoad(query) {
    let that = this;
    let info = JSON.parse(query.item);
    console.log("order_detail:", info)
    let orderId = that.data.orderId;
    let orderSn = that.data.orderSn;
    let addressDetail = that.data.addressDetail;
    let createdAt = that.data.createdAt;
    orderId = info.id;
    orderSn = info.orderSn;
    createdAt = info.createdAt;
    addressDetail = info.addressDetail;
    that.setData({
      orderId,
      orderSn,
      createdAt,
      addressDetail
    })
    that.getOrderProductList();
  },
  getOrderProductList() {
    let that = this;
    let orderProductList = that.data.orderProductList;
    let orderId = that.data.orderId;
    let temp = {
      userOrderId: orderId,
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
      orderProductList = tempRes
      console.log("orderProductList:", orderProductList)
      that.setData({
        orderProductList
      })
    })
  },
});
