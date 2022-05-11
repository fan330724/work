//app.js
App({
  data: {
    url: "https://stu.yikang.co"
  },
  onLaunch: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        var a = e.model;
        if (a.indexOf("iPhone") != -1 && a.indexOf("X") != -1) { //是不是包含iphoneX
          that.globalData.isIphoneX = true
        } else {
          that.globalData.isIphoneX = false
        }
      }
    })
    let userInfo = wx.getStorageSync("userInfo");
    // 有登录缓存 定义过期时间  10s 改成 5分钟
    if ((Date.now() - userInfo.time) > 1000 * (24 * 60 * 60)) {
      //删除缓存数据
      wx.removeStorageSync('userInfo')
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
    isIphoneX: false
  }
})