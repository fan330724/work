import {
  request
} from "./index";
let app = getApp();
let {
  url
} = app.data;
export default {
  /**
   * 教师端-获取更多课程信息(近期课程(未开课)往期课程(已开课/已结束))
   * 参数:{教师id(用户id):teacherId,(不点击'更多课程'传参数；点击'更多课程'不需要传参数)limit}
   */
  teacherCourse(props) {
    return request({
      url: url + "/api-min/teacher/teacherCourse",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取课程具体信息
   * 参数：{课程id:courseId}
   */
  teacherCourseDetails(props) {
    return request({
      url: url + "/api-min/teacher/teacherCourseDetails",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 教师端-获取我的课程具体信息
   * 参数：{老师id(用户id):teacherId,status:1、未培训2培训中3已完成}
   */
  teacherIofCourse(props) {
    return request({
      url: url + "/api-min/teacher/teacherIofCourse",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 教师端获取我的评价,参数：{教师id：teacherId}
   */
  teacherMinAppraise(props) {
    return request({
      url: url + "/api-min/teacher/teacherMinAppraise",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 教师端查询我的-展示未开始,培训中，已完成总数
   * 参数：{老师id:teacherId}
   */
  IofCourseCount(props) {
    return request({
      url: url + "/api-min/teacher/IofCourseCount",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 教师端查看个人中心,参数：用户id：userId
   */
  personalCenter(props) {
    return request({
      url: url + "/api-min/teacher/personalCenter",
      data: {
        ...props
      },
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 教师端-课程开始信息提醒，参数：{老师id(用户id):teacherId}
   */
  courseToRemind(props) {
    return request({
      url: url + "/api-min/teacher/courseToRemind",
      data: {
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
}