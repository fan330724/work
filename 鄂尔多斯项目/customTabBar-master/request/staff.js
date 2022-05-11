import {
  request
} from "./index";
let app = getApp();
let {
  url
} = app.data;
export default {
  /**
   * 添加报账信息，请求类型：post，参数：{报账类型id:reimbursementId,报账人id(用户id):userid,报账内容:content,图片:picUrl}
   */
  addreimbursement(props) {
    return request({
      url: url + "/api-min/employ/addreimbursement",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 添加报修信息，请求类型：post，参数：{报修人id(用户id):userid,报账内容:content,采购明细:detail,图片:picUrl}
   */
  addrepair(props) {
    return request({
      url: url + "/api-min/employ/addrepair",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取报修详细信息，请求类型：post，参数：{报修id:id}
   */
  getrepairid(props) {
    return request({
      url: url + "/api-min/employ/getrepairid",
      data: {
        ...props
      },
      // header:{
      //   "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
      // },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查询报账类型，请求类型：post，参数：无
   */
  reimbursementlist(props) {
    return request({
      url: url + "/api-min/employ/reimbursementlist",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查询报修报账列表，请求类型：post，参数：{报修人id(用户id):userid,报账报修类型:type(0报修1报账)}
   */
  repairlist(props) {
    return request({
      url: url + "/api-min/employ/repairlist",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 员工进行打卡，参数：{员工id：userId，打卡时间：time例如：08:44}
   */
  attendanceClockAdd(props) {
    return request({
      url: url + "/api-min/employ/attendanceClockAdd",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 打卡用户信息展示，参数：{员工id：userId
   */
  clockInUser(props) {
    return request({
      url: url + "/api-min/employ/clockInUser",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 员工查看考勤打卡，参数：{员工id：userId，日期：dateTime：2020-11-06}
   */
  attendanceClockList(props) {
    return request({
      url: url + "/api-min/employ/attendanceClockList",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 员工查看考勤打卡(月份)，参数：{员工id：userId，日期：time例如：2020-10
   */
  monthAttendanceList(props) {
    return request({
      url: url + "/api-min/employ/monthAttendanceList",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 新增请假审批，参数：{请假人id:userId,开始时间:startTime,结束时间:endTime,请假天数:total,请假原因:reason}
   */
  addleave(props) {
    return request({
      url: url + "/api-min/employ/addleave",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },


  /**
   * 获取请假列表接口
   */
  vacationlist(props) {
    return request({
      url: url + "/api-min/employ/vacationlist",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },


}