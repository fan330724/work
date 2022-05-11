// pages/login/index.js
import {
  request
} from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime';
let app = getApp()
Page({
  handleGetUserInfo() {
    this.getUserProfile((res) => {
      let {
        userInfo
      } = res
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            request({
                url: "toGetOpenIdByCode",
                data: {
                  code: res.code,
                  nickName:userInfo.nickName,
                  avatarUrl:userInfo.avatarUrl,
                }
              })
              .then(result => {
                if (result.errorCode == -1) {
                  console.log(result);
                  let openId = {
                    openId: result.body.openId
                  }
                  let time = {
                    time: Date.now()
                  }
                  let ifBd = {
                    ifBd:result.body.ifBd
                  }
                  wx.setStorageSync("userinfo", {
                    ...userInfo,
                    ...openId,
                    ...time,
                    ...ifBd
                  });
                  wx.showToast({
                    title: '登录成功',
                    mask: true
                  })
                  setTimeout(() => {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }, 1000);
                } else {
                  wx.showToast({
                    title: result.msg,
                    icon: "none",
                    mask: true
                  })
                }
              })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        }
      })
    }, (err) => {
      wx.showToast({
        title: '登录失败',
        icon:"error",
        mask: true
      })
    })
  },

  //获取授权头像信息
  getUserProfile(resolve, reject) {
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别",
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  },
})