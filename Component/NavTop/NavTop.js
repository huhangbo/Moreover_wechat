const app = getApp();
Component({
  properties: {
    opacity: 0,
  },
  data: {
    systemInfo: app.globalData.systeminfo,
    menuInfo: app.globalData.menuinfo,
  },
  methods: {
    goBack: function () {
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
