// page/staff/pages/repairRecord/repairRecord.js
import http from "../../../../request/staff"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    show: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },
  //获取数据
  request(){
    http.repairlist({
      userid: wx.getStorageSync('userInfo').data.userId,
      type: "0"
    }).then(res => {
      let {data,code,msg} = res.data;
      console.log(data);
      if(code == 200 && data.length>0){
        this.setData({
          show:false,
          list:data
        })
      }else{
        this.setData({
          show:true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  torepairDetail(e){
    let{id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../repairDetail/repairDetail?id=${id}`,
    })
  },
})