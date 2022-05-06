Page({
  data: {},
  onLoad() { },
  onTabItemTap(item) {
    let systemInfo = dd.getSystemInfoSync()
    let screenHeight = dd.getSystemInfoSync().screenHeight
    let windowHeight = dd.getSystemInfoSync().windowHeight
    let statusBarHeight = dd.getSystemInfoSync().statusBarHeight
    let pixelRatio = dd.getSystemInfoSync().pixelRatio
    const tabbarHeight = (screenHeight - windowHeight - statusBarHeight) * pixelRatio
    let tabbarWidth = dd.getSystemInfoSync().windowWidth
    let cartHeight = tabbarHeight / 2
    let cartWidth = tabbarWidth - tabbarWidth / 4
    console.log("tabbarHeight:", tabbarHeight)
    console.log("tabbarWidth:", tabbarWidth)
    console.log("cartHeight:", cartHeight)
    console.log("cartWidth:", cartWidth)
  }
});
