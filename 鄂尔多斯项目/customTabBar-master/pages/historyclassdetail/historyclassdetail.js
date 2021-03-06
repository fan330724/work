// pages/historyclassdetail/historyclassdetail.js
import http from "../../request/http"
import getUserStart from "../../utils/http"
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
    let {classId} = options
    if(getUserStart.getUserStart() == 'student'){
      this.request1(classId)
    }else{
      this.request(classId)
    }
    
    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
  },
  request(classId){
    http.queryClassCourse({
      classId
    }).then(res => {
      console.log(res);
      this.setData({
        list:res.data.data
      })
    })
  },
  request1(classId){
    http.getSignInList({
      classId,
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      console.log(res);
      this.setData({
        list:res.data.data
      })
    })
  },
  toteacher(e){
    wx.navigateTo({
      url: `/pages/teacher/teacher?id=${e.currentTarget.dataset.id}`,
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