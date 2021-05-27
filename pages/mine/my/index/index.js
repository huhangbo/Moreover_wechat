const app = getApp();
Page({
  data: {
    userinfo: {},
    systminfo: {},
    menuinfo: {},
    post: [],
    like: [],
    description: "这个人很懒什么都没有",
    num: 0,
  }, 
  onLoad: function(){
    let that = this;
    that.setData({
      systminfo: app.globalData.systeminfo,
      menuinfo: app.globalData.menuinfo,
    });
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
        if(that.data.userinfo.describe)
        that.setData({
          description: that.data.userinfo.describe
        })
        for(let i = 0; i < res.data.data.collection.length; i++){
          wx.request({
            url: 'https://moreover.atcumt.com/posts/post/'+res.data.data.collection[i],
            method: 'GET',
            header: {
              token: app.globalData.userinfo.token
            },
            success: function(re){
              if(re.data.code === 200){
                that.data.post.push(re.data.data);
                that.setData({
                  post: that.data.post,
                })
              }
            }
          })
        }
      }
    })
  },
  Back: function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onPageScroll: function(e){
    if(e.scrollTop < 100){
      this.setData({
        num: e.scrollTop / 100,
      })
    }
    else {
      this.setData({
        num: 1,
      })
    }
  },
})