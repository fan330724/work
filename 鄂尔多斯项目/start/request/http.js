import {request} from "./index";
let app =getApp();
let {url} = app.data;
export default {
  /**
   * 登录
   * 账号:username,密码：password
   */
  login(props){
    return request({
      url: url + "/api-min/login/student",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 学生进行重置密码
   * 用户Id:userId,新密码:newPwd
   */
  setPassword(props){
    return request({
      url: url + "/api-min/login/courseDetails",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取更多课程信息
   */
  course(props){
    return request({
      url: url + "/api-min/course/course",
      data:{
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
   * 获取课程具体信息
   * 课程id:courseId,学员id:userId
   */
  courseDetails(props){
    return request({
      url: url + "/api-min/course/courseDetails",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取教师具体信息
   * 课程id:id
   */
  teacheretails(props){
    return request({
      url: url + "/api-min/course/etails?id=" + props,
      // data:{
      //   ...props
      // },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取我的评价,
   * 参数：用户id：userId
   */
  getMinAppraiseList(props){
    return request({
      url: url + "/api-min/course/getMinAppraiseList",
      data:{
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
   * 获取咨询栏目信息,
   * 参数：栏目Id:columnId
   */
  getMinColmnDetailList(props){
    return request({
      url: url + "/api-min/course/getMinColmnDetailList",
      data:{
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
   * 获取咨询栏目信息
   */
  getMinColumnList(props){
    return request({
      url: url + "/api-min/course/getMinColumnList",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取资讯栏目对应的消息详情下单个详细信息；参数：id
   */
  getSingleMessage(props){
    return request({
      url: url + "/api-min/course/getSingleMessage",
      data:{
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
   * 获取各类消息，
   * 参数：消息类型:messageType:1-系统消息；3-调度消息；4课程消息；5-轮播图消息；6-学校简介
   *      用户Id,userId
   */
  getMinMessageList(props){
    return request({
      url: url + "/api-min/course/getMinMessageList",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 获取我报名的课程具体信息，
   * 参数：{学员id:studentID,status:1、已报名2培训中3已完成}
   */
  IofCourse(props){
    return request({
      url: url + "/api-min/course/IofCourse",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 对课程进行评价，
   * 参数：
   */
  toMinAppraise(props){
    return request({
      url: url + "/api-min/course/toMinAppraise",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查看个人中心
   * 参数：用户id：userId
   */
  personalCenter(props){
    return request({
      url: url + "/api-min/course/personalCenter?userId=" +props,
      // data:{
      //   ...props
      // },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 查询我的-展示已报名,培训中，已完成总数，参数：{学员id:studentId}
   */
  IofCourseCount(props){
    return request({
      url: url + "/api-min/course/IofCourseCount",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 立即报名，
   * 参数：{用户id:userId,课程id:courseId}
   */
  add(props){
    return request({
      url: url + "/api-min/course/add",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 评价图片上传，，
   * 参数：{图片base64:pic}
   */
  apprisePicUpload(props){
    return request({
      url: url + "/api-min/course/apprisePicUpload",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 课程回访-根据课程id获取课程的视频 ，
   * 参数:courseId:课程id
   */
  courseVideo(props){
    return request({
      url: url + "/api-min/course/courseVideo",
      data:{
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
   * 教师学员端-通讯录展示课程列表下的学生电话,参数：{课程id:courseId}
   */
  addressBook(props){
    return request({
      url: url + "/api-min/teacher/addressBook",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 扫一扫-课程列表,参数:{userId}
   */
  courseList(props){
    return request({
      url: url + "/api-min/qrcode/course",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 进行签到,参数:{课程ID:courseId;用户id:userId;时间:time；status:1签到2签退}
   */
  signIn(props){
    return request({
      url: url + "/api-min/qrcode/signIn",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
  /**
   * 学员端-课程开始信息提醒，参数：{学员(用户id):studentId}
   */
  studentToRemind(props){
    return request({
      url: url + "/api-min/course/studentToRemind",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },


  /**
   * 通讯录接口，参数：{学员(用户id):userId }
   */
  classPhone(props){
    return request({
      url: url + "/api-min/course/classPhone",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },

  /**
   * 通讯录详情接口，参数：{学员(用户id):pid }
   */
  addressBook(props){
    return request({
      url: url + "/api-min/course/addressBook",
      data:{
        ...props
      },
      method: 'post',
    }).then(res => {
      return res
    })
  },
}
