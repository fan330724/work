// 0 引入 用来发送请求的 方法 一定要把路径补全
import {
  request
} from "../../request/index.js";
import {
  getStorage
} from "../../utils/asyncWx"
let app = getApp()
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航 数组
    catesList: [],
    //商品列表数组
    GoodsList: [],
    start: false, //开启关闭弹窗
    popList: {}, //弹窗数据
  },
  // 页面开始加载 就会触发
  onLoad: function (options) { 
  },
  onShow() {
    this.getSwiperList();
    this.getCateList();
    this.getGoodsList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
        url: "getBannerList"
      })
      .then(result => {
        this.setData({
          swiperList: result.body.bannerList
        })
      })
  },
  // 获取 分类导航数据
  getCateList() {
    request({
        url: "getClassifyList"
      })
      .then(result => {
        this.setData({
          catesList: result.body.classifyList
        })
      })
  },
  //获取 商品列表
  getGoodsList() {
    request({
        url: "getMainGoodsList"
      })
      .then(result => {
        console.log(result);
        let ifBd = wx.getStorageSync('userinfo').ifBd
        result.body.goodsList.map(v=> {
          v['ifBd'] = ifBd
        })
        this.setData({
          GoodsList: result.body.goodsList
        })
      })
  },
  //点击出现加入购物车弹窗
  addCart(e) {
    let {
      list
    } = e.detail
    getStorage((res) => {
      this.setData({
        start: true,
        popList: list
      })
    }, (err) => {
      this.setData({
        start: false,
        popList: {}
      })
    })
  },
  //点击开启关闭弹窗
  close() {
    this.setData({
      start: !this.data.start
    })
  },
  toswatch(e) {
    let {
      baseurl
    } = e.currentTarget.dataset;
    app.data.baseUrl = baseurl
    wx.switchTab({
      url: '../category/index',
    })
  }
})