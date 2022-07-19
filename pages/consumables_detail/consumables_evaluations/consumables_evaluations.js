import { listProductSkusEvaluationIPageAPI } from '/common/api/product-skus-evaluation'
import { createUserCollectAPI, deleteUserCollectAPI, IsLikeUserCollectAPI } from '/common/api/user-collect';

Page({
  data: {
    evaluations: [],
    id: 0,
  },
  onLoad(query) {
    console.log("query", query.id)
    let id = this.data.id;
    id = query.id;
    this.setData({
      id
    })
    this.handleIsLike();
    this.getEvaluations();
  },
  getEvaluations() {
    let that = this;
    let id = that.data.id;
    let evaluations = that.data.evaluations;
    let temp = {
      productSkusId: id
    }
    listProductSkusEvaluationIPageAPI(temp).then((res) => {
      console.log("ressssssssss:", res.data.data.records)
      evaluations = res.data.data.records;
      that.setData({
        evaluations
      })
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
      console.log("ressssssssss:", res.data)
      dd.showToast({
        type: 'success',
        content: '加入购物车成功',
        duration: 1000
      })
    })
  }
});
