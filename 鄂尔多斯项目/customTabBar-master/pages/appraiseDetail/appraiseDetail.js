// page/student/pages/appraiseDetail/appraiseDetail.js
import http from '../../request/http'
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
    wx.setNavigationBarTitle({
      title:  options.type + '评价',
    })
    this.setData({
      userinfo: wx.getStorageSync('avatar')
    })
    let {
      id
    } = options;
    this.setData({
      courseId: id,
      type: options.type
    })
    
    if(options.type == '住宿'){
      this.getStayAppraiseList()
    }else{
      this.request()
    }
  },
  request() {
    http.getMinAppraiseList({
      userId: wx.getStorageSync('userInfo').data.userId,
      courseId: this.data.courseId
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data
      if (code == 200) {
        this.setData({
          item: data[0],
        })
      } else {
        wx.showToast({
          title: msg,
          icon:"none",
          mask: true,
        })
      }
    })
  },
  getStayAppraiseList(){
    http.getStayAppraiseList({
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      console.log(res);
      this.setData({
        item: res.data.data[0]
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