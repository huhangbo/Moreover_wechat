Component({
  options: {
    multipleSlots: true 
  },
  properties: {
    systemInfo: {},
    menuInfo: {},
    title: [],
  },
  data: {
    currentTab: 0,
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
