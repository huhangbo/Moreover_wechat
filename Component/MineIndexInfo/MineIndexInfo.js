Component({
  properties: {
    userInfo: {},
  },
  methods: {
    toEdit: function () {
      this.pageRouter.navigateTo({url: "/pages/mine/my/edit/edit"})
    },
    toUrl: function (e) {
      const key = e.currentTarget.dataset.key
      this.pageRouter.navigateTo({
        url: `/pages/mine/my/${key}/${key}`
      })
    }
  }
})
