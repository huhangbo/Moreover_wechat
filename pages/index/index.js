const app = getApp();
Page({
  data: {
    statusBarHeight: 0, // 状态栏高度
    currentTab: 0
  },
  onLoad: function (options) {
    this.setData({
      statusBarHeight: app.globalData.systeminfo.statusBarHeight,
    })
  },
  PageChange: function(e){
    var that = this;
    that.setData({
       currentTab: e.detail.current
        });
  },
  switchNav: function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    }
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
