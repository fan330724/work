// pages/tongxunDetail/tongxunDetail.js
import http from "../../request/http";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request(options.id)
  },
  request(pid){
    http.addressBook({
      pid
    }).then(res => {
      console.log(res);
      let {data} = res.data;
      let arr = [];
      data.map((item,index) => {
        arr.push({
          name: item.nick_name,
          tel: item.phonenumber,
          
        })
      })
      this.setData({
        list:arr
      })
    })
  },
  onPhone(e){
    let {phone} = e.detail;
    wx.makePhoneCall({
      phoneNumber: phone,
      success(res){
        console.log(res);
      }
    })
  }
})