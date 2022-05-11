// pages/myappraise/myappraise.js
import http from '../../../../request/http'
import http1 from "../../../../request/teacher";
import getUserStart from "../../../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    show: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ifon()
    this.setData({
      userinfo: wx.getStorageSync('avatar')
    })
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student") {
      this.request(wx.getStorageSync('userInfo').data.userId)
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1()
    } else if (getUserStart.getUserStart() == "staff") {

    }else if(getUserStart.getUserStart() == "leader"){
      this.request()
    }
  },
  request(userId) {
    http.getMinAppraiseList({
      userId
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data

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
  request1() {
    http1.teacherMinAppraise({
      teacherId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data

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
  enlarge(e) {
    var {
      list,
      src
    } = e.currentTarget.dataset;
    console.log(list, src);
    wx.previewImage({
      urls: list,
      current: src
    })
  },
  return () {
    wx.navigateBack({
      delta: 1,
    })
  },
})