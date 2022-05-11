// pages/login/login.js
import http from "../../request/http"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: true, //密码inputtype属性
    cellphone: "ceshi", //账号
    password: "123456", //密码
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
      http.login({
        username: cellphone,
        password: password
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: '登录成功',
            mask: true,
          })
          wx.setStorageSync('admin', res.data.data)
          setTimeout(()=> {
            wx.navigateTo({
              url: '../index/index',
            })
          },1500)
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

  onregist() {
    wx.navigateTo({
      url: '/pages/regist/regist',
    })
  }
})