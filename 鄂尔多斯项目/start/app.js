// app.js
App({
  data: {
    url: "https://stu.yikang.co"
  },
  onLaunch() {
    let userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
      // 不存在  跳转首页
      wx.redirectTo({
        url: './pages/home/index',
      })
    } else {
      // 有登录缓存 定义过期时间  10s 改成 5分钟
      if ((Date.now() - userInfo.time) > 1000*(24*60*60)) {
        //跳转首页
        wx.redirectTo({
          url: './pages/home/index',
        })
      } else {
        // 可以使用旧的数据
        wx.switchTab({
          url: './pages/index/index',
        })
      }
    }
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  },
  globalData: {
    tabbar: null,
    userInfo: null,
  }
})