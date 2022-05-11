// page/tabbar/pages/course/index.js
var app = getApp();
import http from '../../../request/http'
import http1 from '../../../request/teacher'
import http2 from '../../../request/staff'
import getUserStart from "../../../utils/http"
import leader from "../../../request/leader"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "1", //顶部切换下标
    show: true, //是否有数据
    list: [],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
  },
  //顶部切换
  tab(e) {
    var {
      id
    } = e.currentTarget.dataset
    this.ifon(id)
    this.setData({
      active: id,
    })
  },
  //什么端判断函数
  ifon(tabbar) {
    if (getUserStart.getUserStart() == "student") {
      this.request(tabbar)
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1(tabbar)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.ifon(this.data.active)
  },
  //学员端数据
  request(status) {
    http.IofCourse({
      studentId: wx.getStorageSync('userInfo').data.userId,
      status
    }).then(res => {
      let {
        data,
        code
      } = res.data;
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }
    })
  },
  //教师端数据
  request1(status) {
    http1.teacherIofCourse({
      teacherId: wx.getStorageSync('userInfo').data.userId,
      status
    }).then(res => {
      let {
        data,
        code
      } = res.data;
      console.log(res);
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.tabbar = null;
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})