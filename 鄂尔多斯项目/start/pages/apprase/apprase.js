// pages/apprase/apprase.js
import leader from "../../request/leader"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reqeust()
  },
  //获取请假数据
  reqeust(){
    leader.vacationlist().then(res => {
      let {rows,code} = res.data;
      if(code == 200 && rows.length >0){
        this.setData({
          lists: rows,
          show:false
        })
      }else{
        this.setData({
          show:true
        })
      }
    })
  },
  //修改请假状态
  editvacation(e){
    let {status,id} = e.currentTarget.dataset;
    leader.editvacation({
      id,
      status
    }).then(res => {
      console.log(res);
      if(res.data.code == 200){
        wx.showToast({
          title: res.data.msg,
          mask: true
        })
        setTimeout(() => {
          this.onLoad()
        },1500)
      }else{
        wx.showToast({
          title: res.data.msg,
          mask: true
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