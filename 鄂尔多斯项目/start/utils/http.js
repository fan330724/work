export default {
  getUserStart() {
    let {
      grade
    } = wx.getStorageSync('userInfo').data;
    switch (grade) {
      case 1:
        return 'staff';
        break;
      case 2:
        return 'teacher';
        break;
      case 3:
        return 'student';
        break;
      case 4:
        return 'leader';
        break;
    }
  },
  /**
   * 获取小程序二维码参数
   * @param {String} scene 需要转换的参数字符串
   */
  getQueryString: function (url, name) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
    var r = url.substr(1).match(reg)
    if (r != null) {
      // console.log("r = " + r)
      // console.log("r[2] = " + r[2])
      return r[2]
    }
    return null;
  }
}