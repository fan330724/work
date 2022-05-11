// page/staff/pages/clockDetail/clockDetail.js
import http from "../../../../request/staff"
import utils from "../../../../utils/utils"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"", //当前时间
    list:"", // 当天考勤数据
    goto:"", //上班时间
    after:"", // 下班时间
    mystatus: [],  // 状态  状态  0:未出勤 1:正常出勤 2:事假 3:病假 9:休息 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //获取单日数据
  request(dateTime){
    http.attendanceClockList({
      userId: wx.getStorageSync('userInfo').data.userId,
      dateTime,
    }).then(res => {
      console.log(res);
      let {data,code,msg} = res.data;
      let goto = data.gotoClockTime.substring(data.gotoClockTime.length-5);
      let after = data.afterClockTime.substring(data.afterClockTime.length-5);
      if(code == 200){
        this.setData({
          list:data,
          goto,
          after
        })
      }else{
        wx.showToast({
          title: msg,
          mask: true,
          icon:"none"
        })
      }
    })
  },
  //获取月份数据
  monthRequest(time){
    http.monthAttendanceList({
      userId: wx.getStorageSync('userInfo').data.userId,
      time
    }).then(res => {
      console.log(res);
      let {data} = res.data;
      this.setData({
        mystatus: data.status
      })
    })
  },
  onShow: function (){
    let time = utils.formatDate(new Date);
    this.setData({
      time
    })
    this.request(time)
    this.monthRequest(time.substring(0,7))
  },
  bindnextMonth(e){
    console.log(e);
    let {currentYear,currentMonth} = e.detail;
    let time =currentYear + '-' + currentMonth
    this.monthRequest(time)
  },
  bindprevMonth(e){
    console.log(e);
    let {currentYear,currentMonth} = e.detail;
    let time =currentYear + '-' + currentMonth
    this.monthRequest(time)
  },
  bindselectDate(e){
    console.log(e);
    let {date,status} = e.detail;
    this.request(date)
  }
})