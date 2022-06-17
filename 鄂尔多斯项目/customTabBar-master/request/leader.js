import {
  request
} from "./index";
let app = getApp();
let {
  url
} = app.data;
export default {
  /**
   * 领导端获取教师
   */
  teacherlist(props) {
    return request({
      url: url + "/api-min/leader/teacherlist",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 领导端获取教师详情  参数id
   */
  teacherlistId(props) {
    return request({
      url: url + "/api-min/leader/teacherlistId?id=" + props,
      // data: {
      //   ...props
      // },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查询报修报账列表 
   */
  getRepair(props) {
    return request({
      url: url + "/api-min/leader/getRepair",
      data: {
        ...props
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查询报修报账详情  参数id
   */
  getRepairId(props) {
    return request({
      url: url + "/api-min/leader/getRepairId",
      // data: {
      //   ...props
      // },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 修改报修报账 参数  id
   */
  editRepair(props) {
    return request({
      url: url + "/api-min/leader/editRepair",
      data: {
        ...props
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查询请假审批列表
   */
  vacationlist(props) {
    return request({
      url: url + "/api-min/leader/vacationlist",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取请假审批详细信息  参数id
   */
  vacationlistId(props) {
    return request({
      url: url + "/api-min/leader/vacationlistId",
      data: {
        ...props
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 修改请假审批  参数id
   */
  editvacation(props) {
    return request({
      url: url + "/api-min/leader/editvacation",
      data: {
        ...props
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },

  /**
   * 教学科研 现场教学点跟课程体系接口
   */
  getMessage(props) {
    return request({
      url: url + "/api-min/leader/getMessage",
      data: {
        ...props
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
}