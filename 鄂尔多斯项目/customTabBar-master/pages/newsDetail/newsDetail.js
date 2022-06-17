// page/student/pages/newsDetail/newsDetail.js
import http from '../../request/http'
import {
  formatRichText
} from "../../utils/rictTextFormatRich"
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
    let {
      id,
      title
    } = options;
    wx.setNavigationBarTitle({
      title,
    })
    this.request(id)
  },
  request(type) {
    http.getMinMessageList({
      messageType: type,
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200 && data.length > 0) {
        var arr = [];
        data.map((item, index) => {
          arr.push({
            content: formatRichText(item.content),
            createTime: item.createTime.substring(0, 10),
            title: item.title
          })

        })
        this.setData({
          list: arr,
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