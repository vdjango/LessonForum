import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from '@/axios/index'
import Cookies from '@/utils/Cookie'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../theme/index.less'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false

/* eslint-disable no-new */

// router.afterEach((to,from,next) => {
//   window.scrollTo(0,0);
// })

router.beforeEach((to, from, next) => {
  const autherization = Cookies.getCookieAutherization()

  if (autherization.token && autherization.username) {
    axios.authorizationRefresh(autherization.token).then((response) => {
      store.commit('auth/setAutherization', {
        pk: response.data.user.id,
        token: response.data.token,
        user: response.data.user.username,
        verify: true
      })
      console.log('response', response)
    }).catch((re) => {
      console.log('re', re)
      if (re.status === 401) {
        console.log('下次需要登陆', re)
        store.commit('auth/clearAutherization')
      }
    })
  }

  /**
   * 根据路由权限进行跳转登录页面
   */
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!autherization.token || !autherization.username) {
      store.commit('auth/clearAutherization')
      next({
        path: '/auth/login'
      })
    }
    next()
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

