/**
 * promise 形式  getSetting
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
/**
 * promise 形式  chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 * promise 形式  openSetting
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 *  promise 形式  showModal
 * @param {object} param0 参数
 */
export const showModal = ({
  content
}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}


/**
 *  promise 形式  showToast
 * @param {object} param0 参数
 */
export const showToast = ({
  title,
  icon
}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon,
      mask: true,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 * promise 形式  login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 * 判断是否登录
 */
export const getStorage = (resolve,reject) => {
  let userinfo = wx.getStorageSync('userinfo');
  if (userinfo && userinfo.openId) {
    resolve(true)
  } else {
    reject(false)
    showModal({
      content: "您还未登录，请先登录"
    }).then(res => {
      if (res.confirm) {
        wx.reLaunch({
          url: '/pages/login/index',
        })
      }else{
        return
      }
    })
  }
}