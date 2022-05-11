
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  getStorage
} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";
Page({
  data: {
    cart: [], // 购物车数据
    allChecked: false, //是否全选
    totalPrice: 0, // 总价格
    totalNum: 0, //选中的数量
    checkShoppingCartId:"", // 购物车选中的id
  },
  onShow() {
    getStorage((res) => {
      this.getCart()
    },(err) => {
      return
    })
  },
  //获取购物车商品
  async getCart() {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "toShoppingCartList",
      data: {
        openId: wx.getStorageSync('userinfo').openId
      }
    });
    let data = res.body.shopCarList;
    if (res.errorCode == -1) {
      let arr = []
      data.map((item, index) => {
        arr.push({
          goodsId: item.goodsId,
          goodsName: item.goodsName,
          num: item.num,
          orgId: item.orgId,
          picUrl: item.picUrl,
          price: item.price,
          shoppingCartId: item.shoppingCartId,
          specifiName: item.specifiName,
          specifiValue: item.specifiValue,
          type: item.type,
          checked: true,
        })
      })
      wx.nextTick(() => {
        this.setData({
          cart: arr
        })
        this.setCart(arr)
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
        mask: true
      })
    }
  },
  // 商品的选中
  handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let {
      cart
    } = this.data;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.shoppingCartId === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
    let allChecked = true;
    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    //选中的购物车id
    let checkShoppingCartId = "";
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.price;
        totalNum += v.num;
        checkShoppingCartId += (v.shoppingCartId + ',')
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked,
      checkShoppingCartId
    });
  },
  // 商品全选功能
  handleItemAllCheck() {
    // 1 获取data中的数据
    let {
      cart,
      allChecked
    } = this.data;
    // 2 修改值
    allChecked = !allChecked;
    // 3 循环修改cart数组 中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4 把修改后的值 填充回data或者缓存中
    this.setCart(cart);
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e) {
    // 1 获取传递过来的参数 
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // 2 获取购物车数组
    let {
      cart
    } = this.data;
    // 3 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.shoppingCartId === id);
    // 4 判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // 4.1 弹窗提示
      const res = await showModal({
        content: "您是否要删除？"
      });
      if (res.confirm) {
        this.delCart(id)
        this.setCart(cart);
      }
    } else {
      // 4  进行修改数量
      cart[index].num += operation;
      this.editCart(id,cart[index].num)
      // 5 设置回缓存和data中
      this.setCart(cart);
    }
  },

  //商品的删除
  async delCart(shoppingCartId) {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "deleteShopCartList",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        shoppingCartId
      }
    });
    console.log(res);
    if (res.errorCode == -1) {
      this.onShow()
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
        mask: true
      })
    }
  },
  //商品数量的更改
  async editCart(shoppingCartId,num) {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "updateShoppingCart",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        shoppingCartId,
        num,
      }
    });
    console.log(res);
    if (res.errorCode == -1) {
      this.onShow()
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
        mask: true
      })
    }
  },
  // 点击 结算 
  async handlePay() {
    // 2 判断用户有没有选购商品
    if (this.data.totalNum === 0) {
      await showToast({
        title: "您还没有选购商品",
        icon:"none"
      });
      return;
    }
    // 3 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index?ShoppingCartId=' + this.data.checkShoppingCartId
    });
  }
})