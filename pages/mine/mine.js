// pages/mine/mine.js
const app = getApp();
Page({
  data: {
    userinfo: {},
  },
  ToMyIndex:function(){
    wx.navigateTo({
      url: 'my/index/index',
    })
  },
  ToPost:function(){
    wx.navigateTo({
      url: 'my/post/post',
    })
  },
  ToFollow:function(){
    wx.navigateTo({
      url: 'my/follow/follow',
    })
  },
  ToFollowers:function(){
    wx.navigateTo({
      url: 'my/followers/followers',
    })
  },
  onLoad: function(){
    let that = this;
    wx.request({
      url: 'https://moreover.atcumt.com/userinfo/userinfo/'+app.globalData.userinfo.username,
      method: "GET",
      header: {
        token: app.globalData.userinfo.token,
      },
      success: function(res) {
        that.setData({
          userinfo: res.data.data,
        })
      }
    })
  }
})