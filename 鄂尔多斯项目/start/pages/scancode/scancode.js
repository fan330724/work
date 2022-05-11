// pages/scancode/scancode.js
import http from "../../request/http"
import utils from "../../utils/utils"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //选择列表
    startChange: false, //选择状态
    time: "", //时间
    value: "", //选择内容
    remark: "", //按钮文字
    courseId: "", //课程id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },
  request() {
    http.courseList({
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      console.log(res.data.data);
      let {
        data,
        code,
        msg
      } = res.data;
      let arr = [];
      if (code == 200) {
        data.map((item, index) => {
          if (item.remark) {
            arr.push(item)
          } else {
            return
          }
        })
        this.setData({
          list: arr
        })
      } else {
        wx.showToast({
          title: msg,
          mask: true,
          icon: "none"
        })
      }
    })
  },
  //签到接口
  signIn(courseId, status) {
    http.signIn({
      courseId,
      userId: wx.getStorageSync('userInfo').data.userId,
      time: this.data.time,
      status
    }).then(res => {
      console.log(res);
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200) {
        wx.showToast({
          title: this.data.remark + '成功',
          mask:true,
        })
        setTimeout(() => {
          if(this.data.remark == "签到"){
            wx.navigateBack()
          }else{
            wx.redirectTo({
              url: `../../page/student/pages/appraise/appraise?id=${courseId}&teacherId=${this.data.teacherId}`,
            })
          }
        }, 1500);
      }else{
        wx.showToast({
          title: msg,
          mask: true,
          icon:"none"
        })
      }
    })
  },
  //选择的数据
  bindChange(e) {
    let {
      value
    } = e.detail;
    this.setData({
      value: this.data.list[value].name,
      startChange: true,
      remark: this.data.list[value].remark,
      courseId: this.data.list[value].id,
      teacherId: this.data.list[value].teacherId
    })
  },
  //点击签到签退按钮
  bindSignIn() {
    let {
      remark,
      courseId
    } = this.data;
    if (remark == "签到") {
      this.signIn(courseId, "1")
    }else if(remark == "签退"){
      this.signIn(courseId, "2")
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setInterval(() => {
      let time = utils.formatTime(new Date());
      this.setData({
        time
      })
    }, 1000);
  },
})