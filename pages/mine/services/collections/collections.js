import { listUserCollectAPI, deleteUserCollectListAPI } from '/common/api/user-collect'
import { createCartAPI } from '/common/api/cart'

Page({
  data: {
    collections: [],
    isEdit: false,
    checkedAll: false,
    checkedlist: [],
  },
  onLoad() {
    this.getUserCollect();
  },
  getUserCollect() {
    let that = this;
    let collections = that.data.collections;
    let temp = {
      userId: 19
    }
    listUserCollectAPI(temp).then((res) => {
      console.log("ressssssss:", res.data.data.records)
      collections = res.data.data.records;
      that.setData({
        collections
      })
    })
  },
  handleToConsumableDetail() {
    dd.navigateTo({
      url: '/pages/consumables_detail/consumables_detail'
    })
  },
  handletocart() {
    dd.navigateTo({
      url: '/pages/cart/cart'
    })
  },
  handleAddToCart(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let collections = that.data.collections;
    let temp = {
      userId: 19,
      productSkusId: collections[index].productSkusId,
      productSkusNumber: 1
    }
    createCartAPI(temp).then((res) => {
      dd.showToast({
        type: 'success',
        content: '加入购物车成功',
        duration: 1000
      })
    })
  },
  handleEdit() {
    let that = this;
    let isEdit = that.data.isEdit;
    isEdit = !isEdit;
    that.setData({
      isEdit
    })
  },
  handleSelect(e) {
    let index = e.currentTarget.dataset.index;
    let collections = this.data.collections;
    let checkedAll = this.data.checkedAll;
    let checkedlist = this.data.checkedlist;
    collections[index].checked = !collections[index].checked;
    let temp = true;
    for (var data of collections) {
      if (data.checked == true) {
        if (checkedlist.indexOf(data) == -1) {
          checkedlist.push(data);
        }
        if (temp == true) {
          checkedAll = true;
        }
      } else {
        if (checkedlist.indexOf(data) != -1) {
          let i = checkedlist.indexOf(data)
          checkedlist.splice(i, 1);
        }
        checkedAll = false;
        temp = false;
      }
    }
    console.log("checkedList:", checkedlist)
    this.setData({
      collections,
      checkedAll,
      checkedlist
    })
  },
  handleSelectAll() {
    let collections = this.data.collections;
    let checkedAll = this.data.checkedAll;
    let checkedlist = this.data.checkedlist;
    checkedlist = [];
    for (var data of collections) {
      if (!checkedAll) {
        data.checked = true;
        checkedlist.push(data);
      } else {
        data.checked = false;
      }
    }
    checkedAll = !checkedAll;
    console.log("checkedList:", checkedlist)

    this.setData({
      collections,
      checkedAll,
      checkedlist
    })
  },
  handleDeletelist() {
    let that = this;
    let checkedlist = that.data.checkedlist;

    dd.confirm({
      title: '温馨提示',
      content: '是否确认删除收藏',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          deleteUserCollectListAPI(checkedlist).then((res) => {
            that.getUserCollect()
            dd.showToast({
              type: 'success',
              content: '全部删除成功',
              duration: 1000
            })
          })
        }
      },
    });
  }
});
