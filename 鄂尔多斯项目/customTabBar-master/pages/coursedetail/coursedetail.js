// pages/coursedetail/coursedetail.js
import http from "../../request/http"
import http1 from "../../request/teacher"
import getUserStart from "../../utils/http"
import {formatRichText} from "../../utils/rictTextFormatRich"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    courseId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.id,
      getUserStart:getUserStart.getUserStart()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ifon()
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student") {
      this.request()
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1()
    } else if (getUserStart.getUserStart() == "staff") {

    }else if(getUserStart.getUserStart() == "leader"){
      this.request1()
    }
  },
  request() {
    http.courseDetails({
      courseId: this.data.courseId,
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      let data = res.data.data;
      data.introduce = formatRichText(data.introduce)
      this.setData({
        list: data
      })
    })
  },
  request1() {
    http1.teacherCourseDetails({
      courseId: this.data.courseId,
    }).then(res => {
      console.log(res);
      let data = res.data.data;
      this.setData({
        list: data
      })
    })
  },

  //点击立即报名
  toadd() {
    var that = this
    http.add({
      userId: wx.getStorageSync('userInfo').data.userId,
      courseId: this.data.courseId,
    }).then(res => {
      console.log(res);
      let {
        msg,
        code
      } = res.data
      wx.showToast({
        title: msg,
        mask: true,
      })
      setTimeout(() => {
        that.request()
      }, 1000)
    })
  },
  //点击查看评价
  onmyappraise(e) {
    let {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `../appraiseDetail/appraiseDetail?id=${id}&type=课程`,
    })
  },
  //点击去评价
  onappraise(e) {
    console.log(e);
    let {
      id,
      teacherid
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../appraise/appraise?id=${id}&teacherId=${teacherid}`,
    })
  }
})