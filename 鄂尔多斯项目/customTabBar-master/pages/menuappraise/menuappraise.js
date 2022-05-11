// pages/menuappraise/menuappraise.js
import http from '../../request/http'
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
    this.setData({
      type: options.type,
    })

    if (options.type == '课程') {
      this.request1(options.id)
    } else if (options.type == '住宿') {
      this.request2(options.id)
    } else {
      this.request(wx.getStorageSync('userInfo').data.userId,2)
    }
    this.setData({
      userinfo: wx.getStorageSync('avatar')
    })
    wx.setNavigationBarTitle({
      title: this.data.type + '评价',
    })
  },

  request(userId,type) {
    http.getMinAppraiseList({
      userId,
      type
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data

      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }
    })
  },
  request1(courseId) {
    http.queryCourseAppraise({
      courseId
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }

    })
  },
  request2(classId) {
    http.getStayAppraiseList({
      classId
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        this.setData({
          show: true
        })
      }

    })
  },
  enlarge(e) {
    var {
      list,
      src
    } = e.currentTarget.dataset;
    console.log(list, src);
    wx.previewImage({
      urls: list,
      current: src
    })
  },
  return () {
    wx.navigateBack({
      delta: 1,
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