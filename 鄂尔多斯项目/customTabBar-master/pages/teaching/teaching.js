// pages/teaching/teaching.js
import leader from "../../request/leader"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true, //是否有数据
    list: [],
    active: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.teacherlist()
  },
  //领导端数据
  teacherlist() {
    leader.teacherlist().then(res => {
      let list = res.data.rows;
      if (res.data.code == 200 && list.length > 0) {
        this.setData({
          list,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }
    })
  },
  toteacher(e) {
    wx.navigateTo({
      url: `/pages/teacher/teacher?id=${e.currentTarget.dataset.id}`,
    })
  },

  request(name) {
    leader.getMessage({
      name
    }).then(res => {
      let list = res.data.rows;
      if (res.data.code == 200 && list.length > 0) {
        this.setData({
          list,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }
    })
  },
  //顶部切换
  tab(e) {
    var {
      id,
      name
    } = e.currentTarget.dataset
    this.setData({
      active: id,
      list: null,
    })
    if (id != 1) {
      this.request(name)
    }else{
      this.teacherlist()
    }
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