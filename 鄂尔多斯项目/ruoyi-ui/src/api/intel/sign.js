import request from '@/utils/request'

// 查询签到列表
export function listSign(query) {
  return request({
    url: '/intel/sign/list',
    method: 'get',
    params: query
  })
}

// 查询签到详细
export function getSign(id) {
  return request({
    url: '/intel/sign' + id,
    method: 'get'
  })
}
// 删除签到
export function delSign(ids) {
  return request({
    url: '/intel/sign' + ids,
    method: 'delete'
  })
}

// 导出签到
export function exportSign(query) {
  return request({
    url: '/intel/sign/export',
    method: 'get',
    params: query
  })
}