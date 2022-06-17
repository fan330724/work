const app = getApp();
import getUserStart from "../utils/http"
import {
  auth
} from "../utils/http"
Component({
  data: {
    selected: 0,
    color: "#ffffff",
    selectedColor: "#F6AF02",
    addList: [{
      list1: [{
          "pagePath": "/pages/tabbar/index/index",
          "iconPath": "/icon/home.png",
          "selectedIconPath": "/icon/home.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/tabbar/course/index",
          "iconPath": "/icon/course.png",
          "selectedIconPath": "/icon/course.png",
          "text": "课程"
        },
        {
          "pagePath": "/pages/tabbar/addressBook/index",
          "iconPath": "/icon/address.png",
          "selectedIconPath": "/icon/address.png",
          "text": "通讯录"
        },
        {
          "pagePath": "/pages/tabbar/my/index",
          "iconPath": "/icon/my.png",
          "selectedIconPath": "/icon/my.png",
          "text": "我的"
        }
      ],
      list2: [{
          "pagePath": "/pages/tabbar/index/index",
          "iconPath": "/icon/home.png",
          "selectedIconPath": "/icon/home.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/tabbar/classDetail/index",
          "iconPath": "/icon/class.png",
          "selectedIconPath": "/icon/class.png",
          "text": "班级详情"
        },
        {
          "pagePath": "/pages/tabbar/addressBook/index",
          "iconPath": "/icon/address.png",
          "selectedIconPath": "/icon/address.png",
          "text": "通讯录"
        },
        {
          "pagePath": "/pages/tabbar/my/index",
          "iconPath": "/icon/my.png",
          "selectedIconPath": "/icon/my.png",
          "text": "我的"
        }
      ],
      list3: [{
          "pagePath": "/pages/tabbar/index/index",
          "iconPath": "/icon/home.png",
          "selectedIconPath": "/icon/home.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/tabbar/classDetail/index",
          "iconPath": "/icon/class.png",
          "selectedIconPath": "/icon/class.png",
          "text": "班级详情"
        },
        {
          "pagePath": "/pages/tabbar/addressBook/index",
          "iconPath": "/icon/address.png",
          "selectedIconPath": "/icon/address.png",
          "text": "通讯录"
        },
        {
          "pagePath": "/pages/tabbar/my/index",
          "iconPath": "/icon/my.png",
          "selectedIconPath": "/icon/my.png",
          "text": "我的"
        }
      ]
    }],
    list: [],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX
  },
  attached() {

  },
  ready() {
    setTimeout(() => {
      if (auth()) {
        if (getUserStart.getUserStart() == "student" || getUserStart.getUserStart() == "teacher") {
          this.setData({
            list: this.data.addList[0].list1
          })
        } else if (getUserStart.getUserStart() == "staff") {
          this.setData({
            list: this.data.addList[0].list3
          })
        } else if (getUserStart.getUserStart() == "leader") {
          this.setData({
            list: this.data.addList[0].list2
          })
        }
      } else {
        this.setData({
          list: this.data.addList[0].list1
        })
      }
    }, 500);
  },
  methods: {
    switchTab(e) {
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      if (auth()) {
        wx.switchTab({
          url: path
        })
      } else {
        if (index != 0) {
          wx.showModal({
            title: "登录",
            content: "您还未登录，请先登录",
            success(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/login/login',
                })
              } else if (res.cancel) {
                return
              }
            }
          })
        }
      }

      // this.setData({
      //   selected: index
      // })
    }
  }
})