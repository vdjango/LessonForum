<!--侧边栏-->
<template>
    <Menu :active-name="active" theme="light" width="auto" accordion
          :class="menuitemClasses"
          @on-open-change="openChange">
        <div v-for="(item, key) in leftMenu" :key="key">
            <MenuItem :name="key" v-if="!item.childrem" :to="item.toRouter">
                <Icon :type="item.icon"/>
                <span>{{item.name}}</span>
            </MenuItem>
            <Submenu :name="key" v-else>
                <template slot="title">
                    <Icon :type="item.icon"></Icon>
                    <span>{{item.name}}</span>
                </template>
                <MenuItem :name="key + '-' + vKey" v-for="(vItem, vKey) in item.childrem" :key="vKey"
                          :to="vItem.toRouter">
                    <span>{{vItem.name}}</span>
                </MenuItem>
            </Submenu>
        </div>
    </Menu>
</template>

<script>
  import {
    Menu,
    MenuItem,
    Icon,
    Submenu
  } from 'view-design'

  export default {
    name: 'menuIndex',
    inject: [
      'username'
    ],
    props: {
      leftMenu: {
        type: Array,
        default () {
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
              name: '测评报告',
              icon: 'ios-document',
              run: null,
              childrem: null
            },
            {
              toRouter: null,
              name: '测评',
              icon: 'ios-document',
              run: null,
              childrem: [
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
          ]
        }
      },
      isCollapsed: {
        type: Boolean,
        default () {
          return true
        }
      },
      active: {
        type: [Number, String],
        default () {
          return 0
        }
      }
    },
    data: function () {
      return {}
    },
    created () {
    },
    components: {
      Menu,
      MenuItem,
      Icon,
      Submenu
    },
    methods: {
      openChange (name) {
        // this.isCollapsed = false
        this.$emit('setCollapsed', false)
      }
    },
    computed: {
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    }
  }
</script>

<style scoped>
    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    /**
     * 结束 侧边栏 [展开/收起]
     */


</style>