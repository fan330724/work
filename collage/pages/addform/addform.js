// 0 引入 用来发送请求的 方法 一定要把路径补全
import {
  request
} from "../../request/index.js";
Page({
  data: {
    checked: 0,
    cart: "点击选择收货地址",
    list: [],
  },
  // 页面开始加载 就会触发
  onLoad: function (options) {
    if (options.addressid) {
      this.setData({
        addressid:options.addressid
      })
      this.getAddress(options.addressid)
    }
  },
  //获取收货地址的详细信息
  getAddress(addressId) {
    request({
      url: "getAddressDetailById",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        addressId,
      }
    }).then(res => {
      if (res.errorCode == -1) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
        this.setData({
          list: res.body.addressDetail,
          cart: res.body.addressDetail.floorNum.split(","),
          checked: res.body.addressDetail.ifMr
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
  //是否设为默认地址
  handeItemChange(e) {
    let isChecked = e.currentTarget.dataset.checked;
    if (isChecked == "0" || isChecked == 0) { //即将选中   将其值设为true
      isChecked = 1;
    } else {
      return
    }
    this.setData({
      checked: isChecked
    });
  },
  //获取选择城市
  picker(t) {
    this.setData({
      cart: t.detail.value
    });
  },
  //点击保存收货地址
  formSubmit(e) {
    let {
      name,
      phone,
      picer,
      textarea
    } = e.detail.value;
    let n = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    if (name == "" || phone == "" || picer == "" || textarea == "") {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        mask: true
      })
    } else if (!n.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none",
        mask: true
      })
    } else {
      if(this.data.addressid){
        this.isChecked(this.data.addressid,name,phone,textarea,this.data.checked,picer)
      }else{
        this.addAddress(name,phone,picer,textarea)
      }
    }
  },
  //新增收货地址接口
  addAddress(name,phone,picer,textarea) {
    request({
      url: "addAddress",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        name,
        telephone: phone,
        remarks: textarea,
        ifMr: this.data.checked,
        floorNum: picer[0] + ',' + picer[1] + ',' + picer[2],
      }
    }).then(res => {
      if (res.errorCode == -1) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
        wx.nextTick(() => {
          wx.navigateBack({
            delta: 1,
          })
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
  //修改收货地址接口
  isChecked(addressId, name, telephone, remarks, ifMr,picer) {
    request({
      url: "updateAddress",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        addressId,
        name,
        telephone,
        remarks,
        ifMr,
        floorNum: picer[0] + ',' + picer[1] + ',' + picer[2],
      }
    }).then(res => {
      if (res.errorCode == -1) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
        wx.nextTick(() => {
          wx.navigateBack()
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
})