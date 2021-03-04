// components/comments/comments.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allcomments:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    replyname:'',
    replyId:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickparentcomments(e){
      console.log(e, '123456')
      const replyname=e.currentTarget.dataset.name
      const replyId=e.currentTarget.dataset.id
      const formId=e.currentTarget.dataset.formid
      const userid=e.currentTarget.dataset.userid
      this.setData({
        replyname,
        replyId
      })
      const data={
        'replyId': this.data.replyId,
        'replyname': this.data.replyname,
        'formId': formId,
        'userid': userid
      }
      this.triggerEvent('parentcomment',data,{})
    },
    clickcchildcomments(e){
 
      const replyname=e.currentTarget.dataset.name
      const replyId=e.currentTarget.dataset.id
      const formId=e.currentTarget.dataset.formId
      const userid=e.currentTarget.dataset.userid
      this.setData({
        replyname,
        replyId
      })
      const data={
        'replyId':this.data.replyId,
        'replyname':this.data.replyname,
        'formId':formId,
        'userid':userid
      }
      this.triggerEvent('childcomment',data,{})
    }
  },
  options: {
    addGlobalClass: true
  }
})
