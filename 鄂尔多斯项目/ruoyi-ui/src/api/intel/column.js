import request from '@/utils/request'

// 查询栏目列表
export function listColumn(query) {
  return request({
    url: '/intel/column/list',
    method: 'get',
    params: query
  })
}

// 查询栏目详细
export function getColumn(id) {
  return request({
    url: '/intel/column/' + id,
    method: 'get'
  })
}

// 新增栏目
export function addColumn(data) {
  return request({
    url: '/intel/column',
    method: 'post',
    data: data
  })
}

// 修改栏目
export function updateColumn(data) {
  return request({
    url: '/intel/column',
    method: 'put',
    data: data
  })
}

// 删除栏目
export function delColumn(id) {
  return request({
    url: '/intel/column/' + id,
    method: 'delete'
  })
}

// 导出栏目
export function exportColumn(query) {
  return request({
    url: '/intel/column/export',
    method: 'get',
    params: query
  })
}