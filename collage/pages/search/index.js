/* 
1 输入框绑定 值改变事件 input事件
  1 获取到输入框的值
  2 合法性判断 
  3 检验通过 把输入框的值 发送到后台
  4 返回的数据打印到页面上
2 防抖 （防止抖动） 定时器  节流 
  0 防抖 一般 输入框中 防止重复输入 重复发送请求
  1 节流 一般是用在页面下拉和上拉 
  1 定义全局的定时器id
 */
import {
  request
} from "../../request/index.js";
import {getStorage} from "../../utils/asyncWx"
import regeneratorRuntime from '../../lib/runtime/runtime';
let app = getApp()
Page({
  data: {
    goods: [],
    // 取消 按钮 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: "",
    start: false, //开启关闭弹窗
    popList: {}, //弹窗数据
    show: false, 
  },
  TimeId: -1,
  // 输入框的值改变 就会触发的事件
  handleInput(e) {
    // 1 获取输入框的值
    const {
      value
    } = e.detail;
    // 2 检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  // 发送请求获取搜索建议 数据
  async qsearch(goodsName) {
    const res = await request({
      url: "getMainGoodsList",
      data: {
        goodsName
      }
    });
    console.log(res);
    let goods = res.body.goodsList
    goods.map(v=> {
      v['ifBd'] = app.data.ifBd
    })
    if(goods.length > 0){
      this.setData({
        goods,
        show: false,
      })
    }else{
      this.setData({
        show: true
      })
    }
  },
  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
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
  },
})