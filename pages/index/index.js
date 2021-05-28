const app = getApp();
const utils = require('../../utils/util');
Page({
  data: {
    systeminfo: {},
    menuinfo: {},
    currentTab: 0,
    scroll: 0,
    page: {
      num: 1,
      size: 6,
      total: 1,
    },
    posts: [],
    avatar: [],
    timediff: [],
  },
  Load: function(that) {
    wx.request({
      url: 'https://moreover.atcumt.com/posts/post/'+that.data.page.num+'/'+that.data.page.size, 
      method: "GET",
      header:{
        token: app.globalData.userinfo.token,
      },
      success:function(res){
        if(res.data.code === 200) {
          let content = that.data.posts.concat(res.data.data.content);
          that.setData({
            posts: content,
          })
          that.data.page.total = res.data.data.totalPages;
          for(let i = 0; i < res.data.data.content.length; i++){
            wx.request({
              url: res.data.data.content[i].head,
              method: "GET",
              header: {
                token: app.globalData.userinfo.token,
              },
              success: function(sc) {
                if(sc.data.code === 200) {
                  that.data.avatar.push(sc.data.data);
                  that.setData({
                    avatar: that.data.avatar,
                  })
                }
              }
            })
            let fmtime = res.data.data.content[i].updateTime;
            that.data.timediff.push(utils.getDateDiff(utils.formatTime(fmtime)));
            that.setData({
              timediff: that.data.timediff,
            })
          }
        }
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      systeminfo: app.globalData.systeminfo,
      menuinfo: app.globalData.menuinfo,
    });
    this.Load(this);
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
  scroll: function(event){
    let that = this;
    that.setData({
      scrollTop : event.detail.scrollTop
    });
  },
  RefPost: function(){
    this.data.page.num = 1;
    this.data.posts = [];
    this.data.avatar = [];
    this.data.timediff = [];
    this.Load(this);
    },
  LoadPost: function(){
    if(this.data.page.num < this.data.page.total ) {
      this.data.page.num++;
      this.Load(this);
    }
    else {
       wx.showToast({
        icon: 'none',
        title: '到底了别滑啦！',
        duration: 500,
      })
    }
  },
  ToPost: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './post/post?id=' + id,
    })
  }
})