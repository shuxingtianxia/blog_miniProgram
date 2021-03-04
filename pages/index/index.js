//index.js
const app = getApp()


import {
  bannersData,
  articleDatas
} from '../../service/index.js'

Page({
  data: {
    bannersPost: {},
    articles: [],
    isload: true,
    page: 0,
    loadModal: true,
    paging: {}
  },
  onLoad: function (options) {
    this._BannersData()
    this._articleDatas()
  },
  // 获取banner数据
  _BannersData() {
    bannersData().then(res => {
      this.setData({
        bannersPost: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取文章数据
  _articleDatas() {
    const page = this.data.page + 1
    articleDatas({page}).then(res => {
      if (res.code === 0) {
        const { count, limit, page, pages } = res.data
        this.data.paging = {
          count, limit, page, pages
        }
        const newarticles = res.data.data
        const oldarticles = this.data.articles
        oldarticles.push(...newarticles)
        console.log(oldarticles);
        this.setData({
          articles: oldarticles,
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
    }).catch(err => {

    })
  },
  onReachBottom() {
    const { count, limit, page, pages } = this.data.paging
    if(pages <= page) return
    this.setData({
      loadModal: true
    })
    this._articleDatas()
    //  console.log(this.data.isload)
  },
  onShareAppMessage: function (res) {
    return {
      title: '书行天下博客小程序',
      path: '/pages/index/index',
      imageUrl: 'https://datealive.top/wp-content/uploads/2020/10/16036409421.png',
    }
  }
})