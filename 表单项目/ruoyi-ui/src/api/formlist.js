import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/yw/content/list',
    method: 'get',
    params: query
  })
}