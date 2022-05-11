import request from '@/utils/request'
// 查询课程列表
export function listCourse(query) {
  return request({
    url: '/intel/course/list',
    method: 'get',
    params: query
  })
}
//查询班级名称列表
export function listClass(query){
  return request({
    url: '/intel/class/groubyList',
    method: 'get',
    params: query
  })
}
// 查询课程详细
export function getCourse(id) {
  return request({
    url: '/intel/course/' + id,
    method: 'get'
  })
}

// 新增课程
export function addCourse(data) {
  return request({
    url: '/intel/course',
    method: 'post',
    data: data
  })
}

// 修改课程
export function updateCourse(data) {
  return request({
    url: '/intel/course',
    method: 'put',
    data: data
  })
}

// 删除课程
export function delCourse(id) {
  return request({
    url: '/intel/course/' + id,
    method: 'delete'
  })
}

// 导出课程
export function exportCourse(query) {
  return request({
    url: '/intel/course/export',
    method: 'get',
    params: query
  })
}

// 下载二维码
export function downCode() {
  return request({
    url: '/api-min/qrcode/download',
    method: 'get',
    responseType: 'bolb',
  })
}