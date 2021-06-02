const app = getApp();
var COS = require('../../../../utils/cos-wx-sdk-v5.js')
var cos = new COS({
  url: 'https://moreover-1305054989.cos.ap-nanjing.myqcloud.com',
  SecretId: '',
  SecretKey: '',
});
Page({
  data: {
    userinfo: {},
    sex: ['男', '女', '两性人', '未知', '无'],
    sexindex: 0,
    name: true,
    nameinput: "",
    signature: true,
    signatureinput: "",
  },
  onLoad: function(){
    let that =this ;
    wx.request({
      url: 'https://moreover.atcumt.com/userinfo/userinfo/' + app.globalData.userinfo.username,
      method: "GET",
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res=> {
        if(res.data.code === 200){ 
          that.setData({
            userinfo: res.data.data,
            sexindex: that.data.sex.indexOf(res.data.data.sex),
          })
        }
      }
    })
  },
  changesex: function(e){
    let that = this;
    that.setData({
      sexindex: e.detail.value,
    });
    wx.request({
      url: 'https://moreover.atcumt.com/userinfo/sex',
      method: 'POST',
      header: {
        token: app.globalData.userinfo.token,
      },
      data: JSON.stringify({
        "sex": that.data.sex[e.detail.value]
      }),
    })
  },
  nameshow: function(){
    this.setData({
      name: false,
    })
  },
  namehide: function(){
    this.setData({
      name: true,
    })
  },
  nameinput: function(e){
    this.setData({
      nameinput: e.detail.value,
    })
  },
  nameok: function(){
    let that =this;
    wx.request({
      url: 'https://moreover.atcumt.com/userinfo/nickname/' + that.data.nameinput,
      method: 'PUT',
      header: {
        token: app.globalData.userinfo.token,
      },
      success: res =>{
        if(res.data.code === 200){
          that.onLoad();
          that.namehide();
        }
      }
    })
  },
  signatureshow: function(){
    this.setData({
      signature: false,
    })
  },
  signaturehide: function(){
    this.setData({
      signature: true,
    })
  },
  signatureinput: function(e){
    this.setData({
      signatureinput: e.detail.value,
    })
  },
  signatureok: function(){
    let that =this;
    wx.request({
      url: 'https://moreover.atcumt.com/userinfo/describe/',
      method: 'POST',
      header: {
        token: app.globalData.userinfo.token,
      },
      data:JSON.stringify({
        "describe": that.data.signatureinput,
      }),
      success: res =>{
        if(res.data.code === 200){
          that.onLoad();
          that.signaturehide();
        }
      }
    })
  },
  avatarchange: function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {      
        var filePath = res.tempFiles[0].path;
        var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
        cos.postObject({
            Bucket: 'moreover-1305054989',
            Region: 'ap-nanjing',
            Key: filename,
            FilePath: filePath,
            onProgress: function (info) {
                console.log(JSON.stringify(info));
            }
        }, function (err, data) {
            console.log(err || data);
        });
      }
    })
  }
})