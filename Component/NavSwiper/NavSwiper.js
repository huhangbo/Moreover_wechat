const APP = getApp()
Component({
  options: {
    multipleSlots: true 
  },
  data: {
    title: ["活动", "闲聊", "答疑"],
    currentTab: 0,
    systemInfo: APP.globalData.systeminfo,
    menuInfo: APP.globalData.menuinfo,
  },
  methods: {
    changeNav: function(e) {
      if(this.data.currentTab === e.target.dataset.current) {
        return
      } else {
        this.setData({
          currentTab: e.target.dataset.current,
        })
      }
    },
    swiperChange: function(e) {
      this.setData({
        currentTab: e.detail.current
      })
    }
  },
})
