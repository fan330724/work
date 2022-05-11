import request from '@/utils/request'

// 查询学员列表
export function listStudent(query) {
  return request({
    url: '/intel/student/list',
    method: 'get',
    params: query
  })
}

// 查询学员详细
export function getStudent(id) {
  return request({
    url: '/intel/student/' + id,
    method: 'get'
  })
}

// 新增学员
export function addStudent(data) {
  return request({
    url: '/intel/student',
    method: 'post',
    data: data
  })
}

// 修改学员
export function updateStudent(data) {
  return request({
    url: '/intel/student',
    method: 'put',
    data: data
  })
}

// 删除学员
export function delStudent(id) {
  return request({
    url: '/intel/student/' + id,
    method: 'delete'
  })
}

// 导出学员
export function exportStudent(query) {
  return request({
    url: '/intel/student/export',
    method: 'get',
    params: query
  })
}