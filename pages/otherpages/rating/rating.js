// pages/otherpages/rating/rating.js
import { 
  articleDatas
 } from '../../../service/index.js'
Page({

  data: {
    page: 0, // 分页
    articles:[],
    loadModal:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取文章数据
    this._articleDatas()
  },
  // 获取文章数据
  _articleDatas(){
    const page = this.data.page + 1
    articleDatas({page, view: true}).then(res=>{
      if (res.code === 0) {
        const { count, limit, page, pages } = res.data
        this.data.paging = {
          count, limit, page, pages
        }
        const newArticles = res.data.data
        const oldArticles = this.data.articles
        oldArticles.push(...newArticles)
        console.log(oldArticles);
        this.setData({
          articles: oldArticles,
          page: page,
          loadModal: false
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '已经到底部了',
          duration: 1500
        })
        this.setData({
          loadModal: false
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  },
  // 上拉刷新
  onReachBottom() {
    const { page, pages } = this.data.paging
    if(pages <= page) return
    this.setData({
      loadModal: true
    })
    this._articleDatas()
  },
})