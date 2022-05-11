import {
  request
} from "./index";
let app = getApp();
let {
  url
} = app.data;
export default {
  /**
   * 登录
   * 账号:username,密码：password
   */
  login(props) {
    return request({
      url: url + "/api-min/login",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },

  regist(props) {
    return request({
      url: url + "/api-min/minRegister",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },


  getControlnList() {
    return request({
      url: url + "/api-min/getControlnList",
      method: 'get',
    }).then(res => {
      return res
    })
  },
  listDetail(id) {
    return request({
      url: url + "/api-min/" + id,
      method: 'get',
    }).then(res => {
      return res
    })
  },

  getContent(props) {
    return request({
      url: url + "/api-min/getContent",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },

  addContent(props) {
    return request({
      url: url + "/api-min/addContent",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },


}