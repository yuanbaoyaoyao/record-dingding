import { listProductSkusSearchIPageAPI } from '/common/api/product-skus';
import { createUserCollectAPI, deleteUserCollectAPI, IsLikeUserCollectAPI } from '/common/api/user-collect';
import { listUserAddressAPI } from '/common/api/user-address'
import { listProductSkusEvaluationIPageAPI } from '/common/api/product-skus-evaluation'
import { createCartAPI } from '/common/api/cart'

Page({
  data: {
    consumableInfo: '',
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
    objectArray: [],
    arrIndex: 0,
    consumablesHeight: 0,
    evaluationHeight: 0,
    infoHeight: 0,
    lastindex: 0,
    headerTransparent: 0,
    id: 0,
    productSkusPic: '',
    productSkusTitle: '',
    productSkusDes: '',
    productSkusNumber: 0,
    count: 1,
    addressDetail: '',
    isLike: false,
    collectedId: 0,
    defaultAddress: '',
    evaluations: [],
  },
  onLoad(query) {
    let that = this
    let id = that.data.id;
    id = query.id;
    console.log("query.id:",id)
    that.setData({
      id,
    })
    that.handleGetInfo();
    that.handleGetAddress();
    that.handleGetEvaluation();
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
  handleGetInfo() {
    let that = this;
    let id = that.data.id;
    let productSkusPic = that.data.productSkusPic;
    let productSkusTitle = that.data.productSkusTitle;
    let productSkusDes = that.data.productSkusDes;
    let productSkusNumber = that.data.productSkusNumber;
    let consumableInfo = that.data.consumableInfo;
    let temp = {
      id
    }
    listProductSkusSearchIPageAPI(temp).then((res) => {
      let info = res.data.data.records[0];
      consumableInfo = info;
      productSkusPic = info.avatar;
      productSkusTitle = info.productName + ' ' + info.title;
      productSkusDes = info.description;
      productSkusNumber = info.stock;
      that.setData({
        id,
        productSkusPic,
        productSkusTitle,
        productSkusDes,
        productSkusNumber,
        consumableInfo
      })
      that.handleIsLike();
    })
  },
  handleGetAddress() {
    let that = this;
    let defaultAddress = that.data.defaultAddress;
    let objectArray = that.data.objectArray;
    let temp = {
      userId: 19
    }
    listUserAddressAPI(temp).then((res) => {
      let index = 0;
      for (let data of res.data.data) {
        let temp = {
          id: data.id,
          name: data.addressDetail
        }
        objectArray.push(temp);
        if (data.isDefault) {
          defaultAddress = data.addressDetail;
          if (defaultAddress.length > 10) {
            defaultAddress = defaultAddress.substring(0, 10)
          }
        }
      }
      that.setData({
        defaultAddress,
        objectArray
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
  },
  handleToCart() {
    dd.navigateTo({
      url: '/pages/cart/cart'
    })
  },
  handleAddToCollections() {
    let that = this;
    let productSkusId = that.data.id;
    let isLike = that.data.isLike;
    let temp = {
      userId: 19,
      productSkusId: productSkusId
    }
    createUserCollectAPI(temp).then((res) => {
      isLike = true;
      that.setData({
        isLike
      })
      dd.showToast({
        type: 'success',
        content: '添加收藏成功',
        duration: 1000
      })
    })
  },
  handleRemoveFromCollections() {
    let that = this;
    let collectedId = that.data.collectedId;
    let isLike = that.data.isLike;
    let temp = {
      id: collectedId
    }
    deleteUserCollectAPI(temp).then((res) => {
      isLike = false;
      that.setData({
        isLike
      })
      dd.showToast({
        type: 'success',
        content: '删除收藏成功',
        duration: 1000
      })
    })
  },
  handleIsLike() {
    let that = this;
    let isLike = that.data.isLike;
    let productSkusId = that.data.id;
    let collectedId = that.data.collectedId;
    let temp = {
      userId: 19,
      productSkusId: productSkusId
    }
    IsLikeUserCollectAPI(temp).then((res) => {
      if (typeof (res.data.data[0]) != "undefined") {
        collectedId = res.data.data[0].id;
        isLike = true;
        that.setData({
          isLike,
          collectedId
        })
      }
    })
  },
  handleAddCount() {
    let that = this;
    let count = that.data.count;
    let productSkusNumber = that.data.productSkusNumber;
    if (count < productSkusNumber) {
      count++;
      that.setData({
        count
      })
    } else {
      dd.showToast({
        type: 'exception',
        content: '超过库存数量',
        duration: 1000
      })
    }
  },
  handleMinusCount() {
    let that = this;
    let count = that.data.count;
    if (count > 1) {
      count--;
      that.setData({
        count
      })
    } else {
      dd.showToast({
        type: 'exception',
        content: '至少购买一件哦',
        duration: 1000
      })
    }
  },
  bindObjPickerChange(e) {
    let that = this;
    let defaultAddress = that.data.defaultAddress;
    defaultAddress = that.data.objectArray[e.detail.value].name
    that.setData({
      arrIndex: that.data.objectArray[e.detail.value].id,
      defaultAddress
    });
  },
  handleGetEvaluation() {
    let that = this;
    let id = that.data.id;
    let evaluations = that.data.evaluations;
    let temp = {
      productSkusId: id
    }
    listProductSkusEvaluationIPageAPI(temp).then((res) => {
      evaluations = res.data.data.records;
      that.setData({
        evaluations
      })
    })
  },
  handelToEvaluationDetail() {
    let that = this;
    let id = that.data.id;
    dd.navigateTo({
      url: '/pages/consumables_detail/consumables_evaluations/consumables_evaluations?id=' + id
    })
  },
  handleAddInToCart() {
    let that = this;
    let id = that.data.id;
    let count = that.data.count;
    let temp = {
      userId: 19,
      productSkusId: id,
      productSkusNumber: count,
    }
    createCartAPI(temp).then((res) => {
      dd.showToast({
        type: 'success',
        content: '加入购物车成功',
        duration: 1000
      })
    })
  },
  handleToConfirmOrder() {
    let that = this;
    let arrIndex = that.data.arrIndex;
    let consumableInfo = that.data.consumableInfo;
    let count = that.data.count;
    let temp = {
      consumables: [],
      addressId: arrIndex,
      countList:[]
    }
    temp.consumables.push(consumableInfo);
    temp.countList.push(count);
    console.log("temp:",temp)
    let item = encodeURIComponent(JSON.stringify(temp));
    dd.navigateTo({
      url: '/pages/cart/order_confirm/order_confirm?info=' + item
    })
  },
});
