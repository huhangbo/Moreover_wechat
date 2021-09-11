const app = getApp();
import {request} from "../../utils/request"
Page({
  data: {
    userInfo: {},
  },
  onLoad: async function(){
      const result =await request("GET", `userinfo/userinfo/${app.globalData.userinfo.username}`)
      this.setData({userInfo: result})
  }
})