if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/recommendlist/recommendlist?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/list_type/list_type?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/appbar/appbar?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/list_classification/list_classification?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/recommendlist_one/recommendlist_one?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/mine/mine?hash=7ff8f13b4b4296c004d89afe3f73639eb28e8acd');
require('../../pages/mine/orders/orders?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/orders/order_detail/order_detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/services/applications/applications?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/services/feedback/feedback?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/services/feedback/feedback_detail/feedback_detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/mine/services/collections/collections?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cart/cart?hash=7ff8f13b4b4296c004d89afe3f73639eb28e8acd');
require('../../pages/setting/setting?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting_details/about_me/about_me?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting_details/address_management/address_management_detail/address_management_detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting_details/password_management/password_management?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting_details/address_management/address_management?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/home/home?hash=d4bff983ed8bdb7dcea996cf6eba341b2d1665a3');
require('../../pages/message/feedback_message/feedback_message?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/message/order_message/order_message?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/message/message?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/setting/setting_details/user_info/user_info?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/classification/classification?hash=e2ab7f5f8354744128155444c55fb69b8abf1eaf');
require('../../pages/consumables_detail/consumables_detail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/search/search?hash=a252c317d5d01d0fbf5fa96d61eac5a4d89eff84');
require('../../pages/old_consumables/old_consumables?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/new_consumables/new_consumables?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/search/search_details/search_details?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/message/announcement_message/announcement_message?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}