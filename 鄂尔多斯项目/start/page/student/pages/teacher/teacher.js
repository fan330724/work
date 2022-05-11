// pages/teacher/teacher.js
import http from '../../../../request/http'
import {formatRichText} from "../../../../utils/rictTextFormatRich"
import getUserStart from "../../../../utils/http"
import leader from '../../../../request/leader'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:{},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let value = options.id;
    if(getUserStart.getUserStart() == "leader"){
      this.leader(value)
    }else{
      this.reqeust(value)
    }
  },
  reqeust(value){
    http.teacheretails(value).then(res => {
      let {data} = res.data
      data.Introduction = formatRichText(data.Introduction)
      this.setData({
        date:data
      })
    })
  },
  leader(id){
    leader.teacherlistId(id).then(res => {
      let {data} = res.data
      data.introduce = formatRichText(data.introduce)
      this.setData({
        date:data
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