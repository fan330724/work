// pages/myxinxi/myxinxi.js
import http from '../../../../request/http'
import http1 from "../../../../request/teacher";
import getUserStart from "../../../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      this.request()
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1()
    } else if (getUserStart.getUserStart() == "staff") {

    }
  },
  request() {
    http.personalCenter(
      wx.getStorageSync('userInfo').data.userId
    ).then(res => {
      console.log(res);
      this.setData({
        list: res.data.data
      })
    })
  },
  request1() {
    http1.personalCenter({
        userId: wx.getStorageSync('userInfo').data.userId
      }
    ).then(res => {
      console.log(res);
      this.setData({
        list: res.data.data
      })
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