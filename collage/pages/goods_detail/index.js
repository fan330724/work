import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  formatRichText
} from '../../utils/rictTextFormatRich'
import {
  getStorage
} from "../../utils/asyncWx.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
  },
  onLoad(options) {
    if (options.goods) {
      let goodsObj = JSON.parse(decodeURIComponent(options.goods))
      if (goodsObj.detail) {
        goodsObj.detail = formatRichText(goodsObj.detail)
      }
      this.setData({
        goodsObj
      })
    }
    if (options.oldOpenid) {
      this.setData({
        oldOpenid: options.oldOpenid
      })
    }
    wx.hideShareMenu()
  },
  purchase(e) {
    getStorage((res) => {
      if (this.data.oldOpenid) {
        wx.navigateTo({
          url: `../pay/index?goodsid=${e.currentTarget.dataset.goodsid}&oldOpenid=${this.data.oldOpenid}`,
        })
      } else {
        wx.navigateTo({
          url: `../pay/index?goodsid=${e.currentTarget.dataset.goodsid}`,
        })
      }
    }, (err) => {
      return
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {

  },
  // 点击 加入购物车
  handleCartAdd() {
    getStorage((res) => {
      request({
          url: "addShoppingCart",
          data: {
            goodsId: this.data.goodsObj.children[0].goodsId,
            openId: wx.getStorageSync('userinfo').openId,
            price: this.data.goodsObj.children[0].price,
            num: 1,
          }
        })
        .then(result => {
          if (result.errorCode == -1) {
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              // true 防止用户 手抖 疯狂点击按钮 
              mask: true
            });
          } else {
            wx.showToast({
              title: result.msg,
              icon: "none",
              mask: true
            })
          }
        })
    }, (err) => {
      return
    })

  },
  onShareAppMessage(res) {
    if (res.from == "button") {
      return {
        title: this.data.goodsObj.goodsName,
        path: `/pages/goods_detail/index?goods=${encodeURIComponent(JSON.stringify(this.data.goodsObj))}&oldOpenid=${wx.getStorageSync('userinfo').openId}`,
      }
    } else {

    }
  },
})