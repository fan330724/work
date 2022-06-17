// page/tabbar/pages/index/index.js
var listData = {
  listData1: [{
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
      image: "/images/banji.png",
      text: "历史班级",
      url: "/pages/historyclass/historyclass"
    },
    {
      image: "/images/jianjie.png",
      text: "资讯",
      url: "/pages/information/information"
    },
    {
      image: "/images/zhusu1.png",
      text: "后勤简介",
      url: "/pages/stay/stay"
    },
    {
      image: "/images/caipu.png",
      text: "今日菜谱",
      url: "/pages/menu/menu"
    },
    {
      image: "/images/zhusu1.png",
      text: "我的住宿",
      url: "/pages/stopat/stopat"
    },
  ],
  listData2: [{
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
      image: "/images/banji.png",
      text: "历史班级",
      url: "/pages/historyclass/historyclass"
    },
    {
      image: "/images/jianjie.png",
      text: "资讯",
      url: "/pages/information/information"
    },
    {
      image: "/images/caipu.png",
      text: "今日菜谱",
      url: "/pages/menu/menu"
    },
    {
      image: "/images/zhusu1.png",
      text: "后勤简介",
      url: "/pages/stay/stay"
    },

  ],
  listData3: [{
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
      text: "后勤简介",
      url: "/pages/stay/stay"
    },
    {
      image: "/images/jianjie.png",
      text: "资讯",
      url: "/pages/information/information"
    },
    {
      image: "/images/caipu.png",
      text: "今日菜谱",
      url: "/pages/menu/menu"
    },
    {
      image: "/images/anfang.png",
      text: "校园安防"
    },
    {
      image: "/images/shenpi.png",
      text: "工作审批",
      url: "/pages/work/work"
    },
  ],
  listData4: [{
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
      text: "后勤简介",
      url: "/pages/stay/stay"
    },
    {
      image: "/images/jianjie.png",
      text: "资讯",
      url: "/pages/information/information"
    },
  ]
}

import getUserStart from "../../../utils/http"
import getQueryString from "../../../utils/http"
import http from "../../../request/http"
import {
  auth
} from "../../../utils/http"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperTap: [], //轮播图数据
    centerList: [], // 中间横向列表
    name: "", //名称
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX,
    getUserStart: "", //当前是什么端
    queryVideo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (auth()) {
      this.ifon()
      let name = wx.getStorageSync('userInfo').data.nickName;
      this.setData({
        name,
        getUserStart: getUserStart.getUserStart()
      })
    } else {
      this.setData({
        centerList: listData.listData4
      })
    }
    this.SwiperTap()
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student") {
      this.setData({
        centerList: listData.listData1
      })
    } else if (getUserStart.getUserStart() == "teacher") {
      this.setData({
        centerList: listData.listData2
      })
    } else if (getUserStart.getUserStart() == "staff") {
      listData.listData3.find(x => x.text == '工作审批').url = '/pages/work/work';
      this.setData({
        centerList: listData.listData3
      })
    } else if (getUserStart.getUserStart() == "leader") {
      listData.listData3.find(x => x.text == '工作审批').url = '/pages/leader/leader';
      this.setData({
        centerList: listData.listData3
      })
    }
  },
  //获取轮播图数据
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
  queryVideo() {
    http.queryVideo({
      remark: 2
    }).then(res => {
      console.log(res);
      let {
        data
      } = res.data
      this.setData({
        queryVideo: data
      })
    })
  },
  getMinMessage() {
    http.getMinMessage({}).then(res => {
      console.log(res);
      this.setData({
        getMinMessage: res.data.data
      })
    })
  },
  //点击轮播图
  onSwiperTap(e) {
    let {
      id
    } = e.target.dataset;
    wx.navigateTo({
      url: `/pages/informationDetail/informationDetail?id=${id}`,
    })
  },
  //跳转消息
  tonews() {
    if (auth()) {
      wx.navigateTo({
        url: '/pages/news/news',
      })
    } else {
      wx.showModal({
        title: "登录",
        content: "您还未登录，请先登录",
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }
  },
  //扫一扫
  toscancode() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
        let id = getQueryString.getQueryString(res.result, 'id');
        if (id == '111' || id == '222') {
          wx.navigateTo({
            url: '../../scancode/scancode?id=' + id,
          })
        } else {
          wx.showToast({
            title: '请扫描正确的二维码',
            mask: true,
            icon: "none"
          })
        }
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
    this.getMinMessage()
    this.queryVideo()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
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