import request from '../service/network.js'
import { BASEURL } from './config.js'

// 获取banner
export function bannersData(){
  return  request({
    url: '/banner'
  })
}

// 获取文章信息
export function articleDatas(data){
  return  request({
    url: '/index_article',
    data
  })
}

// 登录
export function onLogin(data){
  return  request({
    url: '/onLogin',
    method: 'get',
    data
  })
}

export function ratingarticles(){
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL+'/wp-json/watch-life-net/v1/post/pageviewsthisyear',
      method: 'get',
      success:resolve,
      fail:reject
    })
  })
}
