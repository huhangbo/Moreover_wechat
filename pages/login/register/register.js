// pages/login/register/register.js
const app = getApp();
Page({
  data: {
    username: "",
    password: "",
    repassword: "",
  },
  GetUsername: function(e){
    this.setData({
      username: e.detail.value,
    })
  },
  GetPassword: function(e){
    this.setData({
      password: e.detail.value,
    })
  },
  GetRePassword: function(e){
    this.setData({
      repassword: e.detail.value,
    })
  },
  Register: function(){
    let that = this;
    if(that.password === that.repassword){
      wx.showToast({
        title: '两次输入密码不相同',
      })}
    else{
      wx.request({
        url: 'https://moreover.atcumt.com/user/register',
        method: "POST",
        header: { 'content-type': 'application/json' },
        data: {
          username: that.data.username,
          password: that.data.password,
        },
        success: function(res) {
          if(res.data.code==200){
            wx.showToast({
              title: '注册成功',
            })
            app.globalData.userinfo = {
              username: that.data.username,
              token: res.data.data.token,
            }
            wx.switchTab({
              url: "../../index/index",
            })            
          }
          else{
            wx.showToast({
              title: '用户名已被注册',
            })
          }
        }
      })
    }
  }
})