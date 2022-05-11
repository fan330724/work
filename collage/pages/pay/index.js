
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";
Page({
  data: {
    address: null,
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    ShoppingCartId: "",
    costPrice: 0,
    remark: "",
    oldOpenid:"",
    goodsid:"",
    num:"",
  },
  onLoad(options) {
    if (options.ShoppingCartId) {
      this.setData({
        ShoppingCartId: options.ShoppingCartId
      })
      this.getCart(this.data.ShoppingCartId)
    } else if (options.goodsid) {
      this.setData({
        goodsid: options.goodsid
      })
      if (options.oldOpenid) {
        this.setData({
          oldOpenid: options.oldOpenid
        })
      }
      this.getCartOne(this.data.goodsid,this.data.oldOpenid)
    }
  },
  onShow() {
    if (this.data.addressid) {
      this.getAddress(this.data.addressid)
    }
  },
  //获取购物车订单商品
  async getCart(shoppingCartId) {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "getGoodsToOrder",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        shoppingCartId
      }
    });
    let {
      shopList,
      addressList
    } = res.body;
    console.log(shopList, addressList)
    if (res.errorCode == -1) {
      // 1 总价格 总数量
      let totalPrice = 0;
      let costPrice = 0;
      let totalNum = 0;
      let ifNew = 0;
      shopList.forEach(v => {
        ifNew = v.ifNew;
        v.children.forEach(i => {
          costPrice += i.num * i.price
          totalPrice += i.num * i.price;
          totalNum += i.num;
        })
      })
      totalPrice = totalPrice - ifNew
      this.setData({
        cart: shopList,
        address: addressList,
        costPrice,
        totalPrice,
        totalNum,
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
        mask: true
      })
    }
  },
  //单个购买
  async getCartOne(goodsId,fxopenId) {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "getGoodNumToOrder",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        num:"1",
        goodsId,
        fxopenId
      }
    });
    let {
      shopList,
      addressList
    } = res.body;
    if (res.errorCode == -1) {
      // 1 总价格 总数量
      let totalPrice = 0;
      let costPrice = 0;
      let totalNum = 0;
      let ifNew = 0;
      let ShoppingCartId = "";
      let num = 0;
      shopList.forEach(v => {
        ifNew = v.ifNew;
        v.children.forEach(i => {
          console.log(i);
          costPrice += i.num * i.price
          totalPrice += i.num * i.price;
          totalNum += i.num;
          ShoppingCartId = i.shoppingCartId
          num = i.num
        })
      })
      totalPrice = totalPrice - ifNew
      this.setData({
        cart: shopList,
        address: addressList,
        costPrice,
        totalPrice,
        totalNum,
        ShoppingCartId,
        num,
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
        mask: true
      })
    }
  },
  //获取选择的收货地址
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
        let arr = [];
        arr.push(res.body.addressDetail)
        this.setData({
          address: arr,
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
  // 点击 支付 
  async handleOrderPay() {
    try {
      const orderParams = await request({
        url: "toAddOrderRecord",
        data: {
          openId: wx.getStorageSync('userinfo').openId,
          shoppingCartId: this.data.ShoppingCartId,
          addressId: this.data.address[0].addressId,
          payType: 1,
          remark: this.data.remark,
          orderPrice: this.data.totalPrice,
          kdPrice: this.data.cart[0].kdprice,
          fxopenid: this.data.oldOpenid,
          num: this.data.num
        }
      })
      if (orderParams.errorCode == -1) {
        let {
          orderMap
        } = orderParams.body
        let {
          openId,
          orderNumber,
          money,
          orderId
        } = orderMap
        const payOrder = await request({
          url: "toPayOrder",
          data: {
            openId,
            money,
            orderNumber,
          }
        })
        let {
          nonceStr,
          sign,
          timeStamp
        } = payOrder[0];
        let packages = payOrder[0].package
        this.requestPayment(nonceStr, packages, sign, timeStamp, orderId)
      } else {
        wx.showToast({
          title: orderParams.msg,
          mask: true,
          icon: "none"
        })
      }
    } catch (error) {
      await showToast({
        title: "支付失败"
      })
      console.log(error);
    }
  },
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
        wx.navigateTo({
          url: '/pages/success/success'
        });
      }
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  //跳转收货地址
  getaddress() {
    wx.navigateTo({
      url: '../address/address?id=1',
    })
  },
})