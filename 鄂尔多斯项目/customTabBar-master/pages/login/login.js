// pages/login/login.js
import http from "../../request/http";
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpType: true, //密码inputtype属性
    cellphone: "", //手机号
    password: "", //密码
    checkbox: "",
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
  onchecked(e) {
    this.setData({
      checkbox: e.detail.value
    })
  },
  onsubmit() {
    var {
      cellphone,
      password,
      checkbox
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
    } else if (checkbox.length < 1) {
      wx.showToast({
        title: '请阅读相关条例',
        icon: "error",
        mask: true
      })
    } else {
      http.login({
        username: cellphone,
        password: password
      }).then(res => {
        let {
          data
        } = res.data;
        if (res.data.code == 200) {
          this.getUserProfile()
          wx.setStorageSync('userInfo', { time: Date.now(), data });
          wx.switchTab({
            url: '/pages/tabbar/index/index',
          })
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

  //获取授权头像信息
  getUserProfile() {
    wx.getUserProfile({
      desc:"获取你的昵称、头像、地区及性别",
      success: (res) => {
        wx.setStorageSync("avatar",res.userInfo)
      },
      fail:(err) => {
        console.log(err);
      }
    })
  },
  topass() {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})