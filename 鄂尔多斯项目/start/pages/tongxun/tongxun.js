// pages/tongxun/tongxun.js
import http from "../../request/http";
import getUserStart from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ifon();
    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student" || getUserStart.getUserStart() == "teacher") {
      this.request(wx.getStorageSync("userInfo").data.userId)
    } else if (getUserStart.getUserStart() == "leader") {
      this.request("")
    }
  },
  // 获取数据
  request(userId) {
    http.classPhone({
      userId
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200 && data.length > 0) {
        this.setData({
          show: false,
          list:data
        })
      } else {
        this.setData({
          show: true,
        })
      }
    })
  },
  //跳转通讯录列表页
  toTonxunDetail(e) {
    let {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `../tongxunDetail/tongxunDetail?id=${id}`,
    })
  }
})