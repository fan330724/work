// page/student/pages/newsDetail/newsDetail.js
import http from '../../../../request/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        title: "报名通过审核",
        text: "已安排您到，美食广场三层就餐，请立即前已安排您到，美食广场三层就餐，请立即前往往"
      },
      {
        title: "干部培训课",
        text: "已安排您到，美食广场三层就餐，请立即前已安排您到，美食广场三层就餐，请立即前往往"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id,
      title
    } = options;
    wx.setNavigationBarTitle({
      title,
    })
    this.request(id)
  },
  request(type) {
    http.getMinMessageList({
      messageType: type,
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      let {
        data
      } = res.data;
      console.log(data);
      var arr = [];
      data.map((item, index) => {
        arr.push({
          content: item.content,
          createTime: item.createTime.substring(0, 10),
          title: item.title
        })

      })
      this.setData({
        list: arr
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