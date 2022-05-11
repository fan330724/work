import request from '@/utils/request'

// 查询班级列表
export function listClass(query) {
  return request({
    url: '/intel/class/list',
    method: 'get',
    params: query
  })
}

// 查询班级详细
export function getClass(id) {
  return request({
    url: '/intel/class/' + id,
    method: 'get'
  })
}

// 新增班级
export function addClass(data) {
  return request({
    url: '/intel/class',
    method: 'post',
    data: data
  })
}

// 修改班级
export function updateClass(data) {
  return request({
    url: '/intel/class',
    method: 'put',
    data: data
  })
}

// 删除班级
export function delClass(id) {
  return request({
    url: '/intel/class/' + id,
    method: 'delete'
  })
}

// 导出班级
export function exportClass(query) {
  return request({
    url: '/intel/class/export',
    method: 'get',
    params: query
  })
}
// 下载模板
export function importTemplate() {
  return request({
    url: '/intel/student/downTemplate',
    method: 'get'
  })
}