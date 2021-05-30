App({
  onLaunch() {
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
