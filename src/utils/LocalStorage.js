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
  /* 清除 localStorage 对象所有的项
   * 慎用 */
  clear: function () {
    localStorage.clear()
  },
  /* 获取一个值 */
  getItem: function (key) {
    localStorage.getItem(key)
  },
  /* 存入一个值 */
  setItem: function (key, value) {
    localStorage.setItem(key, value)
  },
  /* 删除一个值 */
  removeItem: function (key) {
    localStorage.removeItem(key)
  },
  /* 获取用户名称 */
  getUsername: function () {
    const u = localStorage.getItem('username')
    console.log('git', u)
    if (u) return u
    return null
  },
  /* 设置用户名称
   * @param {String} value 用户名 */
  setUsername: function (value) {
    localStorage.setItem('username', value)
  },
  /* 删除用户名称 */
  delUsername: function () {
    localStorage.removeItem('username')
  }
}
