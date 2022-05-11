import request from '@/utils/request'

// 查询menusignin列表
export function listMenusignin(query) {
  return request({
    url: '/intel/menusignin/list',
    method: 'get',
    params: query
  })
}

// 查询menusignin详细
export function getMenusignin(id) {
  return request({
    url: '/intel/menusignin/' + id,
    method: 'get'
  })
}

// 新增menusignin
export function addMenusignin(data) {
  return request({
    url: '/intel/menusignin',
    method: 'post',
    data: data
  })
}

// 修改menusignin
export function updateMenusignin(data) {
  return request({
    url: '/intel/menusignin',
    method: 'put',
    data: data
  })
}

// 删除menusignin
export function delMenusignin(id) {
  return request({
    url: '/intel/menusignin/' + id,
    method: 'delete'
  })
}

// 导出menusignin
export function exportMenusignin(query) {
  return request({
    url: '/intel/menusignin/export',
    method: 'get',
    params: query
  })
}