const STORAGE_KEY = 'PLUG-ADD-MYAPP-KEY'
Component({
  properties: {
    name: {
      type: String,
      value: 'Halo-Dream'
    },
    duration: {
      type: Number,
      value: 5
    },
    delay: {
      type: Number,
      value: 2
    },
    logo: {
      type: String,
      value: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=208703736,1500950703&fm=58'
    },
    custom: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      if (wx.getStorageSync(STORAGE_KEY)) return;
      // 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点
      let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
      // 屏幕宽度
      let { screenWidth } = wx.getSystemInfoSync()
      this.setData({
        navbarHeight: rect.bottom,
        arrowR: screenWidth - rect.right + rect.width * 3 / 4 - 5,
        bodyR: screenWidth - rect.right
      })
      this.startTimer = setTimeout(() => {
        this.setData({
          SHOW_TOP: true
        })
      }, this.data.delay * 500)
      this.duraTimer = setTimeout(() => {
        this.shrink();
      }, (this.data.duration + this.data.delay) * 500)
    },
    // 在组件实例被从页面节点树移除时执行
    detached() {
      if (this.startTimer) clearTimeout(this.startTimer)
      if (this.duraTimer) clearTimeout(this.duraTimer)
    },
  },
  data: {
    SHOW_TOP: false
  },
  methods: {
    hidden() {
      wx.setStorageSync(STORAGE_KEY, true)
      this.shrink()
    },
    shrink() {
      // 从小程序基础库 2.9.0 开始支持一种更友好的动画创建方式，用于代替旧的 wx.createAnimation 
      // this.animate(selector, keyframes, duration, callback)
      console.log('this.data.arrowR', this.data.arrowR)
      this.animate('#add-tips', [
        { scale: [1, 1] },
        { scale: [0, 0], ease: 'ease', transformOrigin: `calc(600rpx - ${this.data.arrowR}px) 1%` }
      ], 500, () => {
        this.setData({
          SHOW_TOP: false
        })
      })
    }
  }
})