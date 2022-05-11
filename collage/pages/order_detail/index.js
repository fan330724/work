// pages/order_detail/index.js
import {
  request
} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3 获取url上的type参数
    const {
      orderid
    } = currentPage.options;
    this.setData({
      orderRecordPId: orderid
    })
    this.request(orderid)
  },
  //获取数据
  request(orderRecordPId) {
    request({
      url: "toOrderRecordDetail",
      data: {
        orderRecordPId
      }
    }).then(res => {
      console.log(res);
      if (res.errorCode == -1) {
        this.setData({
          list: res.body.list[0]
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        })
      }
    })
  },
  //点击复制
  oncopy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success(res) {}
    })
  },
  //点击立即支付
  onprice(e) {
    let {
      orderid
    } = e.currentTarget.dataset;
    request({
      url: "toRequestPayAgin",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        orderId: orderid
      }
    }).then(res => {
      let {
        shopList
      } = res.body;
      this.payOrder(shopList.money, shopList.openId, shopList.orderNumber, orderid)
    })
  },

  //支付接口
  payOrder(money, openId, orderNumber, orderId) {
    request({
      url: "toPayOrder",
      data: {
        money,
        openId,
        orderNumber
      }
    }).then(res => {
      let {
        appid,
        nonceStr,
        sign,
        timeStamp
      } = res[0];
      let packages = res[0].package
      this.requestPayment(nonceStr, packages, sign, timeStamp, orderId)
    })
  },
  //微信支付api
  requestPayment(nonceStr, packages, paySign, timeStamp, orderId) {
    wx.requestPayment({
      nonceStr,
      package: packages,
      paySign,
      timeStamp,
      signType: "MD5",
      success(res) {
        // 8 支付成功了
        wx.navigateTo({
          url: '/pages/success/success?orderId=' + orderId
        });
      },
      fail(err) {
        // wx.navigateTo({
        //   url: '/pages/success/success'
        // });
        wx.navigateTo({
          url: '/pages/success/success?orderId=' + orderId
        });
      }
    })
  },

  //点击确认收货
  onsuccess(e) {
    let that = this;
    let {
      orderid
    } = e.currentTarget.dataset;
    wx.showModal({
      content: "您是否要确认收货？",
      success(res) {
        if (res.confirm) {
          that.shouhuo(orderid)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  //确认收货接口
  shouhuo(orderid) {
    request({
      url: "shouhuoOrder",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        orderId: orderid
      }
    }).then(res => {
      if (res.errorCode == -1) {
        wx.showToast({
          title: '收货成功',
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
          mask: true,
        })
      }
    })
  },
  //查看物流
  onkdPlugin(e){
    let {num} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `plugin://kdPlugin/index?num=${num}&appName=快乐赚赚&return=0`,
    })
  },
})