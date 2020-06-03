<template>
    <div class="forum-header">
        <forum-header :searchAutoComplete="searchAutoComplete"
                      :topHeader="topHeader" :topAuthUser="topAuthUser" :topActive="topActive"></forum-header>
        <div class="container">
            <router-view name="default"></router-view>
        </div>
    </div>
</template>

<script>
  import forumHeader from '@/components/forum/forumHeader'

  export default {
    name: 'forumIndex',
    inject: [
      'loginSigout',
      'username'
    ],
    components: {
      'forum-header': forumHeader
    },
    data () {
      return {
        searchAutoComplete: '',
        topActive: '课程',
        topHeader: [
          {
            toRouter: {
              name: 'index'
            },
            name: '课程',
            icon: 'ios-document',
            run: null
          },
          {
            toRouter: {
              name: 'index'
            },
            name: '考试',
            icon: 'ios-document',
            run: null
          }
        ],
        topAuthUser: {
          /**
           * auth: 用户信息
           * menu: 菜单列表
           * */
          auth: {
            /**
             * username: 用户名
             * headimage: 头像地址
             * */
            username: null,
            headimage: require('@/assets/599a521472424.jpg')
          },
          menu: [
            /**
             * name: 分组名称
             * childrem: 分组列表
             * */
            {
              toRouter: {
                name: 'user_info'
              },
              name: '个人信息',
              icon: 'md-bookmark',
              run: null
            },
            {
              toRouter: {
                name: 'index'
              },
              name: '历史科目',
              icon: 'md-heart',
              run: null
            },

            {
              toRouter: {
                name: 'index'
              },
              name: '退出登录',
              icon: 'md-exit',
              run: this.loginSigout
            }
          ]
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
    >>> .ivu-menu-horizontal.ivu-menu-light:after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: unset;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .demo-auto-complete-group span {
        color: #666;
        font-weight: bold;
    }

    .demo-auto-complete-group a {
        float: right;
    }

    /**
   * 开始 全局
   */
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        /*height: -webkit-fill-available;*/
    }

    >>> .ivu-layout {
        background: #FFFFFF !important;
    }

    .layout >>> .ivu-layout-sider-children .ivu-menu {
        height: inherit;
    }

    .layout >>> .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    /**
     * 结束 全局
     */


    /**
     * 开始 侧边栏 [展开/收起]
     */
    .layout >>> .ivu-layout-sider-trigger {
        /**
         * 按钮背景色
         */
        color: #515a6e;
        background: #fff;
    }


</style>
