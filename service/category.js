import request from '../service/network.js'

// 分类数据
export function categoryData(){
  return  request({
    url:'/index_category'
  })
}

// 查找单个分类的数据
export function categoryArticles(data){
  return request({
    url:'/index_article_category',
    method: 'get',
    data
  })
}