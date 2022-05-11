import http from "../../request/http"

// pages/detail/detail.js
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
    this.request(options.id)
    this.setData({
      id: options.id
    })
  },
  request(id) {
    http.listDetail(id).then(res => {
      this.setData({
        list: res.data.data
      })
    })
  },
  onsubmit(e) {
    let {
      value
    } = e.detail;
    console.log(value);
    let phoneRule = /^1(3|4|5|6|7|8|9)\d{9}$/;
    let rule = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (this.isObjEmpty(value)) {
      wx.showToast({
        title: '请输入完整信息',
        mask: true,
        icon: "error"
      })
    } else if (value.手机号 && !phoneRule.test(value.手机号)) {
      wx.showToast({
        title: '请输入正确的手机号',
        mask: true,
        icon: 'none'
      })
    } else if (value.邮箱 && !rule.test(value.邮箱)) {
      wx.showToast({
        title: '请输入正确的邮箱',
        mask: true,
        icon: 'none'
      })
    } else {
      http.addContent({
        controlnId: this.data.id,
        userId: wx.getStorageSync('admin').userId,
        val: e.detail.value
      }).then(res => {
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          mask: true
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
    }

    // if (this.isObjEmpty(value)) {
    //   wx.showToast({
    //     title: '请输入完整信息',
    //     mask: true,
    //     icon: "error"
    //   })
    // } else {
    //   //将对象转为数组
    //   var arr = [];
    //   for (let key in value) {
    //     let dict = {};
    //     dict[key] = value[key]
    //     arr.push(dict)
    //   }
    //   //获取数组对象的键值对
    //   var array = []
    //   arr.map((item, index) => {
    //     var keys = Object.keys(item)[0];
    //     var values = item[keys];
    //     if (keys == '手机号') {
    //       let phoneRule = /^1(3|4|5|6|7|8|9)\d{9}$/;
    //       if (!phoneRule.test(values)) {
    //         wx.showToast({
    //           title: '请输入正确的手机号',
    //           mask: true,
    //           icon: 'none'
    //         })
    //       }
    //     } else if (keys == '邮箱') {
    //       let rule = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    //       if (!rule.test(values)) {
    //         wx.showToast({
    //           title: '请输入正确的邮箱',
    //           mask: true,
    //           icon: 'none'
    //         })
    //       }
    //     }
    //     var info = {};
    //     info["name"] = keys;
    //     info["values"] = values;
    //     array.push(info);
    //   })
    // }
    // let arr = [];
    // arr.push(e.detail.value)
    // http.addContent({
    //   controlnId: this.data.id,
    //   userId: wx.getStorageSync('admin').userId,
    //   val:e.detail.value
    // }).then(res => {
    //   console.log(res);
    //   wx.showToast({
    //     title: res.data.msg,
    //     mask: true
    //   })
    //   setTimeout(() => {
    //     wx.navigateBack()
    //   },1500)
    // })
  },
  isObjEmpty(obj) {
    for (var k in obj) {
      if (!obj[k]) {
        return true;
      }
    }
    return false;
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onjilu() {
    wx.navigateTo({
      url: '/pages/jilu/jilu?id=' + this.data.id,
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