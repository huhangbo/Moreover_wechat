// Component/ServiceList/ServiceIcon.js
Component({
  properties: {
  },
  data: {
    list: [
      {key:"sign", title: "签到", icon: "/src/img/service/sign.png"},
      {key: "collection", title: "收藏", icon: "/src/img/service/collection.png"},
      {key: "set", title: "设置", icon: "/src/img/service/set.png"},
      {key: "invite", title: "邀请", icon: "/src/img/service/invite.png"},
      {key: "feedback", title: "反馈", icon: "/src/img/service/feedback.png"}
    ]
  },
  methods: {
    goTo: function (e) {
      const key = e.currentTarget.dataset.key
      this.pageRouter.navigateTo({
        url: `/pages/mine/service/${key}/${key}`
      })
    }
  }
})
