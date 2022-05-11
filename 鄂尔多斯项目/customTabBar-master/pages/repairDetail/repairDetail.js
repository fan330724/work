// page/staff/pages/repairDetail/repairDetail.js
import http from "../../request/staff"
import leader from "../../request/leader"
import getUserStart from "../../utils/http"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    getUserStart:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      getUserStart: getUserStart.getUserStart()
    })
    wx.setNavigationBarTitle({
      title: options.name + '详情',
    })
  },
  request(){
    http.getrepairid({
      id:this.data.id
    }).then(res => {
      console.log(res);
      let { data,code,mag} = res.data;
      if(code == 200){
        this.setData({
          list: data
        })
      }else{
        wx.showToast({
          title: msg,
          icon: "none",
          mask: true,
        })
      }
    })
  },
  // 放大查看图片
  enlarge(e){
    var {list,src} = e.currentTarget.dataset;
    wx.previewImage({
      urls: list,
      current:src
    })
  },
  editRepair(e){
    console.log(e);
    leader.editRepair({
      id:this.data.id,
      status:e.currentTarget.dataset.status
    }).then(res => {
      console.log(res);
      if(res.data.code == 200){
        wx.showToast({
          title: res.data.msg,
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack()
        },1500)
      }else{
        wx.showToast({
          title: res.data.msg,
          mask: true,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.request()
  },
})