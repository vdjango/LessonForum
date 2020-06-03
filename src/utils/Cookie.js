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

import Cookies from 'js-cookie'

export default {
  /* 获取Cookies中的JwtToken令牌 */
  getCookieAutherizationToken: function () {
    const t = Cookies.get('token')
    if (t) return t
    return null
  },
  /* 获取Cookies中的JwtToken令牌 */
  getCookieAutherization: function () {
    const a = {}
    if (Cookies.get('pk')) a['pk'] = Cookies.get('pk')
    if (Cookies.get('token')) a['token'] = Cookies.get('token')
    if (Cookies.get('username')) a['username'] = Cookies.get('username')
    console.log('getCookieAutherization', a)
    return a
  },
  /* 获取Cookies中的Username用户名 */
  getCookieAutherizationUsername: function () {
    const u = Cookies.get('username')
    if (u) return u
    return null
  },
  /* 设置Cookies中的JwtToken令牌
   * @param {String} token JwtToken令牌
   * @param {String} username 用户名 为空默认null */
  setCookieAutherization: function (data) {
    Cookies.set('pk', data.pk)
    Cookies.set('token', data.token)
    if (data.user) Cookies.set('username', data.user)
    if (data.usercode) Cookies.set('usercode', data.usercode)
  },
  /* 清除Cookies中的JwtToken令牌 */
  clearCookieAutherization: function () {
    Cookies.remove('pk')
    Cookies.remove('token')
    Cookies.remove('username')
    Cookies.remove('usercode')
  }
}
