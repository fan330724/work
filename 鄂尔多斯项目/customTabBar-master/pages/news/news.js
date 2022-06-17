// pages/news/news.js
import http from '../../request/http'
import getUserStart from '../../utils/http'
import {
  formatRichText
} from "../../utils/rictTextFormatRich"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let arr = []
    if (getUserStart.getUserStart() == "student") {
      this.setData({
        list: [{
            active: 1,
            tit: "系统消息",
          },
          {
            active: 3,
            tit: "调度信息",
          },
          {
            active: 4,
            tit: "课程提醒",
          },
        ]
      })
    } else if (getUserStart.getUserStart() == "teacher") {
      this.setData({
        list: [{
            active: 1,
            tit: "系统消息",
          },
          {
            active: 4,
            tit: "课程提醒",
          },
        ]
      })
    } else if (getUserStart.getUserStart() == "staff") {
      this.setData({
        list: [{
            active: 1,
            tit: "系统消息",
          },
          {
            active: 3,
            tit: "调度信息",
          },
        ]
      })
    } else if (getUserStart.getUserStart() == "leader") {
      this.setData({
        list: [{
          active: 1,
          tit: "系统消息",
        }]
      })
    }

    this.data.list.map((item, index) => {
      this.request(item.active, function (data) {
        for (var key in data) {
          if (data.hasOwnProperty(key) === true) { // 确保不是 obj2 的原型属性
            item[key] = data[key];
          }
        }
        if (data) {
          arr.push({
            type: item.type,
            title: item.tit,
            createTime: item.createTime.substring(0, 10),
            content: formatRichText(item.content)
          })
          that.setData({
            list: arr
          })
        } else {
          arr.push({
            type: item.active,
            title: item.tit,
          })
          that.setData({
            list: arr
          })
        }
      })
    })
  },
  request(type, fun) {
    http.getMinMessageList({
      messageType: type,
      userId: wx.getStorageSync('userInfo').data.userId
    }).then(res => {
      let {
        data,
        code,
        msg
      } = res.data;
      if (code == 200) {
        fun(data[0])
      }else{
        wx.showToast({
          title: msg,
          icon:"none",
          mask: true
        })
      }
    })
  },
  tonews(e) {
    let {
      id
    } = e.currentTarget.dataset;
    switch (id.type) {
      case "3":
        wx.navigateTo({
          url: `../dispatchnews/dispatchnews?id=${id.type}`,
        })
        break;
      default:
        wx.navigateTo({
          url: `../newsDetail/newsDetail?id=${id.type}&title=${id.title}`,
        })
        break;
    }

  }
})