// pages/bd/bd.js
import {request} from "../../request/index"
let app = getApp()
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

  },
  onbd(){
    request({
      url:"toUserSignUp",
      data:{
        openId:wx.getStorageSync('userinfo').openId
      }
    }).then(res => {
      console.log(res);
      if(res.errorCode == -1){
        wx.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        })
        let userinfo = wx.getStorageSync('userinfo');
        userinfo.ifBd = 1;
        wx.setStorageSync('userinfo', userinfo)
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          mask: true
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