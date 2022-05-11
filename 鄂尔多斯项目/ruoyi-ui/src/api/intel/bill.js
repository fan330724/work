import request from '@/utils/request'

// 查询报修报账
export function listBill(query) {
  return request({
    url: '/intel/repair/list',
    method: 'get',
    params: query
  })
}

// 查询报修报账
export function getBill(id) {
  return request({
    url: '/intel/repair/' + id,
    method: 'get'
  })
}

// 修改报修报账
export function updateBill(data) {
  return request({
    url: '/intel/repair',
    method: 'put',
    data: data
  })
}

// 删除报修报账
export function delBill(id) {
  return request({
    url: '/intel/repair/' + id,
    method: 'delete'
  })
}

// 导出报修报账
export function exportBill(query) {
  return request({
    url: '/intel/repair/export',
    method: 'get',
    params: query
  })
}