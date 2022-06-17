import request from '@/utils/request'

// 查询教师级别列表
export function listSubjects(query) {
  return request({
    url: '/intel/subjects/list',
    method: 'get',
    params: query
  })
}

// 查询教师级别详细
export function getSubjects(id) {
  return request({
    url: '/intel/subjects/' + id,
    method: 'get'
  })
}

// 新增教师级别
export function addSubjects(data) {
  return request({
    url: '/intel/subjects',
    method: 'post',
    data: data
  })
}

// 修改教师级别
export function updateSubjects(data) {
  return request({
    url: '/intel/subjects',
    method: 'put',
    data: data
  })
}

// 删除教师级别
export function delSubjects(id) {
  return request({
    url: '/intel/subjects/' + id,
    method: 'delete'
  })
}

// 导出教师级别
export function exportSubjects(query) {
  return request({
    url: '/intel/subjects/export',
    method: 'get',
    params: query
  })
}