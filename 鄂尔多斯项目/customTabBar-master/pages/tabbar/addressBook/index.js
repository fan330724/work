// page/tabbar/pages/addressBook/index.js
import http from "../../../request/http";
import getUserStart from "../../../utils/http"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    active: 3,
    list: null,
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student" || getUserStart.getUserStart() == "teacher") {
      this.request(wx.getStorageSync("userInfo").data.userId)
    } else if (getUserStart.getUserStart() == "leader" || getUserStart.getUserStart() == "staff") {
      if (this.data.active == 3) {
        this.request1()
      } else {
        this.request("")
      }

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
          list: data
        })
      } else {
        this.setData({
          show: true,
        })
      }
    })
  },
  request1() {
    http.Phone().then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200 && data.length > 0) {
        data.map((item, index) => {
          item['tel'] = item.phonenumber
        })
        this.setData({
          show: false,
          list: data
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
    let {
      id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../../tongxunDetail/tongxunDetail?id=${id}`,
    })
  },
  //顶部切换
  tab(e) {
    var {
      id
    } = e.currentTarget.dataset
    this.setData({
      active: id,
      list: null,
    })
    if (id == 3) {
      this.request1()
    } else {
      this.request("")
    }
  },
  onPhone(e) {
    let {
      phone
    } = e.detail;
    wx.makePhoneCall({
      phoneNumber: phone,
      success(res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.ifon();
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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