// pages/category/category.js
import {
  categoryData
} from '../../service/category.js'
Page({

  data: {
    categorys: [],
    animationTime: 1,
    id: 0,
    loadModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取分类数据
    this._categoryData()
  },
  _categoryData() {
    categoryData().then(res => {
      if(res.code === 0) {
        const categorys = res.data
        const per_page = res.data.count
        this.setData({
          categorys,
          per_page,
          loadModal: false
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击分类
  clickcategory(e) {
    const index = e.currentTarget.dataset.index
    const title = this.data.categorys[index].title
    const count = this.data.categorys[index].count
    const name = this.data.categorys[index].name
    wx.navigateTo({
      url: '/pages/list/list?title=' + title,
    })
  }

})