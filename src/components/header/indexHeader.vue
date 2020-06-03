<template>
    <Menu theme="dark" :active-name="topActive" :mode="mode" width="100" @on-select="onSelectModeList">
        <MenuItem :name="item.name" v-for="(item, key) in topHeader" :key="key" :to="item.toRouter">
            <Icon :type="item.icon" v-if="item.icon"/>
            {{ item.name }}
        </MenuItem>
        <MenuItem name="auth" style="float: right;">
            <Menu theme="dark" active-name="" :mode="mode" width="100" @on-select="authUserSelect">
                <Submenu name="1">
                    <template slot="title">
                        <Avatar :src="topAuthUser.auth.headimage"/>
                        {{ topAuthUser.auth.username }}
                    </template>
                    <MenuGroup :title="item.name" v-for="(item, key) in topAuthUser.menu" :key="key">
                        <MenuItem :name="childrem.name" v-for="(childrem, childremKey) in item.childrem"
                                  :key="childremKey" :to="childrem.toRouter">
                            <Icon :type="childrem.icon" v-if="childrem.icon"/>
                            {{childrem.name}}
                        </MenuItem>
                    </MenuGroup>
                </Submenu>
            </Menu>
        </MenuItem>
    </Menu>

</template>

<script>
  import {
    Header,
    Menu,
    MenuItem,
    Icon,
    Submenu,
    MenuGroup,
    Avatar
  } from 'view-design'

  import {
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse
  } from 'bootstrap-vue'

  export default {
    name: 'indexHeader',
    inject: [
      'loginSigout',
      'username'
    ],
    data: function () {
      return {
        /**
         * mode: 侧边栏 皮肤
         */
        mode: 'horizontal'
      }
    },
    created () {
      /**
       * 设置用户名
       */
      if (!this.topAuthUser.auth.username) return this.topAuthUser.auth.username = this.username()
    },
    props: {
      topName: {
        type: String,
        default: () => {
          /**
           * topName: 头部导航栏 logo信息，网站名称
           */
          return 'YTPASS'
        }
      },
      topActive: {
        /**
         * topActive: 头部导航菜单索引
         */
        type: String,
        default: () => {
          return ''
        }
      },
      topHeader: {
        /**
         * topHeader: 头部导航菜单 菜单项
         */
        type: Array,
        default: () => {
          return [
            /**
             * name: 菜单名称
             * icon: 菜单ico图标
             * run: 菜单运行的方法，可预定义
             * toRouter: 路由信息
             */
            {
              toRouter: {
                name: 'index'
              },
              name: '测评',
              icon: 'ios-document',
              run: null
            }
          ]
        }
      },
      topAuthUser: {
        /**
         * topAuthUser: 头部导航栏菜单 用户信息菜单
         */
        type: Object,
        default: () => {
          return {
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
                    name: '个人中心',
                    icon: 'ios-document',
                    run: null
                  },
                  {
                    toRouter: {
                      name: 'index'
                    },
                    name: '通知',
                    icon: 'ios-document',
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
                    icon: 'ios-document',
                    run: null
                  },
                  {
                    toRouter: {
                      name: 'index'
                    },
                    name: '退出登录',
                    icon: 'ios-document',
                    run: this.loginSigout
                  }
                ]
              }
            ]
          }
        }
      }
    },
    methods: {
      onCollapse (e) {
        /**
         * 头部菜单
         * 自适应功能，小屏点击展开菜单触发
         * 将菜单展示方式改为 竖屏方式
         */
        if (this.mode === 'horizontal') {
          this.mode = 'vertical'
        } else if (this.mode === 'vertical') {
          this.mode = 'horizontal'
        }
      },
      authUserSelect (name) {
        /**
         * Menu菜单 头部用户部分
         **/
        for (let i = 0; i < this.topAuthUser.menu.length; i++) {
          /**
           * 实习头部导航菜单 run 方法
           */
          for (let e = 0; e < this.topAuthUser.menu[i].childrem.length; e++) {
            if (this.topAuthUser.menu[i].childrem[e].name === name) {
              if (this.topAuthUser.menu[i].childrem[e].name === name) {
                /**
                 * run 方法
                 */
                // console.log(this.topAuthUser.menu[i].childrem[e].name)
                if (this.topAuthUser.menu[i].childrem[e].run) this.topAuthUser.menu[i].childrem[e].run()
              }
            }
          }
        }

      },
      onSelectModeList (name) {
        /**
         * Menu菜单 侧边栏菜单部分
         **/
        for (let i = 0; i < this.topHeader.length; i++) {
          if (this.topHeader[i].name === name) {

            /**
             * 选择菜单时触发
             * */
            this.$emit('on-select', this.topHeader[i])

            /**
             * 运行 item.run 方法
             **/
            if (this.topHeader[i].run) {
              /**
               * 运行 item.run 方法前回调
               */
              this.$emit('on-run-start', this.topHeader[i])

              /**
               * 运行 item.run 方法
               */
              this.topHeader[i].run()

              /**
               * 运行 item.run 方法后回调
               */
              this.$emit('on-run-end', this.topHeader[i])
            }
          }
        }

      }
    },
    components: {
      'b-navbar': BNavbar,
      'b-navbar-nav': BNavbarNav,
      'b-navbar-brand': BNavbarBrand,
      'b-navbar-toggle': BNavbarToggle,
      'b-collapse': BCollapse,
      Header,
      Menu,
      MenuItem,
      Icon,
      Submenu,
      MenuGroup,
      Avatar
    }
  }
</script>

<style scoped>
</style>