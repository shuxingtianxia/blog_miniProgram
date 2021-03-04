import request from '../service/network.js'
import { BASEURL } from './config.js'

// 获取详情
export function getpostData(data){
  return  request({
    url: '/index_detail',
    data
  })
}

// 获取评论
export function getComments(data){
  return request({
    url: '/index_detail_comments',
    method: 'get',
    data
  })
}

// 发送评论
export function sendComment(data){
  return request({
    url: '/index_detail_comment',
    method: 'post',
    data
  })
}

// 点赞
export function PostLove(data){
  return request({
    url: '/index_detail_like',
    method: 'post',
    data
  })
}

// 更多
export function PostMore(id,tags){
  return  request({
    url:'posts?per_page=5&&page=1',
    data:{
      exclude:id,
      tags
    }
  })
}