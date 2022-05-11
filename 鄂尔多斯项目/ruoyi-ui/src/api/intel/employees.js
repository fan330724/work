import request from '@/utils/request'

// 查询员工列表
export function listEmployees(query) {
  return request({
    url: '/intel/employees/list',
    method: 'get',
    params: query
  })
}
//查询教师列表
export function listTeacher(query) {
  return request({
    url: '/intel/employees/teacherlist',
    method: 'get',
    params: query
  })
}
//查询课程列表
export function teachercourselist(query) {
  return request({
    url: '/intel/employees/teachercourselist',
    method: 'get',
    params: query
  })
}
// 查询教师/员工详细
export function getEmployees(id) {
  return request({
    url: '/intel/employees/' + id,
    method: 'get'
  })
}

// 新增教师/员工
export function addEmployees(data) {
  return request({
    url: '/intel/employees',
    method: 'post',
    data: data
  })
}

// 修改教师/员工
export function updateEmployees(data) {
  return request({
    url: '/intel/employees',
    method: 'put',
    data: data
  })
}

// 删除教师/员工
export function delEmployees(id) {
  return request({
    url: '/intel/employees/' + id,
    method: 'delete'
  })
}

// 导出教师/员工
export function exportEmployees(query) {
  return request({
    url: '/intel/employees/export',
    method: 'get',
    params: query
  })
}