const app = getApp();
Page({
  data: {
    user: 0,
    userinfo: {},
  },
  onLoad(options){
    let that= this;
    that.data.user = options.user;
    wx.request({
      url: 'https://moreover.atcumt.com/userinfo/userinfo/' + that.data.user,
      method: 'GET',
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res =>{
        that.setData({
          userinfo: res.data.data,
        })
      }
    }); 
  }
})