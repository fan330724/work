// pages/menu/menu.js
import getQueryString from "../../utils/http"
import http from "../../request/http"
import getUserStart from "../../utils/http"
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
    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
  },
  request(userId) {
    http.menu1({
      userId
    }).then(res => {
      console.log(res);
      let {
        data,
        msg,
        code
      } = res.data;
      if (code == 200 && data.length > 0) {
        data.map((item,index) => {
          item.name = item.name.split('，')
        })
        this.setData({
          list:data,
          date: data[0].menuTime
        })
      } else {
        wx.showToast({
          title: msg,
          mask: true,
          icon: "none"
        })
      }
    })
  },
  //扫一扫
  toscancode() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
        let id = getQueryString.getQueryString(res.result, 'id');
        if (id == '111' || id == '222') {
          wx.navigateTo({
            url: '/pages/scancode/scancode?id=' + id,
          })
        } else {
          wx.showToast({
            title: '请扫描正确的二维码',
            mask: true,
            icon: "none"
          })
        }
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
    if (getUserStart.getUserStart() == "student") {
      this.request(wx.getStorageSync('userInfo').data.userId)
    } else {
      this.request()
    }
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