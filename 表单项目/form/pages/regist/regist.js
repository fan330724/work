// pages/regist/regist.js
import http from "../../request/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: true, //密码inputtype属性
    cellphone: "", //账号
    password: "", //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击小眼睛
  toshow() {
    this.setData({
      inpType: !this.data.inpType
    })
  },
  //获取输入的手机号
  registInput(e) {
    var phoneNumber = e.detail.value
    this.setData({
      cellphone: phoneNumber
    })
  },
  //获取输入密码
  topassword(e) {
    var password = e.detail.value
    this.setData({
      password: password
    })
  },
  onsubmit() {
    var {
      cellphone,
      password,
    } = this.data;
    if (cellphone == "") {
      wx.showToast({
        title: '请输入账号',
        icon: "error",
        mask: true
      })
    } else if (password == "") {
      wx.showToast({
        title: '请输入密码',
        icon: "error",
        mask: true
      })
    } else {
      http.regist({
        userName: cellphone,
        password: password
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: '注册成功',
            mask: true,
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            mask: true,
            icon: "none"
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})