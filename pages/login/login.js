// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
  },
  GetUsername: function(e) {
    let value = e.detail.value;
    this.setData({
      username: value,
    })
  },
  GetPassword: function(e) {
    let value = e.detail.value;
    this.setData({
      password: value,
    })
  },
  Login: function(e) {
    var that = this;
    if(that.data.username.length ==0 || that.data.password.length == 0){
      wx.showToast({
        icon: 'none',
        title: '用户名或密码不能为空！',
        duration: 2000,
      })
    }else {
      wx.request({
        url: 'https://moreover.atcumt.com/user/login',
        method: "POST",
        header: { 'content-type': 'application/json' },
        data: {
          username: that.data.username,
          password: that.data.password,
        },
        success: function(res) {
          console.log(res);
          if(res.data.code==200){
            wx.showToast({
              title: '登陆成功',
            })
            app.globalData.userinfo = {
              username: that.data.username,
              token: res.data.data.token,
            }
            wx.switchTab({
              url: "../index/index",
            })
          }
          else{
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'error',
            })
          }
        },
      })
    }
  },
  ToRegister: function(){
    wx.navigateTo({
      url: './register/register',
    })
  }
})