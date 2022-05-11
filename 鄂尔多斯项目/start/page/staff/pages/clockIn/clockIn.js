// page/staff/pages/clockIn/clockIn.js
import http from "../../../../request/staff"
import utils from "../../../../utils/utils"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "", //当前时间
    list: "", 
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    setInterval(() => {
      let time = utils.formathour(new Date());
      this.setData({
        time
      })
    }, 1000);
    this.request()
  },
  request(){
    http.clockInUser({
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      console.log(res);
      let {data,code,msg} = res.data;
      if(code == 200){
        this.setData({
          list:data
        })
      }else{
        wx.showToast({
          title: msg,
          mask: true,
          icon:"error"
        })
      }
    })
  },
  //点击打卡
  bindClock() {
    http.attendanceClockAdd({
      userId: wx.getStorageSync('userInfo').data.userId,
      time: this.data.time.substring(0,5)
    }).then(res => {
      this.request();
      this.setData({
        showModal: true
      })
    })
  },
  //跳转打卡详情页面
  bindClockDetail(){
    wx.navigateTo({
      url: '../clockDetail/clockDetail',
    })
  },
  //点击我知道了
  bindKnow(){
    this.setData({
      showModal:false
    })
    this.onShow()
  },
})