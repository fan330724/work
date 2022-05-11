import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    orderId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.orderId){
      this.request(options.orderId)
      this.setData({
        orderId:options.orderId
      })
    }else{
      return
    }
  },
  async request(orderRecordPId){
    let list = await request({
      url:"toOrderRecordDetail",
      data:{orderRecordPId}
    })
    console.log(list);
    this.setData({
      list:list.body.list[0]
    })
  },
  //支付失败返回
  toreturn(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  //支付成功查看
  toOrder(){
    wx.navigateTo({
      url: `../order_detail/index?orderid=${this.data.orderId}`,
    })
  },
})