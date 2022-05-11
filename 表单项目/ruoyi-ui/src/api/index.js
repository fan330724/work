import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/yw/controln/list',
    method: 'get',
    params: query
  })
}
export function add(data) {
  return request({
    url: '/yw/controln',
    method: 'post',
    data: data
  })
}
export function look(id) {
  return request({
    url: '/yw/controln/' + id,
    method: 'get',
  })
}
// 删除
export function del(infoId) {
  return request({
    url: '/yw/controln/' + infoId,
    method: 'delete'
  })
}
