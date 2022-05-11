import request from '@/utils/request'

// 查询menu列表
export function listMenu(query) {
  return request({
    url: '/intel/menu/list',
    method: 'get',
    params: query
  })
}

// 查询menu详细
export function getMenu(id) {
  return request({
    url: '/intel/menu/' + id,
    method: 'get'
  })
}

// 新增menu
export function addMenu(data) {
  return request({
    url: '/intel/menu',
    method: 'post',
    data: data
  })
}

// 修改menu
export function updateMenu(data) {
  return request({
    url: '/intel/menu',
    method: 'put',
    data: data
  })
}

// 删除menu
export function delMenu(id) {
  return request({
    url: '/intel/menu/' + id,
    method: 'delete'
  })
}

// 导出menu
export function exportMenu(query) {
  return request({
    url: '/intel/menu/export',
    method: 'get',
    params: query
  })
}

// 下载二维码
export function downCode() {
  return request({
    url: '/api-min/qrcode/eatdownload',
    method: 'get',
    responseType: 'bolb',
  })
}