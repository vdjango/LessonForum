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
const auth = {
  authorization: 'account/authorization/',
  authorizationRefresh: 'account/authorization-refresh/',
  authorizationVerify: 'account/authorization-verify/',
  authorizationRegister: 'account/authorization-register/',
  user: 'account/user/',
  userInfo: 'account/user-info/',
  userIntegral: 'account/user-integral/',
  userViolation: 'account/user-violation/',
  userEdu: 'account/user-edu/',
  userSchool: 'account/user-school/',
  userSchoolManyUser: 'account/user-school-many-user/'
}

const question = {
  classQuestion: 'question/class-question/',
  classQuestionModel: 'question/class-question-model/',
  classQuestionChapter: 'question/class-question-chapter/',
  question: 'question/question/',
  questionAnswer: 'question/question-answer/',
  userSemester: 'question/user-semester/',
  questionExam: 'question/question-exam/',
  userExamStock: 'question/user-exam-stock/'
}

const conf = {
  systemIndex: 'conf/system-index/',
  systemQuestion: 'conf/system-question/'
}

const crontab = {
  crontab: 'crontab/crontab/'
}

const exam = {
  cron: 'exam/cron/',
  cronUser: 'exam/cron-user/'
}

/*
 * 获取Jwt Token令牌
 * @url /account/authorization/
 * @param {Number} index 接口索引 */
export function authorization (index = null) {
  if (index) return auth.authorization + index + '/'
  return auth.authorization
}

/*
 * 刷新Jwt Token令牌
 * @url /account/authorization-refresh/
 * @param {Number} index 接口索引 */
export function authorizationRefresh (index = null) {
  if (index) return auth.authorizationRefresh + index + '/'
  return auth.authorizationRefresh
}

/*
 * 验证Jwt Token令牌
 * @url /account/authorization-verify/
 * @param {Number} index 接口索引 */
export function authorizationVerify (index = null) {
  if (index) return auth.authorizationVerify + index + '/'
  return auth.authorizationVerify
}

/*
 * 用户注册
 * @url /account/authorization-register/
 * @param {Number} index 接口索引 */
export function authorizationRegister (index = null) {
  if (index) return auth.authorizationRegister + index + '/'
  return auth.authorizationRegister
}

/*
 * 用户基本信息
 * @url /account/user/
 * @param {Number} index 接口索引 */
export function user (index = null) {
  if (index) return auth.user + index + '/'
  return auth.user
}

/*
 * 用户基本工作信息
 * @url /account/user-info/
 * @param {Number} index 接口索引 */
export function userInfo (index = null) {
  if (index) return auth.userInfo + index + '/'
  return auth.userInfo
}

/*
 * 用户积分信息
 * @url /account/user-integral/
 * @param {Number} index 接口索引 */
export function userIntegral (index = null) {
  if (index) return auth.userIntegral + index + '/'
  return auth.userIntegral
}

/*
 * 用户违规记录信息
 * @url /account/user-violation/
 * @param {Number} index 接口索引 */
export function userViolation (index = null) {
  if (index) return auth.userViolation + index + '/'
  return auth.userViolation
}

/*
 * 学校
 * @url /account/user-edu/
 * @param {Number} index 接口索引 */
export function userEdu (index = null) {
  if (index) return auth.userEdu + index + '/'
  return auth.userEdu
}

/*
 * 班级
 * @url /account/user-school/
 * @param {Number} index 接口索引 */
export function userSchool (index = null) {
  if (index) return auth.userSchool + index + '/'
  return auth.userSchool
}

/*
 * 学生所对应的班级以及教师所教授的班级 用户表-班级
 * @url /account/user-school-many-user/
 * @param {Number} index 接口索引 */
export function userSchoolManyUser (index = null) {
  if (index) return auth.userSchoolManyUser + index + '/'
  return auth.userSchoolManyUser
}

/*
 * 书名分类
 * @url /question/class-question/
 * @param {Number} index 接口索引 */
export function classQuestion (index = null) {
  if (index) return question.classQuestion + index + '/'
  return question.classQuestion
}

/*
 * 模块分类
 * @url /question/class-question-model/
 * @param {Number} index 接口索引 */
export function classQuestionModel (index = null) {
  if (index) return question.classQuestionModel + index + '/'
  return question.classQuestionModel
}

/*
 * 章节分类
 * @url /question/class-question-chapter/
 * @param {Number} index 接口索引 */
export function classQuestionChapter (index = null) {
  if (index) return question.classQuestionChapter + index + '/'
  return question.classQuestionChapter
}

/*
 * [选择题|判断题|简答题|机试题]: 题库
 * @url /question/question/
 * @param {Number} index 接口索引 */
export function questionQues (index = null) {
  if (index) return question.question + index + '/'
  return question.question
}

/*
 * [选择题|判断题|简答题|机试题]: 答案
 * @url /question/question-answer/
 * @param {Number} index 接口索引 */
export function questionAnswer (index = null) {
  if (index) return question.questionAnswer + index + '/'
  return question.questionAnswer
}

/*
 * 当前班级正在学习的课程 在授班级 所教授的课程进度 [书名-模块-章节]
 * @url /question/user-semester/
 * @param {Number} index 接口索引 */
export function userSemester (index = null) {
  if (index) return question.userSemester + index + '/'
  return question.userSemester
}

/*
 * 刷题 随机抓取题目
 * @url /question/user-semester/
 * @param {Number} index 接口索引 */
export function questionExam (index = null) {
  if (index) return question.questionExam + index + '/'
  return question.questionExam
}

/*
 * 章节进度 当前班级正在学习的章节
 * @url /question/user-exam-stock/
 * @param {Number} index 接口索引 */
export function userExamStock (index = null) {
  if (index) return question.userExamStock + index + '/'
  return question.userExamStock
}

/*
 * 后台设置 定时任务
 * @url /crontab/crontab/
 * @param {Number} index 接口索引 */
export function crontabIndex (index = null) {
  if (index) return crontab.crontab + index + '/'
  return crontab.crontab
}

/*
 * 后台设置 分页设置
 * @url /conf/system-index/
 * @param {Number} index 接口索引 */
export function systemIndex (index = null) {
  if (index) return conf.systemIndex + index + '/'
  return conf.systemIndex
}

/*
 * 后台设置 刷/考相关设置 控制前端抓取题库题项数量
 * @url /conf/system-question/
 * @param {Number} index 接口索引 */
export function systemQuestion (index = null) {
  if (index) return conf.systemQuestion + index + '/'
  return conf.systemQuestion
}

/**
 * 考试系统相关接口
 */

/*
 * 记录班级任务执行情况
 * @url /exam/cron/
 * @param {Number} index 接口索引 */
export function cron (index = null) {
  if (index) return exam.cron + index + '/'
  return exam.cron
}

/*
 * 记录学员完成任务情况
 * @url /exam/cron-user/
 * @param {Number} index 接口索引 */
export function cronUser (index = null) {
  if (index) return exam.cronUser + index + '/'
  return exam.cronUser
}
