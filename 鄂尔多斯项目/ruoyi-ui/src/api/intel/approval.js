import request from '@/utils/request'

// 查询请假审批列表
export function listApproval(query) {
  return request({
    url: '/intel/approval/list',
    method: 'get',
    params: query
  })
}

// 查询请假审批详细
export function getApproval(id) {
  return request({
    url: '/intel/approval/' + id,
    method: 'get'
  })
}

// 新增请假审批
export function addApproval(data) {
  return request({
    url: '/intel/approval',
    method: 'post',
    data: data
  })
}

// 修改请假审批
export function updateApproval(data) {
  return request({
    url: '/intel/approval',
    method: 'put',
    data: data
  })
}

// 删除请假审批
export function delApproval(id) {
  return request({
    url: '/intel/approval/' + id,
    method: 'delete'
  })
}

// 导出请假审批
export function exportApproval(query) {
  return request({
    url: '/intel/approval/export',
    method: 'get',
    params: query
  })
}