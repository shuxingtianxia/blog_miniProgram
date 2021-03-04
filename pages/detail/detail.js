import { $wx } from '../../utils/util'
// pages/detail/detail.js
import {
  getpostData,
  getComments,
  sendComment,
  PostLove,
  PostMore
} from '../../service/detail.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    postContent: '',
    headimg: '',
    title: '',
    isLike: false,
    lovecnt: 0,
    readcnt: 0,
    comments: 0,
    posttime: 0,
    category_name: '',
    allcomments: [],
    isShow: false,
    isLoad: true,
    menuBackgroup: false,
    postid: '', // 文章ID
    inputcontent: '评论一下吧~',
    replyId: '0',
    content: '',
    username: '',
    author_email: '',
    avatar: '',
    userId: '',
    formid: '',
    islogin: false,
    hiddenbutton: false,
    inputemail: '邮箱必填(留言回复后将会发邮件给你)',
    Email: '2448282543@qq.com',
    SaveEmail: '',
    isCanDraw: false,
    isChange: false,
    page: 0, // 评论分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 文章id
    const id = options.id
    this.setData({
      postid: id
    })
    // 文章详情
    this._getpostData(id)
    // if (limit > 0) {
    //评论详情
    this._getComments(id)
    // }
    
  },
  onShow: function () {
    this._login()
  },
  // 判断是否登录
  async _login() {
    let isLogin = await $wx.checkSession()
    this.setData({
      islogin: isLogin,
      hiddenbutton: isLogin,
    })
  },

  // 文章详情
  _getpostData(id) {
    console.log(wx.getStorageSync('userInfo'), "wx.getStorageInfoSync('userInfo')")
    const userId = wx.getStorageSync('userInfo')['userId'] || null;
    const result = userId ? { id, userId } : { id }
    getpostData(result).then(res => {
      if(res.code === 0) {
        const result = res.data
        console.log(result);
        const postContent = result.articleContent
        const title = result.articleName
        const headimg = result.articleImgUrl
        const lovecnt = result.likeCount
        const readcnt = result.views
        const posttime = result.time
        const comments = result.comments
        const category_name = result.articleCategory
        const isLike = result.isLike
        //  console.log(tags)
        this.setData({
          postContent, // 文章内容
          title, // 标题
          headimg, // 分享头像
          lovecnt, // 点赞数量
          readcnt, //查看数量
          posttime,
          comments,
          category_name,
          isLike
        })
      }
    }).catch(err => {
      console.log(err)
    })

  },

  //评论详情
  _getComments() {
    const page = this.data.page + 1
    const articleId = this.data.postid
    getComments({articleId, page}).then(res => {
      if(res.code === 0) {
        const allcomments = res.data.data
        this.setData({
          allcomments,
          page: page,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  wxmlTagATap(e) {
    wx.setClipboardData({
      data: e.detail.src,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    console.log(res)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // console.warn(this.data.postId);
    return {
      title: this.data.title,
      path: '/pages/detail/detail?id=' + this.data.postid + '&comments=' + this.data.comments,
      imageUrl: this.data.headimg,
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareTimeline: function () {
    // console.warn(this.data.postId);
    console.log(this.data.postid)
    return {
      title: this.data.title,
      path: '/pages/detail/detail?id=' + this.data.postid + '&comments=' + this.data.comments,
      imageUrl: this.data.headimg,
    }
  },
  //父级评论
  parentcomment(e) {
    console.log('e-----------', e)
    const { replyId, formId, replyname } = e.detail
    const inputcontent = '@' + replyname
    const {nickName, userId, avatar} = wx.getStorageSync('userInfo')
    
    this.setData({
      inputcontent,
      replyId,
      formId,
      userId,
      avatar,
      nickName
    })
  },
  //子级评论
  childcomment(e) {
    const inputcontent = '@' + e.detail.replyname
    const replyId = e.detail.replyId
    const formId = e.detail.formId
    const userId = e.detail.userId
    const avatar = this.data.avatar
    this.setData({
      inputcontent,
      replyId,
      formid: formId,
      userId,
      avatar
    })
  },
  //评论输入框
  inputcontent(e) {
    var content = e.detail.value.replace(/\s+/g, '');
    //console.log(content);
    this.setData({
      content: content,
    });
  },
  //提交评论
  submitcontent(e) {
    const {nickName, userId, avatar} = wx.getStorageSync('userInfo')
    const { content, replyId, formId, postid } = this.data

    const data = {
      username: nickName,
      articleId: postid,
      content, //
      replyId, // 父级ID
      userId,
      formId,
      avatar
    }
    if (this.data.content.length > 0) {
      if (this.data.islogin && this.data.content.length > 0) {
        sendComment(data).then(res => {
          wx.showToast({
            title: '留言成功待审核',
            icon: 'success',
            duration: 1500
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: '评论内容或邮箱不能为空',
        icon: 'none',
        duration: 1500
      })
    }

  },
  // 点击登录
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo, 'e.detail.userInfo')
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        username: e.detail.userInfo.nickName,
        avatar: e.detail.userInfo.avatarUrl,
        islogin: true,
        hiddenbutton: true
      });
      $wx.wxLogin()
      // wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
      // wx.setStorageSync('nickName', e.detail.userInfo.nickName)
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '请重新授权后再访问',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  clickadduserinfo(e) {
    try {
      const inputemail = wx.getStorageSync('email')
      if (inputemail) {
        this.setData({
          inputemail
        })
      }
    } catch (e) {}
    this.setData({
      modalName: e.currentTarget.dataset.target,
    })
  },
  inputemail(e) {
    var content = e.detail.value.replace(/\s+/g, '');
    this.setData({
      Email: content,
      isChange: true
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  saveinfo(e) {
    var that = this
    try {
      var emaildata = wx.getStorageSync('email')
      if (emaildata && !that.data.isChange) {
        that.setData({
          modalName: null,
          SaveEmail: emaildata
        })
      } else {
        const Email = that.data.Email
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var isOk= reg.test(Email);
        if(isOk){
          that.setData({
            modalName: null,
            SaveEmail: Email
          })
          wx.setStorageSync('email', Email)
        }else{
          wx.showToast({
            title: '邮箱格式不正确',
            icon: 'none',
            duration: 1500
          })
        }
        
      }
    } catch (e) {
      console.log(e)
    }
  },
  createShareImage() {
    this.setData({
      isCanDraw: !this.data.isCanDraw
    })
  },
  // 点赞
  LovethisPost(e) {
    console.log(e, '-----------')
    if (this.data.islogin) {
      const data = {
        articleId: this.data.postid,
        userId: wx.getStorageSync('userInfo')['userId']
      }
      PostLove(data).then(res => {
        console.log(res.data.isLike, 'res.isLike')
        this.setData({
          isLike: res.data.isLike
        })
        if(res.data.isLike) {
          wx.showToast({
            title: '点赞成功',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '取消成功',
            icon: 'none',
            duration: 1500
          })
        }

      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请先进行登录',
        icon: 'none',
        duration: 1500
      })
    }

  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://imapi.datealive.top/zanshang/img/weipayimg.jpg'],
      current: 'https://imapi.datealive.top/zanshang/img/weipayimg.jpg' // 当前显示图片的http链接      
    })
  },
  // 向上滚动
  onReachBottom() {
    // this.setData({
    //   loadModal: true
    // })
    this._getComments()
    //  console.log(this.data.isload)
  },


})