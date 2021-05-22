const app = getApp();
Page({
  data: {
    statusBarHeight: 0, // 状态栏高度
    currentTab: 0,
    posts: [],
    avatar: [],
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      statusBarHeight: app.globalData.systeminfo.statusBarHeight,
    }),
    wx.request({
      url: 'https://moreover.atcumt.com/posts/post',
      method: "GET",
      header:{
        token: app.globalData.userinfo.token,
      },
      success:function(res){
        if(res.data.code===200){
          that.setData({
            posts: res.data.data,
          });
          for(let i = 0; i < res.data.data.length; i++){
            wx.request({
              url: res.data.data[i].head,
              method: "GET",
              header: {
                token: app.globalData.userinfo.token,
              },
              success: function(sc){
                console.log(sc);
                that.data.avatar.push("data:image/jpeg;base64,"+sc.data.data);
              }
            })
          }
        }
      }
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
