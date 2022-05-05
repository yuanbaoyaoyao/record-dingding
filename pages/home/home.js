Page({
  data: {
    background: ['/image/mock/88a1.png', '/image/mock/88a2.png', '/image/mock/88a3.png', '/image/mock/88a4.png'],
    grid: {
      list: [
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "1"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "2"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "3"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "4"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "5"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "6"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "7"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "8"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "9"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "10"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "11"
        },
        {
          "icon": "https://zos.alipayobjects.com/rmsportal/HMVRwQoJUDyxZVkTyIqF.png",
          "text": "12"
        }
      ],
      columnNum: 6
    },
    recommendlist: {
      list: [
        {
          "pic": "/image/mock/88a1.png",
          "text": "1"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "2"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "3"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "4"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "5"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "6"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "7"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "8"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "9"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "10"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "11"
        },
        {
          "pic": "/image/mock/88a1.png",
          "text": "12"
        }
      ],
      columnNum: 2
    },
    listbutton: [
      {
        "label1": "这是button",
        "label2": "这是描述",
        "class": "page-list-button-detail-label-active"
      },
      {
        "label1": "这是button",
        "label2": "这是描述",
        "class": ""
      },
      {
        "label1": "这是button",
        "label2": "这是描述",
        "class": ""
      },
      {
        "label1": "这是button",
        "label2": "这是描述",
        "class": ""
      }
    ],
    lastindex: 0,
    gridlistconsumables: {
      list: [
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
        {
          "pic": "/image/mock/88a1.png",
          "title": "这是标题",
          "description": "这是描述",
          "num": "这是剩余数量"
        },
      ]
    }

  },
  handleItemTap(e) {
    dd.showToast({
      content: `第${e.currentTarget.dataset.index}个Item`,
      success: (res) => {

      },
    });
  },
  handlelistbuttontap(e) {
    let index = e.currentTarget.dataset.index
    let changeclass = 'listbutton[' + index + '].class'
    let clearlastclass = 'listbutton[' + this.data.lastindex + '].class'
    this.setData({
      [changeclass]: 'page-list-button-detail-label-active',
      [clearlastclass]: '',
    })
    this.data.lastindex = index
  },
  onLoad() { },
});