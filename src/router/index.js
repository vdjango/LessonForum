import Vue from 'vue'
import Router from 'vue-router'

const viewsIndex = () => import('@/views/index')
const forumIndex = () => import('@/views/forum/index')
const forumModularChapterIndex = () => import('@/views/forum/modular/index')
// const forumModularChapter = () => import('@/views/forum/modular/chapter')

const authIndex = () => import('@/views/auth/index')
const authLogin = () => import('@/views/auth/login')
const authRegister = () => import('@/views/auth/register')

const activityIndex = () => import('@/views/activity/index')

const userInfo = () => import('@/views/user/index')
const userInfoIndex = () => import('@/views/user/info/index')
const userWorkingIndex = () => import('@/views/user/working/index')
const userIntegralIndex = () => import('@/views/user/integral/index')
const userExamIndex = () => import('@/views/user/exam/index')

const trialIndex = () => import('@/views/trial/index')
const trialExam = () => import('@/views/trial/exam/test')
const trialReport = () => import('@/views/trial/report/index')

const adminIndex = () => import('@/views/admin/index')

const adminUserIndex = () => import('@/views/admin/user/index')
const adminUserInfo = () => import('@/views/admin/user/info')
const adminUserIntegral = () => import('@/views/admin/user/integral')

const adminQuesIndex = () => import('@/views/admin/ques/index')
const adminQuesQuestion = () => import('@/views/admin/ques/question')
const adminQuesTopic = () => import('@/views/admin/ques/topic')

const adminSchoolIndex = () => import('@/views/admin/school/index')
const adminSchoolLearning = () => import('@/views/admin/school/learning')
const adminSchoolStudy = () => import('@/views/admin/school/study')

const adminSettingIndex = () => import('@/views/admin/settings/index')
const adminSettingSystemctl = () => import('@/views/admin/settings/systemctl')
const adminSettingCrontab = () => import('@/views/admin/settings/crontab')
const adminSettingExamination = () => import('@/views/admin/settings/examination')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/admin',
      redirect: {
        name: 'admin_user'
      }
    },
    {
      path: '/',
      component: viewsIndex,
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            requiresAuth: true
          },
          components: {
            default: forumIndex
          }
        },
        {
          path: 'modular/:modularId',
          name: 'modular',
          props: {
            default: true
          },
          meta: {
            requiresAuth: true
          },
          components: {
            default: forumModularChapterIndex
          }
        },
        {
          path: 'trial',
          redirect: {
            name: 'trial_exam'
          }
        },
        {
          path: 'trial',
          name: 'trial',
          meta: {
            requiresAuth: true
          },
          components: {
            default: trialIndex
          },
          children: [
            {
              path: 'exam/:id',
              name: 'trial_exam',
              props: {
                trial: true
              },
              meta: {
                requiresAuth: true
              },
              components: {
                trial: trialExam
              }
            },
            {
              path: 'report/:id',
              props: {
                trial: true
              },
              name: 'trial_report',
              meta: {
                requiresAuth: true
              },
              components: {
                trial: trialReport
              }
            }
          ]
        },
        {
          path: 'user',
          redirect: {
            name: 'user_info'
          }
        },
        {
          path: 'user',
          name: 'user',
          components: {
            default: userInfo
          },
          children: [
            {
              path: 'index',
              name: 'user_info',
              components: {
                user: userInfoIndex
              }
            },
            {
              path: 'working',
              name: 'working',
              components: {
                user: userWorkingIndex
              }
            },
            {
              path: 'integral',
              name: 'integral',
              components: {
                user: userIntegralIndex
              }
            },
            {
              path: 'exam',
              name: 'exam',
              components: {
                user: userExamIndex
              }
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      meta: {
        requiresAuth: false
      },
      component: authIndex,
      children: [
        {
          path: '/auth/login',
          name: 'login',
          components: {
            auth: authLogin
          }
        },
        {
          path: '/auth/register',
          name: 'register',
          components: {
            auth: authRegister
          }
        }
      ]
    },
    {
      path: '/admin',
      component: adminIndex,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'user',
          components: {
            admin: adminUserIndex
          },
          children: [
            {
              path: 'index',
              name: 'admin_user',
              meta: {
                requiresAuth: true
              },
              components: {
                adminUser: adminUserInfo
              }
            },
            {
              path: 'integral',
              name: 'admin_integral',
              meta: {
                requiresAuth: true
              },
              components: {
                adminUser: adminUserIntegral
              }
            }
          ]
        },
        {
          path: 'ques',
          components: {
            admin: adminQuesIndex
          },
          children: [
            {
              path: 'index',
              name: 'admin_ques',
              meta: {
                requiresAuth: true
              },
              components: {
                adminQues: adminQuesQuestion
              }
            },
            {
              path: 'topic',
              name: 'admin_ques_topic',
              meta: {
                requiresAuth: true
              },
              components: {
                adminQues: adminQuesTopic
              }
            }
          ]
        },
        {
          path: 'school',
          components: {
            admin: adminSchoolIndex
          },
          children: [
            {
              path: 'learning',
              name: 'admin_school_learning',
              meta: {
                requiresAuth: true
              },
              components: {
                school: adminSchoolLearning
              }
            },
            {
              path: 'study',
              name: 'admin_school_study',
              meta: {
                requiresAuth: true
              },
              components: {
                school: adminSchoolStudy
              }
            }
          ]
        },
        {
          path: 'setting',
          components: {
            admin: adminSettingIndex
          },
          children: [
            {
              path: 'system',
              name: 'admin_setting_system',
              components: {
                adminSetting: adminSettingSystemctl
              }
            },
            {
              path: 'crontab',
              name: 'admin_setting_crontab',
              components: {
                adminSetting: adminSettingCrontab
              }
            },
            {
              path: 'examination',
              name: 'admin_setting_examination',
              components: {
                adminSetting: adminSettingExamination
              }
            }
          ]
        }
      ]
    },
    {
      path: '/activity',
      component: activityIndex,
      children: [
        {
          path: '/activity',
          name: 'activity',
          components: {
            default: activityIndex
          }
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
