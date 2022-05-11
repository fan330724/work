// pages/playback/playback.js
import http from '../../request/http';
import http1 from '../../request/teacher'
import getUserStart, { auth } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    videoSrc: '', // 视频
    videoCoverImg: '', // 视频封面图
    title: "", //标题
    list: "", //推荐课程数据列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.id,
      getUserStart: getUserStart.getUserStart()
    })
    this.getcourseVideo(options.id)
    this.ifon();
  },
  //获取视频
  getcourseVideo(courseId) {
    http.courseVideo({
      courseId
    }).then(res => {
      let {
        data
      } = res.data;
      if (data.length > 0) {
        this.setData({
          videoSrc: data[0].videoUrl,
          videoCoverImg: data[0].remark,
          title: data[0].videoName
        })
      } else {
        this.setData({
          videoSrc: null,
          videoCoverImg: null,
          title: null
        })
      }
    })
  },
  //什么端判断函数
  ifon() {
    if (getUserStart.getUserStart() == "student") {
      this.request()
    } else if (getUserStart.getUserStart() == "teacher") {
      this.request1()
    } else if (getUserStart.getUserStart() == "staff" || getUserStart.getUserStart() == "leader" || !auth()) {
      this.queryVideo()
    }
  },
  //获取推荐课程
  request() {
    http.IofCourse({
      studentId: wx.getStorageSync('userInfo').data.userId,
      status: "3"
    }).then(res => {
      let {
        data
      } = res.data;
      let arr = [];
      data.map((item, index) => {
        if (item.id == this.data.courseId) {
          return
        } else {
          arr.push(item)
        }
      })
      this.setData({
        list: arr
      })
    })
  },
  request1() {
    http1.teacherIofCourse({
      teacherId: wx.getStorageSync('userInfo').data.userId,
      status: "3"
    }).then(res => {
      let {
        data
      } = res.data;
      let arr = [];
      data.map((item, index) => {
        if (item.id == this.data.courseId) {
          return
        } else {
          arr.push(item)
        }
      })
      this.setData({
        list: arr
      })
    })
  },
  queryVideo() {
    http.queryVideo().then(res => {
      console.log(res);
      let {
        data
      } = res.data
      let arr = [];
      data.map((item, index) => {
        if (item.courseId == this.data.courseId) {
          return
        } else {
          arr.push(item)
        }
      })
      this.setData({
        list: arr
      })
    })
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  // 点击封面自定义播放按钮时触发
  bindplay() {
    this.setData({
      isShow: false
    })
    this.videoContext.play();
  },
  // 监听播放到末尾时触发
  bindended() {
    this.setData({
      isShow: true
    })
    this.videoContext.stop();
  },
  // 监听暂停播放时触发
  bindpause() {
    console.log('pause')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toplayback(e) {
    let {
      id
    } = e.currentTarget.dataset;
    this.onLoad({
      id
    })
    this.bindended()
    this.onReady()
    // wx.navigateTo({
    //   url: `../playback/playback?id=${id}`,
    // })
  },
})