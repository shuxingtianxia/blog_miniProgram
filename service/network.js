import { BASEURL }from '../service/config.js'

export default function(options){
  return new Promise((resolve,reject)=>{
    console.log(getApp().globalData.token);
    wx.request({
      url: BASEURL + '/client' + options.url,
      method: options.method || 'get',
      data: options.data || {},
      header: {
        'content-type': (options.method || 'get').toUpperCase() === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Authorization': getApp().globalData.token
      },
      success (res) {
        resolve(res.data)
      },
      fail: reject
    })
  })
}
