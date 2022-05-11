// pages/more/more.js
import http from '../../../../request/http'
import http1 from '../../../../request/teacher'
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
    if(options.text){
      wx.setNavigationBarTitle({
        title: options.text
      })
    }
    this.setData({
      getUserStart: getUserStart.getUserStart(),
      text: options.text
    })
    this.ifon()
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student") {
      this.request()
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1( wx.getStorageSync('userInfo').data.userId)
    } else if (getUserStart.getUserStart() == "staff") {

    }else if (getUserStart.getUserStart() == "leader"){
      this.request1()
    } 
  },
  request() {
    http.course({
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      let {
        data,
        code,
        msg
      } = res.data;
      console.log(data);
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        wx.showToast({
          title: msg,
          mask: true,
          icon: "none"
        })
        this.setData({
          show: true
        })
      }
    })
  },
  request1(teacherId) {
    http1.teacherCourse(
      {
        teacherId
      }
    ).then(res => {
      let {
        data,
        code,
        msg
      } = res.data;
      let {
        pastList,
        recentList
      } = data;
      if (code == 200) {
        if (this.data.text == "近期课程" && recentList.length > 0) {
          this.setData({
            list: recentList,
            show: false
          })
        } else if (this.data.text == "往期课程" && pastList.length > 0) {
          this.setData({
            list: pastList,
            show: false
          })
        } else {
          this.setData({
            show: true
          })
        }
      } else {
        wx.showToast({
          title: msg,
          mask: true,
          icon: "none"
        })
        this.setData({
          show: true
        })
      }
    })
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