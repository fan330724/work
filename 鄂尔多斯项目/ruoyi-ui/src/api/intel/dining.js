import request from '@/utils/request'

// 查询住宿就餐列表
export function listDining(query) {
  return request({
    url: '/intel/dining/list',
    method: 'get',
    params: query
  })
}

// 查询住宿就餐详细
export function getDining(id) {
  return request({
    url: '/intel/dining/' + id,
    method: 'get'
  })
}

// 新增住宿就餐
export function addDining(data) {
  return request({
    url: '/intel/dining',
    method: 'post',
    data: data
  })
}

// 修改住宿就餐
export function updateDining(data) {
  return request({
    url: '/intel/dining',
    method: 'put',
    data: data
  })
}

// 删除住宿就餐
export function delDining(id) {
  return request({
    url: '/intel/dining/' + id,
    method: 'delete'
  })
}

// 导出住宿就餐
export function exportDining(query) {
  return request({
    url: '/intel/dining/export',
    method: 'get',
    params: query
  })
}