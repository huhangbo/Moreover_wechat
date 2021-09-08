// Component/UserBox/UserBox.js
Component({
  properties: {
    user: 0,
    avater: "",
    time: "",
    showLike: true,
    commitId: "",
    lsliked: false,
    likeCount: 0,
  },
  methods: {
    toUser: function (e) {
      this.pageRouter.navigate({
        url: "/pages/index/user/user"
      })
    }
  }
})
