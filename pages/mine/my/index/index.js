const app = getApp()
import {request} from "../../../../utils/request"
Page({
  data: {
    menuInfo: app.globalData.menuinfo,
    systemInfo: app.globalData.systeminfo,
    userInfo: {},
    collection: [],
    like: [],
    description: "这个人很懒什么都没有",
    navOpacity: 0,
  }, 
  onLoad: function(){
    this.getUserInfo(app.globalData.userinfo.username)
  },
  getUserInfo: async function (username) {
    let collection = []
    const userInfo = await request("GET", `userinfo/userinfo/${username}`)
    for(let i=0; i<userInfo.collection.length; i++){
      const item = await request("GET", `posts/post/${userInfo.collection[i]}`)
      collection.push(item)
    }
    this.setData({userInfo: userInfo, collection: collection})
  },
  toedit: function(){
    wx.navigateTo({
      url: '../edit/edit',
    })
  },
  onPageScroll: function(e){
    if(e.scrollTop < 100){
      this.setData({
        navOpacity: e.scrollTop / 100,
      })
    }
    else {
      this.setData({
        navOpacity: 1,
      })
    }
  },
})