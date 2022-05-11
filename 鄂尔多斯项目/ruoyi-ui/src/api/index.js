import request from '@/utils/request'

// 首页顶部数据
export function intel() {
  return request({
    url: '/intel/index/data',
    method: 'post'
  })
}

// 首页老师名单
export function teacherList() {
  return request({
    url: '/intel/index/teacherList',
    method: 'post'
  })
}

// 获取用户详细信息
export function studentList() {
  return request({
    url: '/intel/index/studentList',
    method: 'post'
  })
}