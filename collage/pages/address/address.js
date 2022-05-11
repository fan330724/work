// 0 引入 用来发送请求的 方法 一定要把路径补全
import {
  request
} from "../../request/index.js";
Page({
  data: {
    list: [],
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id:options.id
      })
    }
  },
  onShow() {
    this.getlist()
  },
  getlist() {
    request({
      url: "toAddressList",
      data: {
        openId: wx.getStorageSync('userinfo').openId
      }
    }).then(res => {
      console.log(res);
      this.setData({
        list: res.body.addressList
      })
    })
  },
  toform() {
    wx.navigateTo({
      url: '../addform/addform',
    })
  },
  //修改收货地址接口
  isChecked(addressId, name, telephone, picer,remarks, ifMr) {
    request({
      url: "updateAddress",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        addressId,
        name,
        telephone,
        floorNum: picer,
        remarks,
        ifMr,
      }
    }).then(res => {
      if (res.errorCode == -1) {
        this.onShow()
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
      }
    })
  },
  //是否设置为默认
  handeItemChange(e) {
    let {
      checked,
      list
    } = e.currentTarget.dataset;
    if (checked == "0" || checked == 0) {
      list.ifMr = 1;
    } else {
      return
    }
    this.isChecked(list.addressId, list.name, list.telephone, list.floorNum,list.remarks, list.ifMr)
  },
  //删除收货地址
  bindDelete(e) {
    let {addressid} = e.currentTarget.dataset
    request({
      url: "deleteAddress",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        addressId:addressid,
      }
    }).then(res => {
      if (res.errorCode == -1) {
        this.onShow()
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
      }
    })
  },
  //点击编辑
  toaddform(e){
    let {addressid} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../addform/addform?addressid=' + addressid,
    })
  },
  tosuccess(e) {
    let {addressid} = e.currentTarget.dataset;
    if(this.data.id){
      let pages = getCurrentPages();
      console.log(pages)
      let prePage = pages[pages.length-2];
      console.log(prePage)
      prePage.setData({
        addressid
      })
      wx.navigateBack()
    }else{
      return
    }
  },
})