import http from "../../../../request/http"
import {formatRichText} from "../../../../utils/rictTextFormatRich"
// page/student/pages/informationDetail/informationDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options
    this.request(id)
  },
  request(id) {
    http.getSingleMessage({
      id
    }).then(res => {
      console.log(res);
      let {
        data
      } = res.data;
      this.setData({
        list: {
          title: data.title,
          remark: data.remark,
          createTime: data.createTime.substring(0, 10),
          content: formatRichText(data.content)
        }
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