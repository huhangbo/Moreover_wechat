Component({
  properties: {
    menuInfo: {},
    systemInfo: {},
    collection: {},
  },
  data: {

  },
  methods: {
    toCollectionItem: function (e) {
      this.pageRouter.navigateTo({
        url: `/pages/index/post/post?id=${e.currentTarget.dataset.id}`
      })
    }
  }
})
