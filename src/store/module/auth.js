/*

  Copyright (C) 2019 张珏敏.

  This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import Cookies from '@/utils/Cookie'
import router from '@/router/index'

const autherization = Cookies.getCookieAutherization()
const pk = autherization.pk
const token = autherization.token
const user = autherization.username
let verify = false
if (token && user) verify = true
console.log('token', token)
console.log('user', verify)

export default {
  namespaced: true,
  state: {
    auth: {
      pk: pk,
      verify: verify,
      token: token,
      user: user
    }
  },
  mutations: {
    /* 储重用户登录信息 */
    setAutherization: function (state, data) {
      state.auth.pk = data.pk
      state.auth.token = data.token
      state.auth.user = data.user
      state.auth.verify = data.verify
      Cookies.setCookieAutherization({
        pk: data.pk,
        token: data.token,
        user: data.user
      })
    },
    /* 清除关于Autherizatiuon认证令牌存储信息， 将其重置 */
    clearAutherization: function (state) {
      state.auth.token = null
      state.auth.user = null
      state.auth.verify = false
      Cookies.clearCookieAutherization()
      console.log('out')
      router.push({
        name: 'index'
      })
    }
  },
  actions: {},
  getters: {
    getVerify: function (state) {
      return state.auth.verify
    },
    getUser: function (state) {
      return state.auth.user
    },
    getUserPk: function (state) {
      return state.auth.pk
    }
  }
}
