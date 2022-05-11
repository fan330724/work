// pages/home/index.js
import http from "../../request/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperTap: [],
    active: 0, //顶部切换下标
    show: true,
    tabbar: [],
    list: [],
    height: "",
    centerList: [{
        image: "/images/jianjie.png",
        text: "中心简介",
        url: "/pages/school/school"
      },
      {
        image: "/images/keyan.png",
        text: "教学科研",
        url: "/pages/teaching/teaching"
      },
      {
        image: "/images/zhusu1.png",
        text: "住宿情况",
        url:"/pages/stay/stay"
      },
    ], // 中间横向列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.SwiperTap()
    this.getTabBar()
    this.getheight()
  },
  SwiperTap() {
    http.getMinMessageList({
      messageType: 5,
    }).then(res => {
      // console.log(res);
      let {
        data,
        msg,
        code
      } = res.data
      if (code == 200) {
        this.setData({
          swiperTap: data
        })
      }
    })
  },
  //点击轮播图
  onSwiperTap(e) {
    let {
      id
    } = e.target.dataset;
    wx.navigateTo({
      url: `../../pages/informationDetail/informationDetail?id=${id}`,
    })
  },
  //点击立即登录
  toLogin() {
    wx.reLaunch({
      url: '../login/login',
    })
  },
  getTabBar() {
    http.getMinColumnList().then(res => {
      let {
        data
      } = res.data;
      this.setData({
        tabbar: data,
        active: data[0].id
      })
      this.request(data[0].id)
    })
  },
  getheight() {
    var that = this
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.tab').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为myText的元素的信息 的数组
      let top = res[0].top;
      wx.getSystemInfo({
        success(res) {
          var height = (res.windowHeight - (top + 70)) + "px"
          that.setData({
            height
          })
        }
      })
    })
  },
  //顶部切换
  tab(e) {
    var {
      id
    } = e.currentTarget.dataset
    this.setData({
      active: id,
    })
    this.request(id)
  },

  //获取资讯列表
  request(id) {
    http.getMinColmnDetailList({
      columnId: id
    }).then(res => {
      let {
        data,
        code
      } = res.data;
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show: false
        })
      } else {
        this.setData({
          show: true
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