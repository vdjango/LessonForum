<template>
    <router-view name="adminSetting"></router-view>
</template>

<script>
  export default {
    name: 'index',
    data: function () {
      return {
        leftMenu: [
          {
            toRouter: {
              name: 'admin_setting_system'
            },
            name: '系统设置',
            icon: 'ios-create',
            run: () => {
              console.log('asd')
            }
          },
          {
            toRouter: {
              name: 'admin_setting_examination'
            },
            name: '刷题考试',
            icon: 'ios-create',
            run: () => {
              console.log('asd')
            }
          },
          {
            toRouter: {
              name: 'admin_setting_crontab'
            },
            name: '定时任务',
            icon: 'ios-create',
            run: () => {
              console.log('asd')
            }
          }
        ]
      }
    },
    created () {
      this.$store.commit('setLeftMenu', this.leftMenu)
    }
  }
</script>

<style scoped>

</style>