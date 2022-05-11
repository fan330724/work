import http from "../../request/http";
import http1 from "../../request/teacher";
import getUserStart from "../../utils/http"
// pages/my/my.js
var app = getApp()
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
    this.setData({
      getUserStart: getUserStart.getUserStart(),
      userinfo: wx.getStorageSync('avatar')
    })

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
    }else if(getUserStart.getUserStart() == "leader"){
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
      url: '/page/student/pages/myxinxi/myxinxi',
    })
  },
  // 横向列表点击事件
  totabbar(e) {
    // var {
    //   id
    // } = e.currentTarget.dataset;
    // app.globalData.tabbar = id;
    // wx.switchTab({
    //   url: `../course/course`,
    // })
  },
  // 我的评价
  topin() {
    wx.navigateTo({
      url: '/page/student/pages/myappraise/myappraise',
    })
  },
  //添加评价
  toAddPin() {
    wx.navigateTo({
      url: '/page/student/pages/addPin/addpin',
    })
  },
  // 重置密码
  toreset() {
    wx.navigateTo({
      url: '../resetPassword/resetPassword',
    })
  },
  // 退出当前账号
  exit() {
    wx.clearStorage()
    wx.reLaunch({
      url: '../home/index',
    })
  },

  // 报修记录
  torepairRecord() {
    wx.navigateTo({
      url: '/page/staff/pages/repairRecord/repairRecord',
    })
  },
  // 报账提交
  bindPickerChange() {
    wx.navigateTo({
      url: `/page/staff/pages/account/account`,
    })
  },
  // 打卡
  toclockIn() {
    wx.navigateTo({
      url: '/page/staff/pages/clockIn/clockIn',
    })
  },
  // 审批
  toapprove() {
    wx.navigateTo({
      url: '/page/staff/pages/approve/approve',
    })
  },

  //点击跳转通讯录
  toTongXun() {
    wx.navigateTo({
      url: '../tongxun/tongxun',
    })
  },
  toapprase(){
    wx.navigateTo({
      url: '../apprase/apprase',
    })
  },
  onShareAppMessage: function () {

  },
})