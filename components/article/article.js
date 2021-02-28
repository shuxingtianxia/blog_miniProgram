// components/article/article.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgurl:'https://datealive.top/wp-content/uploads/2020/05/26.jpg',
    index:0,
    animationTime: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      // console.log(this.data.item);
      const id = (this.data.item._id || this.data.item.post_id)
      wx.navigateTo({
        url: '/pages/detail/detail?id='+id,
      })
      //console.log(this.data.item)
    }
  },
  options: {
    addGlobalClass: true
  }
})
