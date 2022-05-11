// pages/school/school.js
import http from "../../request/http"
import {formatRichText} from "../../utils/rictTextFormatRich"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },
  request(){
    http.getMinMessageList({
      messageType: 6,
    }).then(res => {
      console.log(res);
      let {data,msg,code} = res.data
      if (code == 200) {
        data[0].content = formatRichText(data[0].content)
        this.setData({
          list:data[0]
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