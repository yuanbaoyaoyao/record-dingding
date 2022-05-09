Component({
  mixins: [],
  data: {
    appbarHeight: 0
  },
  props: {},
  didMount() {
    // 获取appbar高度或者直接设定
    dd.createSelectorQuery().select('#appbar').boundingClientRect().exec((ret) => {
      this.setData({
        appbarHeight: ret[0].height
      })
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    handletosearch(){
      console.log("yes2222")
      dd.navigateTo({
        url:'/pages/search/search'
      })
    },
    handletomessage(){
      dd.navigateTo({
        url:'/pages/message/message'
      })
    },

  },
});
