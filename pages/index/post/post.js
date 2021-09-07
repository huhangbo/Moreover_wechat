const app = getApp();
import {formatTime, getDateDiff} from "../../../utils/time"
Page({
  data: {
    id: "",
    viewtext: "",
    is: {
      collect: false,
      like: false,
    },
    count: -1,
    currentTab: 0,
    viewhidden: true,
    systeminfo: {},
    postinfo: {},
    comments: [],
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
    that.load(that);
  },
  load: function(that){
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
            ['postinfo.publishtime']: formatTime(res.data.data.updateTime),
            systeminfo: app.globalData.systeminfo,
            ['is.like']: res.data.data.starList.includes(app.globalData.userinfo.username),
          });
        };
        wx.request({
          url: 'https://moreover.atcumt.com/userinfo/userinfo/' + res.data.data.publisher,
          method: "GET",
          header: {
            token: app.globalData.userinfo.token,
          },
          success: sc=>{
            if(res.data.code === 200){
              that.setData({
                ['postinfo.publishername']: sc.data.data.nickname,
                ['postinfo.avatar']: sc.data.data.head,
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
          that.data.commentpage.total = res.data.data.totalPages;
          that.setData({
            comments: [...that.data.comments,...res.data.data.content],
            viewhidden: true,
            viewtext: "",
            ['postinfo.totalcomment']:  res.data.data.totalElements,
          })
          for(let i = 0; i < res.data.data.content.length; i++){
            wx.request({
              url: 'https://moreover.atcumt.com/userinfo/userinfo/' + res.data.data.content[i].publisher,
              method: "GET",
              header: {
                token: app.globalData.userinfo.token,
              },
              success: sc =>{
                if(sc.data.code === 200){
                  that.data.count++;
                  let publishername = 'comments[' + that.data.count + '].publishername';
                  let avatar = 'comments[' + that.data.count + '].avatar';
                  let time = 'comments[' + that.data.count + '].publishtime';
                  let like = 'comments[' + that.data.count + '].isliked';
                  that.setData({
                    [publishername]: sc.data.data.nickname,
                    [avatar]: sc.data.data.head,
                    [time]: formatTime(that.data.comments[that.data.count].updateTime),
                    [like]: that.data.comments[that.data.count].starList.includes(app.globalData.userinfo.username),
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
    });
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
    let that = this;
    wx.request({
      url: 'https://moreover.atcumt.com/posts/collect/' + that.data.id,
      method: "POST",
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res=>{
        if(res.data.code === 200){
          that.setData({
            iscollect: true,
          })
        }
      }
    })
  },
  view: function(e){
    let that = this;
    this.setData({
      viewhidden: false,
    })
    if(e.currentTarget.dataset.id){
      let comment = {
        publishername: e.currentTarget.dataset.publishername,
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
  postlike: function(){
    let that = this;
    let star = 'star';
    if(that.data.islike) star = 'unstar';
    that.setData({
      ['is.like']: !that.data.like,
    });
    wx.request({
      url: 'https://moreover.atcumt.com/posts/' + star + '/' + that.data.id,
      method: "POST",
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res=>{
        if(res.data.code !== 200){
          that.setData({
            ['is.like']: !that.data.like,
          })
        }
      },
    })
  },
  commentlike: function(e){
    let that = this;
    let star = 'star';
    let change = 'comments[' + e.currentTarget.dataset.index + '].isliked';
    if(that.data.comments[e.currentTarget.dataset.index].isliked) star = 'unstar';
    that.setData({
      [change]: !that.data.comments[e.currentTarget.dataset.index].isliked,
    });
    wx.request({
      url: 'https://moreover.atcumt.com/comments/' + star + '/' + e.currentTarget.dataset.id,
      method: 'PUT',
      header: {
        token: app.globalData.userinfo.token,
      },
      success :res=> {
        if(res.data.code === 200){
          let starlist = 'comments[' + e.currentTarget.dataset.index + '].starList'
          if(star == 'star'){
            that.setData({
              [starlist]: [...that.data.comments[e.currentTarget.dataset.index].starList,app.globalData.userinfo.username],
            })
          }
          else {
            that.data.comments[e.currentTarget.dataset.index].starList.splice(that.data.comments[e.currentTarget.dataset.index].starList.indexOf(app.globalData.userinfo.username),1)
            that.setData({
              [starlist]:that.data.comments[e.currentTarget.dataset.index].starList,
            })
          }
        }
        else {
          that.setData({
            [change]: !that.data.comments[e.currentTarget.dataset.index].isliked,
          })
        }
      }
    })
  },
  onPullDownRefresh: function(){
    let that = this;
    that.data.comments = [];
    that.data.childrencomments = [];
    that.data.commentpage.num = 1;
    that.data.count = -1;
    that.load(that);
    wx.stopPullDownRefresh();
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
            that.data.childrencomments = [];
            that.data.commentpage.num = 1;
            that.data.count = -1;
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
            that.data.childrencomments = [];
            that.data.commentpage.num = 1;
            that.data.count = -1;
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
  },
  toIndex(e){
    let user = e.currentTarget.dataset.user;
    wx.navigateTo({
      url: '../user/user?user=' + user,
    })
  }
})