import { listProductAllAPI } from "../../common/api/product";
import { listCountByProductIdAndTypeIPageAPI } from "../../common/api/product-skus";
import search_appbar_store from "../../stores/search_appbar_store";

Page({
  data: {
    navlist: [],
    productSkuslist: [],
    productSkusType: 1,
    productId: 0,
    headerlist: [
      {
        "text": "综合",
        "class": "classification-content-header-button-active"
      },
      {
        "text": "销量",
        "class": "classification-content-header-button"
      },
      {
        "text": "库存量",
        "class": "classification-content-header-button",
        "image1": "/image/order.svg",
        "image2": "/image/rorder.svg",
      },
      {
        "text": "我常买",
        "class": "classification-content-header-button",
        "image1": "/image/screen.svg"
      },
    ],
    lastnavindex: 0,
    lastheaderbuttonindex: 0,
    contentHeaderHeight: 0,
    contentHeaderHeightvh: 0,
    navvh: 0,
    contentHeightvh: 0,
    appbarvh: 0
  },
  onLoad() {
    this.getClassification();

    dd.createSelectorQuery().select('#classification-content-header').boundingClientRect().exec((ret) => {
      dd.getSystemInfo({
        success: (res) => {
          this.setData({
            contentHeaderHeightvh: ret[0].height * 100 / res.windowHeight,
            contentHeightvh: 100 - ret[0].height * 100 / res.windowHeight - search_appbar_store.data.appbarHeight * 100 / res.windowHeight,
            navvh: 100 - search_appbar_store.data.appbarHeight * 100 / res.windowHeight,
            appbarvh: search_appbar_store.data.appbarHeight * 100 / res.windowHeight
          })
        }
      })
      this.setData({
        contentHeaderHeight: ret[0].height
      })
    })
  },

  getClassification() {
    listProductAllAPI().then((res) => {
      var that = this;
      let navlist = that.data.navlist;
      let productId = this.data.productId;
      for (let i = 0; i < res.data.data.length; i++) {
        if (i == 0) {
          var temp = { 'id': res.data.data[i].id, 'text': res.data.data[i].title, 'class': 'classification-nav-item-detail-active' };
        } else {
          var temp = { 'id': res.data.data[i].id, 'text': res.data.data[i].title, 'class': 'classification-nav-item-detail' };
        }
        navlist.push(temp);
      }
      productId = res.data.data[0].id
      that.setData({
        navlist,
        productId
      })
      let tempPara = {
        productId: productId,
        productSkusType: that.data.productSkusType
      }
      that.getProductSkusList(tempPara);
    })
  },

  getProductSkusList(e) {
    var that = this;

    listCountByProductIdAndTypeIPageAPI(e).then((res) => {
      let productSkuslist = that.data.productSkuslist;
      productSkuslist = res.data.data.records;
      that.setData({
        productSkuslist
      })
    })
  },

  handlenavtap(e) {
    let index = e.currentTarget.dataset.index
    let productId = this.data.navlist[e.currentTarget.dataset.index].id
    let para = {
      productId: productId,
      productSkusType: this.data.productSkusType
    }
    this.getProductSkusList(para)
    let changeclass = 'navlist[' + index + '].class'
    let clearlastclass = 'navlist[' + this.data.lastnavindex + '].class'
    if (changeclass != clearlastclass) {
      this.setData({
        [changeclass]: 'classification-nav-item-detail-active',
        [clearlastclass]: 'classification-nav-item-detail',
        productId
      })
    }
    this.data.lastnavindex = index
  },
  handleheaderbuttontap(e) {
    let index = e.currentTarget.dataset.index
    let para = {
      productId: this.data.productId,
      productSkusType: index + 1
    }
    this.getProductSkusList(para)
    let changeclass = 'headerlist[' + index + '].class'
    let clearlastclass = 'headerlist[' + this.data.lastheaderbuttonindex + '].class'
    if (changeclass != clearlastclass) {
      this.setData({
        [changeclass]: 'classification-content-header-button-active',
        [clearlastclass]: 'classification-content-header-button',
      })
    }
    this.data.lastheaderbuttonindex = index
  },

});
