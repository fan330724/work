// pages/leader/leader.js
let app = getApp()
import leader from '../../request/leader'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "0", //顶部切换下标
    show: true, //是否有数据
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //顶部切换
  tab(e) {
    var {
      id
    } = e.currentTarget.dataset
    this.setData({
      active: id,
    })
    this.reqeust(this.data.active)
  },
  reqeust(type){
    leader.getRepair({
      type,
    }).then(res => {
      let {rows,code} = res.data
      if(code == 200 && rows.length > 0){
        this.setData({
          list:rows,
          show: false
        })
      }else{
        this.setData({
          list:rows,
          show: true
        })
      }
    })
  },
  courseDetail(e){
    wx.navigateTo({
      url: '/page/staff/pages/repairDetail/repairDetail?id=' + e.detail.id,
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
    this.reqeust(this.data.active)
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