import { BASEURL }from '../service/config.js'

export default function(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: BASEURL + '/client' + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: {
        'content-type': (options.method || 'get').toUpperCase() === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Authorization': wx.getStorageSync('token') || null
      },
      success (res) {
        if(res.data.code === 0) {
          resolve(res.data)
        } else {
          resolve(res.data)
          // wx.clearStorage()
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'none',
          //   duration: 1500
          // })
        }
      },
      fail (err) {
        console.log(err)
      }
    })
  })
}
