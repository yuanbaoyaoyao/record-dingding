import { elasticsearchAPI } from '/common/api/elasticsearch'
import { createCartAPI } from '/common/api/cart'
Page({
  data: {
    consumables: []
  },
  onLoad(query) {
    console.log("query.searchItem:", query.searchItem)
    this.handleSearch(query.searchItem)
  },
  handleSearch(searchContent) {
    let temp = {
      keyword: searchContent
    }
    let that = this;
    let consumables = that.data.consumables;
    console.log(temp)
    elasticsearchAPI(temp).then((res) => {
      console.log("resssssssss:", res.data.data.content)
      consumables = res.data.data.content;
      that.setData({
        consumables
      })
    })
  },
  handleItemTap(e) {
    let id = e.currentTarget.dataset.id;
    dd.navigateTo({
      url: '/pages/consumables_detail/consumables_detail?id=' + id
    })
  },
  handleAddInToCart(e) {
    let temp = {
      userId: 19,
      productSkusId: e.currentTarget.dataset.id,
      productSkusNumber: 1,
    }
    createCartAPI(temp).then((res) => {
      dd.showToast({
        type: 'success',
        content: '加入购物车成功',
        duration: 1000
      })
    })
  },
  handletocart() {
    dd.navigateTo({
      url: '/pages/cart/cart'
    })
  },
});
