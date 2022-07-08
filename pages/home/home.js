import { listFrontShowRotationAPI, listFrontShowOldAPI, listFrontShowNewAPI } from "../../common/api/front-show";
import { listProductAllAPI } from "../../common/api/product";
import { listProductSkusByTypeIPageAPI } from "../../common/api/product-skus";

Page({
  data: {
    type:1,
    listRotationsData: [],
    productsData: [],
    productSkusData: [],
    oldData: [],
    newData: [],
    grid: {
      list: [
      ],
      columnNum: 0
    },
    listbutton: [
      {
        "label1": "打印机相关",
        "avatar": "/image/printer.svg",
        "class": "page-list-button-detail-label-active"
      },
      {
        "label1": "显示器电脑",
        "avatar": "/image/computer.svg",
        "class": ""
      },
      {
        "label1": "电脑周边",
        "avatar": "/image/usb.svg",
        "class": ""
      },
      {
        "label1": "其他设备",
        "avatar": "/image/paint.svg",
        "class": ""
      }
    ],
    lastindex: 0,
  },
  gridListByType: {
    list: [
    ],
    columnNum: 0
  },
  handlelistbuttontap(e) {
    console.log("home的button")
    let index = e.currentTarget.dataset.index
    let changeclass = 'listbutton[' + index + '].class'
    let clearlastclass = 'listbutton[' + this.data.lastindex + '].class'
    this.type = index+1;
    this.getListByType();
    if (changeclass != clearlastclass) {
      this.setData({
        [changeclass]: 'page-list-button-detail-label-active',
        [clearlastclass]: '',
      })
    }
    this.data.lastindex = index
  },
  handletodetail() {
    dd.navigateTo({
      url: '/pages/consumables_detail/consumables_detail'
    })
  },
  handletoold() {
    dd.navigateTo({
      url: '/pages/old_consumables/old_consumables'
    })
  },
  handletonew() {
    dd.navigateTo({
      url: '/pages/new_consumables/new_consumables'
    })
  },
  handletoclassification() {
    dd.switchTab({
      url: '/pages/classification/classification'
    })
  },

  getRotation() {
    listFrontShowRotationAPI().then((res) => {
      this.data.listRotationsData = res.data.data;
      this.setData({
        listRotationsData: res.data.data
      })
    });
  },
  getClassification() {
    listProductAllAPI().then((res) => {
      var that = this;
      let grid = Object.assign({}, that.data.grid);
      let productsData = that.data.productsData;
      for (let i = 0; i < res.data.data.length; i++) {
        var temp = { 'icon': res.data.data[i].avatar, 'text': res.data.data[i].title };
        grid.list.push(temp);
        grid.columnNum++;
        if (i % 10 == 0 && i != 0) {
          productsData.push(grid);
          grid = Object.assign({}, that.data.grid);
        }
      }
      productsData.push(grid);
      that.setData({
        productsData
      })
    })
  },

  getOld() {
    var that = this;
    listFrontShowOldAPI().then((res) => {
      let oldData = that.data.oldData;
      oldData = res.data.data;
      that.setData({
        oldData
      })
    })
  },

  getNew() {
    var that = this;
    listFrontShowNewAPI().then((res) => {
      let newData = that.data.newData;
      newData = res.data.data;
      that.setData({
        newData
      })
    })
  },

  getListByType() {
    var that = this;
    var type = 1;
    if(that.type!=undefined){
      type = that.type;
    }
    let tempForm = {
      type: type
    }
    listProductSkusByTypeIPageAPI(tempForm).then((res) => {
      let gridListByType = Object.assign({}, that.data.gridListByType);
      // let gridListByType = that.data.gridListByType;

      for (let i = 0; i < res.data.data.length; i++) {
        gridListByType.columnNum++;
      }
      gridListByType.list = res.data.data.records;
      console.log("gridListByType", gridListByType);
      that.setData({
        gridListByType
      })
    })

  },

  onLoad() {
    this.getRotation();
    this.getClassification();
    this.getOld()
    this.getNew()
    this.getListByType()
  },
});
