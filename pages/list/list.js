// pages/list/list.js
import {
  categoryArticles
} from '../../service/category.js'
Page({
  data: {
    title: '',
    articles: [],
    loadModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const title = options.title
    const name = options.name
    const count = options.count
    this.setData({
      title
    })
    // 获取数据
    this._categoryArticles()
  },

  // 获取数据
  _categoryArticles() {
    const {title} = this.data
    categoryArticles({category: title}).then(res => {
      console.log('res', res)
      if (res.code === 0) {
        const articles = res.data.data
        this.setData({
          articles,
          loadModal: false
        })
      } else {
        wx.showToast({
          title: '无数据',
          duration: 1500
        })
      }

    }).catch(err => {
      console.log(err)
    })
  }
})