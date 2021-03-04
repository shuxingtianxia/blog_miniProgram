import { onLogin } from '../service/index'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const $wx = {
  // 获取微信code
  getWxCode () {
    return new Promise(resolve => {
      wx.login({
        success: res => {
          resolve(res.code)
        },
        fail: () => {
          resolve(false)
        }
      })
    })
  },
  // 获取用户信息
  getUserInfo () {
    return new Promise(resolve => {
      wx.getUserInfo({
        withCredentials: true,
        lang: 'zh_CN',
        success: res => {
          resolve(res)
        },
        fail: err => {
          console.log('用户信息错误', err)
          resolve(false)
        }
      })
    })
  },
  // 校验token
  checkSession () {
    return new Promise(resolve => {
      wx.checkSession({
        success: () => {
          console.log('session有效')
          resolve(true)
        },
        fail: () => {
          console.log('session失效')
          resolve(false)
        }
      })
    })
  },
  // 使用微信登录
  wxLogin (callback) {
    // let session = await this.checkSession()
    return new Promise(async resolve => {
      let code = await this.getWxCode()
      let userInfo = await this.getUserInfo()
      console.log('code', code);
      console.log('userInfo', userInfo);
      let data = {
        code,
        iv: userInfo.iv,
        encryptedData: userInfo.encryptedData
      }
      // if (Store.state.registerChannel) data.registerChannel = Store.state.registerChannel
      console.log('登录请求数据', data)
      onLogin(data).then(res => {
        wx.hideLoading()
        console.log(res);
        if (res.code === 0) {
          console.log('用户token', res.data.token)
          // wx.setStorageSync('code', code)
          // wx.setStorageSync('uid', res.data.talkAccid)
          // wx.setStorageSync('sdktoken', res.data.talkToken)
          wx.setStorageSync('token', res.data.token)
          // wx.setStorageSync('userCode', res.data.userCode)
          // wx.setStorageSync('unionId', res.data.wxUserInfoDto.unionid)
          wx.setStorageSync('userInfo', { nickName: res.data.nickName, avatar: res.data.avatarUrl, userId: res.data.userId })
          
          if (res.data.phone) {
            wx.setStorageSync('phone', res.data.phone)
          }
          // let location = {...Store.state.location}
          // let provinceCode = ''
          // let cityCode = ''
          // cityDataJson.citylist.forEach(item => {
          //   // 省code
          //   if (item.value === location.province) {
          //     provinceCode = item.id
          //   }
          //   item.city.forEach(ite => {
          //     // 市code
          //     if (ite.value === location.city) {
          //       cityCode = ite.id
          //     }
          //   })
          // })
          // console.log(Store.state.location, '看看定位的数据', cityDataJson, provinceCode, cityCode)
          // if (!res.data.authorizeLocationTime) {
          //   let data = {
          //     area: '',
          //     areaCode: '',
          //     city: location.city,
          //     cityCode: cityCode,
          //     latitude: location.point.latitude,
          //     longitude: location.point.longitude,
          //     province: location.province,
          //     provinceCode: provinceCode
          //   }
          //   AuthorizeLocation(data)
          // }
          // Store.dispatch('connect')
          // // 如果通过带shareTicket分享卡片进入小程序，带有微信群信息
          // let WXGroupInfo = Store.state.WXGroupEncryptedData
          // if (WXGroupInfo) {
          //   let params = {
          //     encryptedData: WXGroupInfo.encryptedData,
          //     iv: WXGroupInfo.iv
          //   }
          //   BindWXGroup(params).then(res => {
          //     console.log('【登录后绑定微信群】', res)
          //   })
          // }
          callback && callback(res)
          resolve()
        }
      })
    })
  },
}

module.exports = {
  formatTime,
  $wx
}
