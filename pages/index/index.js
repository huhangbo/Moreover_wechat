const app = getApp();
Page({
  data: {
    statusBarHeight: 0, // 状态栏高度
    windowHeight: 0,
    currentTab: 0,
    posts: [],
    avatar: [],
  },
  onLoad: function (options) {
    let that = this;
   this.setData({
      statusBarHeight: app.globalData.systeminfo.statusBarHeight,
      windowHeight: app.globalData.systeminfo.windowHeight,
    });
    wx.request({
      url: 'https://moreover.atcumt.com/posts/post/1/10', 
      method: "GET",
      header:{
        token: app.globalData.userinfo.token,
      },
      success:function(res){
        if(res.data.code === 200) {
          that.setData({
            posts: res.data.data.content,
          })
          let head = [];
          for(let i = 0; i < res.data.data.content.length; i++){
            wx.request({
              url: res.data.data.content[i].head,
              method: "GET",
              header: {
                token: app.globalData.userinfo.token,
              },
              success: function(sc) {
                if(sc.data.code === 200) {
                  head.push(sc.data.data)
                  that.setData({
                    avatar: head,
                  })
                }
              }
            })
          }
        }
      }
    })
  },
  PageChange: function(e){
    let that = this;
    that.setData({
       currentTab: e.detail.current
        });
  },
  switchNav: function(e){
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    }
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})