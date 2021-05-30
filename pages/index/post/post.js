const app = getApp();
const untils = require('../../../utils/util');
Page({
  data: {
    id: "",
    head: "",
    publishtime: "",
    viewtext: "",
    currentTab: 0,
    totalcomment: 0,
    viewhidden: true,
    systeminfo: {},
    postinfo: {},
    comments: [],
    avatar: [],
    childrencomments: [],
    commentpage: {
      num: 1,
      size: 10,
      total: 1,
    },
    reply: {
      publisher:"",
      id: 0,
    },
  },
  onLoad: function (options) {
    let that = this;
    that.data.id = options.id;
    wx.request({
      url: 'https://moreover.atcumt.com/posts/post/' + that.data.id,
      method: "GET",
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res =>{
        if(res.data.code === 200){
          this.setData({
            postinfo: res.data.data,
            publishtime: untils.formatTime(res.data.data.updateTime),
            systeminfo: app.globalData.systeminfo,
          });
        };
        wx.request({
          url: that.data.postinfo.head,
          method: "GET",
          header: {
            token: app.globalData.userinfo.token,
          },
          success: sc=>{
            if(res.data.code === 200){
              that.setData({
                head: sc.data.data,
              })
            }
          }
        });
      } 
    });
    that.getcomment(that);
  },
  getcomment: function(that) {
    wx.request({
      url: 'https://moreover.atcumt.com/comments/parents/' + that.data.id + '/' + that.data.commentpage.num + '/' + that.data.commentpage.size,
      method: "GET",
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res=>{
        if(res.data.code === 200){
          let content = that.data.comments.concat(res.data.data.content);
          that.data.commentpage.total = res.data.data.totalPages;
          that.setData({
            comments: content,
            viewhidden: true,
            viewtext: "",
            totalcomment:  res.data.data.totalElements,
          })
          for(let i = 0; i < res.data.data.content.length; i++){
            wx.request({
              url: 'https://moreover.atcumt.com/userinfo/head/' + res.data.data.content[i].publisher,
              method: "GET",
              header: {
                token: app.globalData.userinfo.token,
              },
              success: sc =>{
                if(sc.data.code === 200){
                  that.data.avatar.push(sc.data.data);
                  that.setData({
                    avatar: that.data.avatar,
                  })
                }
              }
            }),
            wx.request({
              url: 'https://moreover.atcumt.com/comments/children/' + that.data.id + '/' + res.data.data.content[i].id,
              method: "GET",
              header: {
                token: app.globalData.userinfo.token,
              },
              success: sc=>{
                if(sc.data.code === 200){
                  that.data.childrencomments.push(sc.data.data.content);
                  that.setData({
                    childrencomments: that.data.childrencomments,
                  })
                }
              }
            })
          }
        }
      },
      complete: function(){
        wx.stopPullDownRefresh();
      }
    })
  },
  switchNav: function(e) {
    if(this.data.currentTab === e.target.dataset.current) {
      return false;
    }
    else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  collect: function(){
    
  },
  view: function(e){
    let that = this;
    this.setData({
      viewhidden: false,
    })
    if(e.currentTarget.dataset.id){
      let comment = {
        publisher: e.currentTarget.dataset.publisher,
        id: e.currentTarget.dataset.id,
      }
      that.setData({
        reply: comment
      })
    }
    else {
      let comment = {};
      that.setData({
        reply: comment
      })
    }
  },
  viewhide: function(){
    this.setData({
      viewhidden: true,
    })
  },
  like: function(){

  },
  onPullDownRefresh: function(){
    let that = this;
    wx.showNavigationBarLoading();
    that.onLoad();
  },
  sendview:function(){
    let that = this;
    if(that.data.reply.id){
      wx.request({
        url: 'https://moreover.atcumt.com/comments/post/' + that.data.id + '/' + that.data.reply.id,
        method: "PUT",
        header: {
          "token": app.globalData.userinfo.token,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          "message": that.data.viewtext
        }),
        success: res=>{
          if(res.data.code === 200){
            that.data.comments = [];
            that.data.avatar = [];
            that.data.childrencomments = [];
            that.data.commentpage.num = 1;
            that.getcomment(that);
          }
        }
      })
    }
    else {
      wx.request({
        url: 'https://moreover.atcumt.com/comments/post/' + that.data.id,
        method: "POST",
        header: {
          "token": app.globalData.userinfo.token,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          "message": that.data.viewtext
        }),
        success: res=>{
          if(res.data.code === 200){
            that.data.comments = [];
            that.data.avatar = [];
            that.data.childrencomments = [];
            that.data.commentpage.num = 1;
            that.getcomment(that);
          }
        }
      })
    }
  },
  viewinput:function(e){
    this.setData({
      viewtext: e.detail.value,
    })
  },
  onReachBottom: function (){
    let that = this;
    if(that.data.commentpage.num < that.data.commentpage.total){
      that.data.commentpage.num++;
      that.getcomment(that);
    }
  }
})