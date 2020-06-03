<template>
    <Layout>
        <index-header :topName="topName" :topActive="topActive" :topHeader="topHeader"
                      :topAuthUser="topAuthUser"></index-header>
        <Layout>
            <Sider v-if="leftMenu" ref="side1"
                   breakpoint="sm"
                   collapsible
                   :collapsed-width="78"
                   :style="{background: '#fff'}"
                   v-model="isCollapsed">
                <IndexMenu :leftMenu="leftMenu" :isCollapsed="isCollapsed" @setCollapsed="setCollapsed"></IndexMenu>
            </Sider>

            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem v-for="(item, key) in topPath" :key="key" :to="item.toRouter">{{item.name}}
                    </BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <router-view name="admin"></router-view>
                </Content>
            </Layout>

        </Layout>
    </Layout>
</template>

<script>
  import {
    Layout,
    Header,
    Menu,
    MenuItem,
    Icon,
    Sider,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Content
  } from 'view-design'
  import indexHeader from '@/components/header/indexHeader'
  import IndexMenu from '@/components/menu/index'

  export default {
    name: 'adminIndex',
    inject: [
      'username'
    ],
    components: {
      Layout,
      Header,
      Menu,
      MenuItem,
      Icon,
      Sider,
      Submenu,
      Breadcrumb,
      BreadcrumbItem,
      Content,

      'index-header': indexHeader,
      IndexMenu
    },
    data: function () {
      return {
        /**
         * topName: 头部导航栏 logo信息，网站名称
         * topActive: 头部导航栏菜单默认项 激活的菜单
         * topHeader: 头部导航栏菜单 菜单列表
         * topAuthUser: 头部导航栏菜单 用户信息菜单
         * isCollapsed: 控制侧边栏 [收起/展开] 状态
         * mode: 控制侧边栏 皮肤
         * user: 用户相关信息
         * user.headimage: 用户头像地址
         */
        topName: '微题',
        topActive: '用户管理',
        topHeader: [],
        leftMenu: [],
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
            username: this.username(),
            headimage: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
          },
          menu: [
            /**
             * name: 分组名称
             * childrem: 分组列表
             * */
            {
              name: '使用',
              childrem: [
                /**
                 * name: 菜单名称
                 * icon: 菜单ico图标
                 * run: 菜单运行的方法，可预定义
                 * toRouter: 路由信息
                 * */
                {
                  toRouter: {
                    name: 'index'
                  },
                  name: '首页',
                  icon: 'ios-contact',
                  run: null
                }
              ]
            },
            {
              name: '账户',
              childrem: [
                {
                  toRouter: {
                    name: 'index'
                  },
                  name: '修改密码',
                  icon: 'ios-key',
                  run: null
                },
                {
                  toRouter: {
                    name: 'index'
                  },
                  name: '退出登录',
                  icon: 'ios-exit',
                  run: this.loginSigout
                }
              ]
            }
          ]
        },
        topPath: [],
        isCollapsed: false,
        mode: 'horizontal'
      }
    },
    created: function () {
      if (!this.topActive) {
        /**
         *  设置头部导航栏菜单 菜单默认项
         */
        // if (this.topHeader.length > 0) this.topActive = this.topHeader[0].name
      }
      this.topPath = this.$store.getters['getTopPath']
      this.topHeader = this.$store.getters['getTopHeader']
      this.leftMenu = this.$store.getters['getLeftMenu']

    },
    computed: {
      leftMenus: function () {
        return this.$store.getters['getLeftMenu']
      },
      getTopPath: function () {
        return this.$store.getters['getTopPath']
      },
      getTopActives: function () {
        return this.$store.getters['getTopActive']
      }
    },
    methods: {
      onCollapse (e) {
        if (this.mode === 'horizontal') {
          this.mode = 'vertical'
        } else if (this.mode === 'vertical') {
          this.mode = 'horizontal'
        }
      },
      setCollapsed (isCollapsed) {
        this.isCollapsed = isCollapsed
      },
      authUserSelect (name) {
        if (name === 'loginSigout') {
          this.loginSigout()
        }
      },
      loginSigout () {
        this.$store.commit('auth/clearAutherization')
        this.$router.push({
          name: 'login'
        })
      }
    },
    watch: {
      leftMenus (a, b) {
        this.leftMenu = a
      },
      getTopPath: function (a, b) {
        this.topPath = a
      },
      getTopActives: function (a, b) {
        console.log(a)
        this.topActive = a
      }
    }
  }
</script>

<style scoped>
    .ivu-layout {
        height: -webkit-fill-available;
    }

    .ivu-layout-has-sider .ivu-layout {
        height: auto;
    }

    /**
     * 开始 侧边栏 [展开/收起]
     */
    >>> .ivu-layout-sider-trigger {
        /**
         * 按钮背景色
         */
        color: #515a6e;
        background: #fff !important;
    }
</style>
