// pages/index/index.js
import http from "../../request/http"
import http1 from "../../request/teacher"
import http2 from "../../utils/http"
import getUserStart from "../../utils/http"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperTap: [],
    list: [],
    pastList: [], //教师端 往期
    recentList: [], //教师端 近期
    ToRemind: false, //提示弹窗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.SwiperTap()
    if (getUserStart.getUserStart() == "student") {
      this.request()
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1(wx.getStorageSync('userInfo').data.userId)
    } else if (getUserStart.getUserStart() == "staff") {
      wx.setTabBarItem({
        index: 1,
        text: '任务',
      })
    } else if(getUserStart.getUserStart() == "leader"){
      this.request1()
      wx.setTabBarItem({
        index: 1,
        text: '教学科研',
      })
    }

    this.setData({
      getUserStart: getUserStart.getUserStart()
    })
    
  },
  onShow() {
    if (getUserStart.getUserStart() == "student") {
      this.studentToRemind()
    } else if (getUserStart.getUserStart() == "teacher") {
      this.teacherToRemind()
    }
  },
  //获取学员端课程开始提醒接口
  studentToRemind() {
    http.studentToRemind({
      studentId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      let {
        data
      } = res.data;
      if (data.audit) {
        this.setData({
          audit: data.audit,
          ToRemind: true
        })
        setTimeout(() => {
          this.setData({
            ToRemind: false
          })
        }, 5000);
      } else {
        this.setData({
          ToRemind: false
        })
      }
    })
  },
  //获取教师端课程开始提醒接口
  teacherToRemind() {
    http1.studentToRemind({
      teacherId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      console.log(res);
      let {
        data
      } = res.data;
      if (data.audit) {
        this.setData({
          audit: data.audit,
          ToRemind: true
        })
        setTimeout(() => {
          this.setData({
            ToRemind: false
          })
        }, 5000);
      } else {
        this.setData({
          ToRemind: false
        })
      }
    })
  },
  request() {
    http.course({
      limit: 2,
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      // console.log(res);
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200) {
        this.setData({
          list: data
        })
      } else {
        wx.showToast({
          title: msg,
          mask: true,
          icon: 'none'
        })
      }

    })
  },
  request1(teacherId) {
    http1.teacherCourse({
      teacherId,
      limit: 2
    }).then(res => {
      let {
        data,
        code,
        msg
      } = res.data;
      let {
        pastList,
        recentList
      } = data;
      if (code == 200) {
        this.setData({
          pastList,
          recentList
        })
      } else {
        wx.showToast({
          title: msg,
          mask: true,
          icon: 'none'
        })
      }
    })
  },

  SwiperTap() {
    http.getMinMessageList({
      messageType: 5,
      userId: wx.getStorageSync('userInfo').data.userId
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

  //扫一扫
  toscancode() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res);
        let id = http2.getQueryString(res.result, 'id');
        if (id == '111') {
          wx.navigateTo({
            url: '../scancode/scancode',
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
  //点击资讯
  tomall() {
    wx.navigateTo({
      url: '/page/student/pages/information/information',
    })
  },
  //点击消息
  tonews() {
    wx.navigateTo({
      url: '/page/student/pages/news/news',
    })
  },
  //点击更多
  onmore(e) {
    console.log(e);
    let {
      text
    } = e.currentTarget.dataset
    if (text) {
      wx.navigateTo({
        url: `/page/student/pages/more/more?text=${text}`,
      })
    } else {
      wx.navigateTo({
        url: '/page/student/pages/more/more',
      })
    }

  },
  //点击轮播图
  onSwiperTap(e) {
    let {
      id
    } = e.target.dataset;
    wx.navigateTo({
      url: `../../page/student/pages/informationDetail/informationDetail?id=${id}`,
    })
  },
  //点击报修
  torepair() {
    wx.navigateTo({
      url: '../../page/staff/pages/repair/repair',
    })
  },
  //学校简介
  toschool() {
    wx.navigateTo({
      url: '../school/school',
    })
  },
  //报修报账
  toleader(){
    wx.navigateTo({
      url: '../leader/leader',
    })
  },
  //转发函数
  onShareAppMessage: function () {
    
  },
})