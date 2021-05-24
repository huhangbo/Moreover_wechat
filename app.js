// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.getSystemInfo({ // 获取设备信息
      success: (res) => {
        this.globalData.systeminfo = res;
      }
    });
    this.globalData.menuinfo = wx.getMenuButtonBoundingClientRect();
  },
  globalData: {
    systeminfo: {},
    menuinfo: {},
    userinfo: {
      username: "",
      token: "",
    },
  }
})
