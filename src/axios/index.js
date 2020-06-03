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

/*
 * [*] 必填 否则查询不到
 * [x] 不存在的参数，不能填 */
import 'es6-promise/auto'
import axios from 'axios'
import Cookies from '@/utils/Cookie'
import config from '@/../dev.env'

import {
  authorization,
  authorizationRefresh,
  authorizationVerify,
  authorizationRegister,
  user,
  userInfo,
  userIntegral,
  userViolation,
  userEdu,
  userSchool,
  userSchoolManyUser,
  classQuestion,
  classQuestionChapter,
  classQuestionModel,
  questionAnswer,
  questionQues,
  userSemester,
  userExamStock,
  questionExam,
  crontabIndex,
  systemIndex,
  systemQuestion,
  cron,
  cronUser
} from './restful'

axios.defaults.baseURL = config.API.BASE_URL
axios.defaults.timeout = config.API.TIMEOUT
axios.defaults.withCredentials = config.API.WITHCREDENTIALS
axios.defaults.xsrfCookieName = config.API.XSRFCOOKIENAME
axios.defaults.xsrfHeaderName = config.API.XSRFHEADERNAME

/* 接口请求拦截器 */
axios.interceptors.request.use(requset => {
  const Autherization = Cookies.getCookieAutherization()
  console.log('Autherization.token:' + Autherization.token)
  if (Autherization.token) {
    requset.headers.Authorization = config.API.TOKENPREFIX + ' ' + Autherization.token
  }
  return requset
}, error => {
  // eslint-disable-next-line no-undef
  return Promise.reject(error.response)
})
/* 请求数据返回拦截器 */
axios.interceptors.response.use(response => {
  return response
}, error => {
  console.log('error', error.response)
  // eslint-disable-next-line no-undef
  return Promise.reject(error.response)
})
export default {
  /*
   * 拼接data/pagination数据部分
   * @param {Object} data 用户请求数据
   * @param {Object} pagination 分页器，实现数据条目分页处理
   *     pagination.index 分页索引
   *     pagination.pageSize 分页大小(一个分页多少条数据)
   *     pagination.count 分页总数(接口数据集合条目)
   *     pagination.next 下一页(没有数据为null)
   *     pagination.previous 上一页(没有数据为null) */
  Data: function (data, pagination = {}) {
    if (pagination) {
      let offset = pagination.index
      const limit = pagination.pageSize

      if (offset && limit) {
        offset = Math.round(limit * (offset - 1) + 0.4)
        data['offset'] = offset
        data['limit'] = limit
      }
    }
    return this.UpFormData(data)
  },
  UpFormData: function (data) {
    /**
     * 针对文件上传操作进行优化
     * 支持上传文件操作
     * @type {FormData}
     */
    var objects = false
    for (const key in data) {
      // [object Date]
      if (Object.prototype.toString.call(data[key]) === '[object File]') {
        objects = true
        console.log(Object.prototype.toString.call(data[key]))
        continue
      }
    }
    if (objects) {
      var formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      return formData
    }
    return data
  },
  /* 获取JwtToken令牌
   * @param {String} username 用户名 [*]
   * @param {String} password 密码 [*] */
  authorization: function (username, password) {
    return Axios(authorization(), 'POST', this.Data({
      username: username,
      password: password
    }))
  },
  /* 刷新JwtToken令牌过期时间
   * @param {String} token JwtToken令牌 [*] */
  authorizationRefresh: function (token) {
    return Axios(authorizationRefresh(), 'POST', this.Data({
      token: token
    }, {}))
  },
  /* 验证JwtToken令牌是否有效
   * @param {String} token JwtToken令牌 [*] */
  authorizationVerify: function (token) {
    return Axios(authorizationVerify(), 'POST', this.Data({
      token: token
    }, {}))
  },
  /* 用户注册
   * @param {String} method [POST|OPTIONS] 等请求方式
   * @param {Object} data 请求数据 */
  authorizationRegister: function (method = 'POST', data = {}) {
    return Axios(authorizationRegister(), method, this.Data(data))
  },
  /* 用户基本信息
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  user: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(user(index), method, this.Data(data, pagination))
  },
  /* 用户基本工作信息
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userInfo: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userInfo(index), method, this.Data(data, pagination))
  },
  /* 用户积分信息
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userIntegral: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userIntegral(index), method, this.Data(data, pagination))
  },
  /* 用户违规记录信息
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userViolation: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userViolation(index), method, this.Data(data, pagination))
  },
  /* 学校
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userEdu: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userEdu(index), method, this.Data(data, pagination))
  },
  /* 班级
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userSchool: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userSchool(index), method, this.Data(data, pagination))
  },
  /* 学生所对应的班级以及教师所教授的班级 用户表-班级
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userSchoolManyUser: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userSchoolManyUser(index), method, this.Data(data, pagination))
  },
  /**
   * 计算机与网络（书名分类） -
   *    第一模块： 硬件 （模块分类） -
   *       第一章： 综合布线 （章节分类） -
   *          选择题(ABCD)|判断题(AB)|简答题(T)|机试题(T)
   *             答案
   *
   *       第二章： 服务器 -
   *          选择题(ABCD)|判断题(AB)|简答题(T)|机试题(T)
   *             答案
   *
   *    第二模块： 软件 -
   *       第一章： Word的操作使用 -
   *          选择题(ABCD)|判断题(AB)|简答题(T)|机试题(T)
   *             答案
   *
   *       第二章： Excel的操作使用 -
   *          选择题(ABCD)|判断题(AB)|简答题(T)|机试题(T)
   *             答案
   */
  /* 书名分类
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  classQuestion: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(classQuestion(index), method, this.Data(data, pagination))
  },
  /* 模块分类
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  classQuestionModel: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(classQuestionModel(index), method, this.Data(data, pagination))
  },
  /* 章节分类
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  classQuestionChapter: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(classQuestionChapter(index), method, this.Data(data, pagination))
  },
  /* [选择题|判断题|简答题|机试题]: 题库
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  questionQues: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(questionQues(index), method, this.Data(data, pagination))
  },
  /* [选择题|判断题|简答题|机试题]: 答案
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  questionAnswer: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(questionAnswer(index), method, this.Data(data, pagination))
  },
  /* 当前班级正在学习的课程 在授班级 所教授的课程进度 [书名-模块-章节]
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userSemester: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userSemester(index), method, this.Data(data, pagination))
  },
  /* 章节进度 当前班级正在学习的章节
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  userExamStock: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(userExamStock(index), method, this.Data(data, pagination))
  },
  /* 学员正在学习的书籍
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  questionExam: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(questionExam(index), method, this.Data(data, pagination))
  },
  /**
   * 后台管理
   */
  /* 后台设置 定时任务
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  crontabIndex: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(crontabIndex(index), method, this.Data(data, pagination))
  },
  /* 后台设置 分页设置
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  systemIndex: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(systemIndex(index), method, this.Data(data, pagination))
  },
  /* 后台设置 刷/考相关设置 控制前端抓取题库题项数量
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  systemQuestion: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(systemQuestion(index), method, this.Data(data, pagination))
  },
  /**
   *
   */
  /* 记录班级任务执行情况
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  cron: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(cron(index), method, this.Data(data, pagination))
  },
  /* 记录学员完成任务情况
   * @param {String} method [ALL] 等请求方式
   * @param {Object} data 请求数据 */
  cronUser: function (method = 'GET', data = {}, index = null, pagination = {}) {
    return Axios(cronUser(index), method, this.Data(data, pagination))
  }
  /*
   * 请按照以下规范来完成后端接口对接
   * Dome: function (method = 'GET', data = {}, index = null, pagination = {}) {
   *    return Axios(Dome(index), method, this.Data(data, pagination))
   * }
   */
}

/* 封装好的请求方法
 * @param {String} url 请求接口地址，不带http://xxx.xxx.xxx
 * @param {String} method 请求方式[GET|POST|PUT|PATCH|DELETE|...], restful有的method方法都支持，只需传入即可
 * @param {Object} data 用户接口请求的data数据 */
export function Axios (url, method = 'GET', data = {}) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    let params = null
    if (method.toUpperCase() === 'GET') {
      params = data
      data = null
    }
    const validateStatus = status => {
      /* 定义接口有效状态码范围 */
      return status >= 199 && status < 300
    }
    axios({
      url: url,
      data: data,
      params: params,
      method: method,
      validateStatus: validateStatus
    }).then(response => {
      return resolve(response)
    }).catch(error => {
      return reject(error)
    }).finally(finallys => {
      return resolve(finallys)
    })
  })
}
