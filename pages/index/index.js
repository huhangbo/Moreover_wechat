const app = getApp();
Page({
  data: {
    title: ["活动", "闲聊", "答疑"],
    systemInfo: {},
    menuInfo: {},
  },
  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systeminfo,
      menuInfo: app.globalData.menuinfo,
    });
  },
})