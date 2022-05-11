export default {
  getUserStart() {
    if (wx.getStorageSync('userInfo')) {
      let {
        grade
      } = wx.getStorageSync('userInfo').data;
      switch (grade) {
        case 1:
          //员工
          return 'staff';
          break;
        case 2:
          //教师
          return 'teacher';
          break;
        case 3:
          //学员
          return 'student';
          break;
        case 4:
          //领导
          return 'leader';
          break;
      }
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

/**
 * 登陆校验
 */
export const auth = () => {
	let userInfo = wx.getStorageSync("userInfo");
	if (!userInfo) {
		return false
	}else{
    return true
  }
}