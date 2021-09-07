const app = getApp()
const baseUrl = "https://moreover.atcumt.com/"
export function request (method, url, data={}, isToken=true) {
  return new Promise ((resolve, reject) => {
    wx.showLoading({title: '加载中',})
    wx.request({
      url: baseUrl + url,
      method,
      data,
      header: isToken ? {token: app.globalData.userinfo.token} : { 'content-type': 'application/json' },
      success: res => {
        if(res.data.code === 200) {
          resolve(res.data.data)
          wx.hideLoading()
        } else {
          reject(res.data.message)
          wx.showToast({
            title: res.data.message,
          })
        }
      }
    })
  })
}