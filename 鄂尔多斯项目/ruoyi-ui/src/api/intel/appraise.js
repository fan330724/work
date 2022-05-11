import request from '@/utils/request'

// 查询评价列表
export function listAppraise(query) {
  return request({
    url: '/intel/appraise/list',
    method: 'get',
    params: query
  })
}

// 查询评价详细
export function getAppraise(id) {
  return request({
    url: '/intel/appraise/' + id,
    method: 'get'
  })
}

// 新增评价
export function addAppraise(data) {
  return request({
    url: '/intel/appraise',
    method: 'post',
    data: data
  })
}

// 修改评价
export function updateAppraise(data) {
  return request({
    url: '/intel/appraise',
    method: 'put',
    data: data
  })
}

// 删除评价
export function delAppraise(id) {
  return request({
    url: '/intel/appraise/' + id,
    method: 'delete'
  })
}

// 导出评价
export function exportAppraise(query) {
  return request({
    url: '/intel/appraise/export',
    method: 'get',
    params: query
  })
}