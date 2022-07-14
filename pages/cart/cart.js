import { deleteCartAPI, deleteCartListAPI, listCartAPI, updateCartAPI } from "../../common/api/cart";
import { userId } from "../../common/constant/user_constant";


Page({
  data: {
    cartlist: [],
    checkedlist: [],
    cartBottomHeight: 0,
    checkedAll: false,
    countAll: 0,
    isEdit: false,
  },

  onLoad() {
    let that = this
    this.getCartList()
    dd.createSelectorQuery()
      .select('#cart-bottom').boundingClientRect()
      .exec((ret) => {
        that.setData({
          cartBottomHeight: ret[0].height
        })
      })
  },
  handleCartEdit() {
    let that = this;
    let isEdit = that.data.isEdit;
    isEdit = !isEdit;
    that.setData({
      isEdit
    })
  },

  getCartList() {
    let temp = {
      userId: 19,
    }
    // dd.getStorage({
    //   key: userId,
    //   success: function (res) {
    //     temp.userId = res.data.userId
    //   }
    // })
    let that = this;
    listCartAPI(temp).then((res) => {
      let cartlist = that.data.cartlist;
      for (var data of res.data.data) {
        data.checked = false
      }
      cartlist = res.data.data;
      that.setData({
        cartlist
      })
    })
  },



  handleCount(e) {
    console.log("e:", e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    let cartlist = this.data.cartlist;
    this.data.countAll = 0;
    let countAll = this.data.countAll;
    let checkedAll = this.data.checkedAll;
    let checkedlist = this.data.checkedlist;
    cartlist[index].checked = !cartlist[index].checked;
    let temp = true;
    for (var data of cartlist) {
      if (data.checked == true) {
        if (checkedlist.indexOf(data) == -1) {
          checkedlist.push(data);
        }
        if (temp == true) {
          checkedAll = true;
        }
        countAll += data.productSkusNumber
      } else {
        if (checkedlist.indexOf(data) != -1) {
          let i = checkedlist.indexOf(data)
          checkedlist.splice(i, 1);
        }
        checkedAll = false;
        temp = false;
      }
      console.log("countAll:", countAll)
    }
    this.setData({
      cartlist,
      countAll,
      checkedAll,
      checkedlist
    })
  },

  handleCountAll() {
    let cartlist = this.data.cartlist;
    this.data.countAll = 0;
    let countAll = this.data.countAll;
    let checkedAll = this.data.checkedAll;
    let checkedlist = this.data.checkedlist;
    checkedlist = [];
    for (var data of cartlist) {
      if (!checkedAll) {
        data.checked = true;
        countAll += data.productSkusNumber;
        checkedlist.push(data);
      } else {
        data.checked = false;
        countAll = 0;

      }
    }
    checkedAll = !checkedAll;
    this.setData({
      cartlist,
      countAll,
      checkedAll,
      checkedlist
    })
  },

  handleAdd(e) {
    let cartlist = this.data.cartlist;
    let index = e.currentTarget.dataset.index;
    let countAll = this.data.countAll;
    if (cartlist[index].productSkusNumber < cartlist[index].stock) {
      if (cartlist[index].checked) {
        countAll++;
      }
      cartlist[index].productSkusNumber++;
      let temp = {
        productSkusNumber: cartlist[index].productSkusNumber,
        userId: 19,
        productSkusId: cartlist[index].productSkusId
      }
      updateCartAPI(temp).then((res) => {
      })
    } else {
      dd.showToast({
        type: 'exception',
        content: '超过库存数量',
        duration: 1000
      })
    }

    this.setData({
      cartlist,
      countAll,
    })
  },

  handleMinus(e) {
    let cartlist = this.data.cartlist;
    let index = e.currentTarget.dataset.index;
    let countAll = this.data.countAll;

    if (cartlist[index].productSkusNumber > 1) {
      if (cartlist[index].checked) {
        countAll--;
      }
      cartlist[index].productSkusNumber--;
      let temp = {
        productSkusNumber: cartlist[index].productSkusNumber,
        userId: 19,
        productSkusId: cartlist[index].productSkusId
      }
      updateCartAPI(temp).then((res) => {
      })
    } else {
      dd.showToast({
        type: 'exception',
        content: '至少购买一件哦',
        duration: 1000
      })
    }
    this.setData({
      cartlist,
      countAll,
    })
  },

  handleDelete() {
    let checkedlist = this.data.checkedlist;
    console.log("checkedlist:", checkedlist);
    if (checkedlist.length == 0) {
      dd.showToast({
        type: 'exception',
        content: '请勾选耗材',
        duration: 1000
      })
    } else {
      console.log("checkedlist:", checkedlist)

      dd.confirm({
        title: '温馨提示',
        content: '是否确认删除耗材',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            deleteCartListAPI(checkedlist).then((res) => {
              this.getCartList();
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
  },

  handleCartConfirm() {
    let checkedlist = this.data.checkedlist;
    if (checkedlist.length == 0) {
      dd.showToast({
        type: 'exception',
        content: '请勾选耗材',
        duration: 1000
      })
    } else {

    }
  }

});
