// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  ToSign: function(){
    wx.navigateTo({
      url: 'service/sign/sign',
    })
  },
  ToCollection: function(){
    wx.navigateTo({
      url: 'service/collection/collection',
    })
  },
  ToSet: function(){
    wx.navigateTo({
      url: 'service/set/set',
    })
  },
  ToInvite: function(){
    wx.navigateTo({
      url: 'service/invite/invite',
    })
  },
  ToFeedback: function(){
    wx.navigateTo({
      url: 'service/feedback/feedback',
    })
  }
})