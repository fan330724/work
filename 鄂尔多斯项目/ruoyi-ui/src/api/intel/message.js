import request from '@/utils/request'

// 查询消息列表
export function listMessage(query) {
  return request({
    url: '/intel/message/list',
    method: 'get',
    params: query
  })
}

// 查询消息详细
export function getMessage(id) {
  return request({
    url: '/intel/message/' + id,
    method: 'get'
  })
}

// 新增消息
export function addMessage(data) {
  return request({
    url: '/intel/message',
    method: 'post',
    data: data
  })
}

// 修改消息
export function updateMessage(data) {
  return request({
    url: '/intel/message',
    method: 'put',
    data: data
  })
}

// 删除消息
export function delMessage(id) {
  return request({
    url: '/intel/message/' + id,
    method: 'delete'
  })
}

// 导出消息
export function exportMessage(query) {
  return request({
    url: '/intel/message/export',
    method: 'get',
    params: query
  })
}