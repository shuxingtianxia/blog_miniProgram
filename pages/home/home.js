// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 赞赏支持
  showQrcode() {
    wx.previewImage({
      urls: ['http://blog.booktianxia.top/static/img/wx.fcc3636.jpg'],
      current: 'http://blog.booktianxia.top/static/img/wx.fcc3636.jpg' // 当前显示图片的http链接      
    })
  }
})