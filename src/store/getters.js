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
  // 获取App视图开关状态[用于刷新App视图]
  getIsRouterAlive: function (state) {
    return state.isRouterAlive
  },
  getTopActive: function (state) {
    return state.topActive
  },
  getLeftMenu: function (state) {
    return state.leftMenu
  },
  getTopPath: function (state) {
    return state.topPath
  },
  getTopHeader: function (state) {
    return state.topHeader
  }
}
