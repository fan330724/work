import request from '@/utils/request'

// 查询课程列表
export function listCourse(query) {
  return request({
    url: '/intel/userCourse/list',
    method: 'get',
    params: query
  })
}

// 查询课程详细
export function getCourse(id) {
  return request({
    url: '/intel/userCourse/' + id,
    method: 'get'
  })
}

// 新增课程
export function addCourse(data) {
  return request({
    url: '/intel/userCourse',
    method: 'post',
    data: data
  })
}

// 修改课程报名
export function updateCourse(data) {
  return request({
    url: '/intel/userCourse',
    method: 'put',
    data: data
  })
}

// 删除课程
export function delCourse(id) {
  return request({
    url: '/intel/userCourse/' + id,
    method: 'delete'
  })
}

// 导出课程
export function exportCourse(query) {
  return request({
    url: '/intel/userCourse/export',
    method: 'get',
    params: query
  })
}