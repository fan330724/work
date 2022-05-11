// pages/stopat/stopat.js
import getUserStart from "../../utils/http"
import http from "../../request/http";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    show: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getUserStart:getUserStart.getUserStart(),
      classId:options.id
    })
  },
  request(userId,classId){
    http.queryStayList({
      userId,
      classId
    }).then(res => {
      console.log(res);
      let {
        data,
        code
      } = res.data;
      if(code == 200 && data.length > 0){
        this.setData({
          list:data,
          show: false
        })
      }else{
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
    if(this.data.classId){
      this.request('', this.data.classId)
    }else{
      this.request(wx.getStorageSync('userInfo').data.userId)
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