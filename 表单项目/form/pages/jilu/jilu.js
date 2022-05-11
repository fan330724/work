import http from "../../request/http"

// pages/jilu/jilu.js
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
  },
  request(id) {
    http.getContent({
      controlnId: id,
      userId: wx.getStorageSync('admin').userId,
    }).then(res => {
      let {
        data
      } = res.data;

      data.map((item, index) => {
        let val = JSON.parse(item.val)
        //将json对象转为数组
        var arr = [];
        for (let key in val) {
          let dict = {};
          dict[key] = val[key]
          arr.push(dict)
        }
        //获取数组对象的键值对
        var array = []
        arr.map((item, index) => {
          var keys = Object.keys(item)[0];
          var values = item[keys];
          var info = {};
          info["name"] = keys;
          info["values"] = values;
          array.push(info);
        })
        item.val = array
      })
      this.setData({
        list: data
      });
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