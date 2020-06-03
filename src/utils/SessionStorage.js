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

export default {
  /* 获取JwtToken令牌 */
  GetJwtToken: function () {
    sessionStorage.getItem('token')
  },
  /* 设置JwtToken令牌
   * @param {String} token 令牌 */
  SetJwtToken: function (token) {
    sessionStorage.setItem('token', token)
  },
  /* 移除JwtToken令牌 */
  DelJwtToken: function () {
    sessionStorage.removeItem('token')
  },
  /* 清除 sessionStorage 对象所有的项
   * 慎用 */
  Clear: function () {
    sessionStorage.clear()
  },
  /* 获取一个值 */
  Get: function (key) {
    sessionStorage.getItem(key)
  },
  /* 存入一个值 */
  Set: function (key, value) {
    sessionStorage.setItem(key, value)
  },
  /* 删除一个值 */
  Del: function (key) {
    sessionStorage.removeItem(key)
  }
}
