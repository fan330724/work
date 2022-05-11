import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
let pageStart = 1;
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryData: [],
    categoryCur: 0,
    categoryMenu: [{
        id: -1,
        name: "全部"
      },
      {
        id: 1,
        name: "待付款"
      },
      {
        id: 2,
        name: "待发货"
      },
      {
        id: 4,
        name: "待收货"
      },
      {
        id: 5,
        name: "已完成"
      },
    ],
    duration: 300, // swiper-item 切换过渡时间
  },
  onLoad() {
    let categoryData = [];
    this.data.categoryMenu.forEach((item, index) => {
      categoryData.push({
        id: item.id,
        categoryCur: index,
        requesting: false,
        end: false,
        emptyShow: false,
        page: pageStart,
        listData: []
      });
    });
    this.setData({
      categoryData,
    });
  },
  onShow() {
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    // 3 获取url上的type参数
    const {
      type,
      index
    } = currentPage.options;
    this.setData({
      categoryCur: index
    })
    this.refresh(type)
  },
  // 获取订单列表的方法
  getOrders(start, type, currentPage, pageData, currentCur) {
    request({
      url: "getOrderListByOrderState",
      data: {
        openId: wx.getStorageSync('userinfo').openId,
        orderState: start,
        pageNum: currentPage,
      }
    }).then(res => {
      let listData = res.body.orderList || [];
      if (type == 'refresh') {
        pageData.listData = listData;
        pageData.page = currentPage + 1;
      } else {
        pageData.listData = pageData.listData.concat(listData);
        // pageData.end = true;
        pageData.page = currentPage + 1;
        if (listData.length <= 0) {
          pageData.end = true
        }
      }
      if (pageData.listData.length <= 0) {
        pageData.emptyShow = true;
      }
      pageData.requesting = false;
      this.setCurrentData(currentCur, pageData);
    })
  },
  // 更新页面数据
  setCurrentData(currentCur, pageData) {
    let categoryData = this.data.categoryData
    categoryData[currentCur] = pageData
    this.setData({
      categoryData: categoryData
    })
  },
  getList(type, currentPage, start) {
    let currentCur = this.data.categoryCur;
    let pageData = this.getCurrentData(currentCur);
    if (type !== "refresh" && pageData.end) return;

    pageData.requesting = true;

    this.setCurrentData(currentCur, pageData);
    wx.nextTick(() => {
      this.getOrders(start, type, currentPage, pageData, currentCur)
    })
  },
  // 获取当前激活页面的数据
  getCurrentData() {
    return this.data.categoryData[this.data.categoryCur]
  },
  // 刷新数据
  refresh(start) {
    if(typeof start == 'string'){
      this.getList('refresh', pageStart, start);
    }else{
      this.getList('refresh', pageStart, this.getCurrentData(this.data.categoryCur).id);
    }
  },
  // 加载更多
  more() {
    this.getList('more', this.getCurrentData(this.data.categoryCur).page, this.getCurrentData(this.data.categoryCur).id);
  },
  // 顶部tab切换事件
  toggleCategory(e) {
    this.setData({
      duration: 0
    });
    setTimeout(() => {
      this.setData({
        categoryCur: e.detail.index
      });
    }, 0);
  },

  // 页面滑动切换事件
  animationFinish(e) {
    this.setData({
      duration: 300
    });
    setTimeout(() => {
      this.setData({
        categoryCur: e.detail.current
      });
      let pageData = this.getCurrentData();
      if (pageData.listData.length === 0) {
        this.getList('refresh', pageStart, pageData.id);
      }
    }, 0);
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
          this.refresh(this.getCurrentData(this.data.categoryCur).id)
        }, 1000);
      }else{
        wx.showToast({
          title: res.msg,
          icon:"none",
          mask: true,
        })
      }
    })
  },

  //点击跳转详情
  showArticle(e){
    let {
      orderid
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../order_detail/index?orderid=${orderid}`,
    })
  },
})