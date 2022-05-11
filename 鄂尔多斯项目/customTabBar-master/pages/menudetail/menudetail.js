// pages/menudetail/menudetail.js
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
    if (getUserStart.getUserStart() == 'student' || getUserStart.getUserStart() == 'teacher') {
      this.request(wx.getStorageSync('userInfo').data.userId)
    } else {
      this.request()
    }
  },
  request(userId) {
    http.menuSignin1({
      userId
    }).then(res => {
      console.log(res);
      let {
        data,
        msg,
        code
      } = res.data;
      let name = ""
      data.map((item, index) => {
        switch (item.menuStatus) {
          case '1':
            name = '早饭';
            break;
          case '2':
            name = '午饭';
            break;
          case '3':
            name = '晚饭';
            break;
        }
        item.name = name
      })
      this.setData({
        list: data
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