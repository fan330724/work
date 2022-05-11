import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  getStorage
} from "../../utils/asyncWx"
let app = getApp()
Page({
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧的菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0,
    start: false, //开启关闭弹窗
    popList: {}, //弹窗数据
  },
  // 接口的返回数据
  Cates: [],

  onLoad: function (options) {

  },
  onShow() {
    let baseurl = app.data.baseUrl;
    if (baseurl) {
      app.data.baseUrl = "";
      this.getCates(baseurl);
      // this.data.leftMenuList.map((item, index) => {
      //   if (item.classifyId == baseurl) {
      //     this.setData({
      //       currentIndex: index,
      //       // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      //       scrollTop: 0
      //     })
      //     this.getRightCates(item.classifyId)
      //   }
      // })
    } else {
      this.getCates();
    }
  },
  // 获取分类数据
  async getCates(baseurl) {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "getGoodsListByshopId",
      data: {
        type: 3
      }
    });
    this.setData({
      leftMenuList: res.body.classifyList,
    })
    if (baseurl) {
      this.data.leftMenuList.map((item, index) => {
        if (item.classifyId == baseurl) {
          this.setData({
            currentIndex: index,
            // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
            scrollTop: 0
          })
          this.getRightCates(item.classifyId)
        }
      })
    } else {
      this.setData({
        currentIndex:0,
        // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
        scrollTop: 0
      })
      this.getRightCates(res.body.classifyList[0].classifyId)
    }
  },
  //获取右侧分类数据
  async getRightCates(classifyId) {
    // 1 使用es7的async await来发送请求
    const res = await request({
      url: "getGoodsByClassifyId",
      data: {
        classifyId
      }
    });
    let ifBd = wx.getStorageSync('userinfo').ifBd
    res.body.goodsList.map(v => {
      v['ifBd'] = ifBd
    })
    this.setData({
      rightContent: res.body.goodsList
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    /* 
    1 获取被点击的标题身上的索引
    2 给data中的currentIndex赋值就可以了
    3 根据不同的索引来渲染右侧的商品内容
     */
    const {
      index,
      id
    } = e.currentTarget.dataset;
    this.getRightCates(id)
    this.setData({
      currentIndex: index,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })
  },
  //点击出现加入购物车弹窗
  addCart(e) {
    let {
      list
    } = e.detail
    getStorage((res) => {
      this.setData({
        start: true,
        popList: list
      })
    }, (err) => {
      this.setData({
        start: false,
        popList: {}
      })
    })
  },
  //点击开启关闭弹窗
  close() {
    this.setData({
      start: !this.data.start
    })
  }
})