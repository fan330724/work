// pages/information/information.js
import http from "../../request/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0, //顶部切换下标
    show: true,
    tabbar: [],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.getMinColumnList().then(res => {
      let {
        data
      } = res.data;
      this.setData({
        tabbar: data,
        active: data[0].id
      })
      this.request(data[0].id)
    })
  },
  
  //顶部切换
  tab(e) {
    var {
      id
    } = e.currentTarget.dataset
    this.setData({
      active: id,
    })
    this.request(id)
  },

  //获取资讯列表
  request(id) {
    http.getMinColmnDetailList({
      columnId: id
    }).then(res => {
      console.log(res);
      let {
        data,
        code
      } = res.data;
      if (code == 200 && data.length > 0) {
        this.setData({
          list: data,
          show:false
        })
      }else{
        this.setData({
          show:true
        })
      }
    })
  },
})