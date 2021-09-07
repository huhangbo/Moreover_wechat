import {request} from "../../utils/request"

Component({
  properties: {

  },
  data: {
    posts: [],
    scroll: 0,
    page: {
      current: 1,
      size: 6,
      total: 1,
    },
  },
  methods: {
    getPost: async function (current, size, isFresh=false) {
      const result = await request("GET", `/posts/post/${current}/${size}`)
      let posts = []
      if(isFresh){
        posts = result.content
      } else {
        posts = this.data.posts.concat(result.content)
      }
      this.setData({posts: posts})
    },
    loadMorePost: function (current, total) {
      if(current < total) {
        this.setData({page: Object.assign(this.data.page, {current: current + 1})})
        this.getPost(this.data.page.current, this.data.page.size)
      } else {
        wx.showToast({title: '别滑了到底啦！', duration: 500,})
      }
    },
    refreshPost: function () {
      this.getPost(1, this.data.page.size, true)
    },
    toPost: function (id) {
      this.pageRouter.wx.navigateTo({
        url: `/pages/index/post/post?id=${id}`,
      })
    }
  },
  lifetimes: {
    attached: function () {
      this.getPost(this.data.page.current, this.data.page.size)
    }
  }
})
