// pages/user/index.js
Page({
  data: {
    userinfo: {},
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    if (userinfo && userinfo.openId) {
      this.setData({
        userinfo
      });
    } else {
      wx.reLaunch({
        url: '../login/index',
      })
    }
  },
  //跳转我的佣金
  toyongjin() {
    wx.navigateTo({
      url: '../commission/commission',
    })
  },
  //跳转收货地址
  toaddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //成为bd
  tobd(){
    wx.navigateTo({
      url: '../bd/bd',
    })
  }
})