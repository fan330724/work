// page/tabbar/pages/my/index.js
import http from "../../../request/http";
import http1 from "../../../request/teacher";
import getUserStart from "../../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userText: "学员端",
    list: [],
    reimbursementlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userInfo').data.avatar) {
      this.setData({
        userinfo: {
          avatar: wx.getStorageSync('userInfo').data.avatar,
          nickName: wx.getStorageSync('userInfo').data.nickName,
        }
      })
    } else {
      this.setData({
        userinfo: {
          avatar: wx.getStorageSync('avatar').avatarUrl,
          nickName: wx.getStorageSync('userInfo').data.nickName,
        }
      })
    }
    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取授权头像信息
  getUserProfile() {
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success: (res) => {
        wx.setStorageSync("avatar", res.userInfo)
        this.onLoad()
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student") {
      this.request()
      this.setData({
        userText: '学员端'
      })
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1()
      this.setData({
        userText: '教师端'
      })
    } else if (getUserStart.getUserStart() == "staff") {
      this.setData({
        userText: '员工端'
      })
    } else if (getUserStart.getUserStart() == "leader") {
      this.setData({
        userText: '领导端'
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ifon()
    var selected = 3;
    let add = wx.getStorageSync('add');
    if (add == 3) {
      selected = 2
    } else {
      selected = 3
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected
      })
    }
  },
  // 学生端 获取数据
  request() {
    http.IofCourseCount({
      studentId: wx.getStorageSync("userInfo").data.userId
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.data
      })
    })
  },
  // 教师端 获取数据
  request1() {
    http1.IofCourseCount({
      teacherId: wx.getStorageSync("userInfo").data.userId
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.data.data
      })
    })
  },
  // 点击头像跳转个人信息
  tomyxinxi() {
    wx.navigateTo({
      url: '/pages/myxinxi/myxinxi',
    })
  },
  // 重置密码
  toreset() {
    wx.navigateTo({
      url: '../../resetPassword/resetPassword',
    })
  },
  // 退出当前账号
  exit() {
    wx.clearStorage()
    wx.reLaunch({
      url: '/pages/tabbar/index/index',
    })
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