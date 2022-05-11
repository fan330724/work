// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "获取验证码",
    phone: "",
    code: "",
    start: false,
  },
  submit(e) {
    console.log(e.detail.value);
    var pattern = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    var value = e.detail.value;
    if (value.phone == "") {
      wx.showToast({
        title: '请输入手机号',
        mask: true
      })
    } else if (!pattern.test(value.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
    } else if (this.data.start) {
      wx.showModal({
        title: '提示',
        content: '请获取验证码',
        showCancel: false
      })
    } else if (value.code == "") {
      wx.showToast({
        title: '请输入验证码',
        mask: true
      })
    } else if (value.newPassword == "") {
      wx.showToast({
        title: '请输入密码',
        mask: true
      })
    } else if (value.newsPassword == "") {
      wx.showToast({
        title: '请再次输入密码',
        mask: true
      })
    } else if (value.newPassword != value.newsPassword) {
      wx.showModal({
        title: '提示',
        content: '输入的密码不同，请重新输入!',
        showCancel: false
      })
    } else {

    }
  },
  //倒计时
  goGetCode: function () {
    var that = this;
    var time = 60;
    if (that.data.start != true) {
      that.setData({
        text: '获取成功(60)',
        start: true
      })
      var Interval = setInterval(function () {
        time--;
        if (time > 0) {
          that.setData({
            text: `获取成功(${time})`
          })
        } else {
          clearInterval(Interval);
          that.setData({
            text: '重新发送',
          })
        }
      }, 1000)
    } else if (that.data.start && that.data.text == "重新发送") {
      that.setData({
        text: '获取成功(60)',
        start: true
      })
      var Interval = setInterval(function () {
        time--;
        if (time > 0) {
          that.setData({
            text: `获取成功(${time})`
          })
        } else {
          clearInterval(Interval);
          that.setData({
            text: '重新发送',
          })
        }
      }, 1000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})