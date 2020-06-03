<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: 'App',
    // 提供reload方法
    provide: function () {
      /**
       * 定义全局方法
       */
      return {
        reload: this.reload,
        username: this.username,
        loginSigout: this.loginSigout
      }
    },
    data: function () {
      return {
        isRouterAlive: true // isRouterAlive控制显示
      }
    },
    methods: {
      reload: function () {
        /**
         * 刷新方法
         */
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      username () {
        return this.$store.getters['auth/getUser']
      },
      loginSigout () {
        /**
         * 退出登录
         */
        this.$nextTick(() => {
          this.$store.commit('auth/clearAutherization')
        })
      }
    },
    computed: {
      getIsRouterAlive: function () {
        return this.$store.getters['index/getIsRouterAlive']
      }
    },
    watch: {
      getIsRouterAlive: function (a, b) {
        console.log('reload', a)
        this.$nextTick(() => {
          this.$store.commit('index/setIsRouterAlive', false)
          // this.reload()
        })
        // this.reload()
      }
    }
  }
</script>

<style>
    #app {
        font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "Apple Color Emoji", "Emoji Symbols Font", "Segoe UI Symbol", Arial, sans-serif;
        font-size: 12px;
        line-height: 1.5;
        color: #515a6e;
        background-color: #fff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


    .container {
        margin-right: auto;
        margin-left: auto;
        padding-left: 15px;
        padding-right: 15px;
        flex-direction: column !important;
    }


    /**
     * 导航栏主题背景色
     **/
    .ivu-layout-header {
        background: #ffffff !important;
        z-index: 9999;
        height: auto !important;
        line-height: initial !important;
        padding: 0 !IMPORTANT;
    }

    .float-right {
        float: right;
    }

    .float-left {
        float: left;
    }

    .button-margin-10 {
        margin-left: 10px;
    }

    .main-width-1200 {
        width: 1400px;
    }
</style>
