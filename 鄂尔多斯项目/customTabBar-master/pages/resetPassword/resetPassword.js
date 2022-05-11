// pages/resetPassword/resetPassword.js
import http from "../../request/http";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    show2: false,
    show3: false,
    oldPassword: "",
    newPassword: "",
    newsPassword: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit(e) {
    if (e.detail.value.oldPassword == "") {
      this.setData({
        show1: true,
      })
    } else if (e.detail.value.newPassword == "") {
      this.setData({
        show1: false,
        show2: true,
      })
    } else if (e.detail.value.newsPassword == "") {
      this.setData({
        show1: false,
        show2: false,
        show3: true,
      })
    } else if (e.detail.value.newPassword != e.detail.value.newsPassword) {
      this.setData({
        show1: false,
        show2: false,
        show3: true,
      })
    } else {
      this.setData({
        show1: false,
        show2: false,
        show3: false,
      })
      http.setPassword({
        userId: wx.getStorageSync('userInfo').data.userId,
        newPwd: this.data.newPassword,
        oldPwd: this.data.oldPassword
      }).then(res => {
        wx.showToast({
          title: res.data.msg,
          icon: "none",
          mask: true
        })
        if (res.data.code == 200) {
          setTimeout(() => {
            wx.reLaunch({
              url: '../login/login',
            })
          }, 1500)

        }
      })
    }
  },

  newPas(e) {
    this.setData({
      newPassword: e.detail.value,
      show2: false
    })
  },
  oldPas(e) {
    this.setData({
      oldPassword: e.detail.value,
      show1: false
    })
  },
  newPas1(e) {
    this.setData({
      newsPassword: e.detail.value,
    })
    if (this.data.newPassword == this.data.newsPassword) {
      this.setData({
        show3: false
      })
    } else {
      this.setData({
        show3: true
      })
    }
  },
})