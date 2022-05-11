// pages/workdetail/workdetail.js
import http from '../../request/staff'
import leader from '../../request/leader'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.type) {
      this.reqeust(options.type)
    }else{
      this.reqeust1()
    }
    wx.setNavigationBarTitle({
      title: options.name + '列表',
    })
    this.setData({
      name: options.name
    })
  },
  reqeust(type) {
    leader.getRepair({
      userid: wx.getStorageSync('userInfo').data.userId,
      type,
    }).then(res => {
      let {
        rows,
        code
      } = res.data
      if (code == 200 && rows.length > 0) {
        this.setData({
          list: rows,
          show: false
        })
      } else {
        this.setData({
          list: rows,
          show: true
        })
      }
    })
  },
  courseDetail(e) {
    wx.navigateTo({
      url: '/pages/repairDetail/repairDetail?id=' + e.detail.id + '&name=' + this.data.name,
    })
  },
  //获取请假数据
  reqeust1() {
    http.vacationlist({
      userid: wx.getStorageSync('userInfo').data.userId,
    }).then(res => {
      let {
        rows,
        code
      } = res.data;
      if (code == 200 && rows.length > 0) {
        this.setData({
          list: rows,
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