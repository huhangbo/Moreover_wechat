// Component/MineInfo/MineInfo.js
Component({
  properties: {
    userInfo: {},
  },
  methods: {
    toMyIndex: function (params) {
      this.pageRouter.navigateTo({
        url: `/pages/mine/my/index/index`
      })
    },
    toUrl: function (e) {
      const key = e.currentTarget.dataset.key
      this.pageRouter.navigateTo({
        url: `/pages/mine/my/${key}/${key}`
      })
    }
  }
})
