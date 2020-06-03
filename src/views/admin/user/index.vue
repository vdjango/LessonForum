<template>
    <router-view name="adminUser"></router-view>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        leftMenu: [
          {
            toRouter: {
              name: 'admin_user'
            },
            name: '用户管理',
            icon: 'ios-create',
            run: () => {
              console.log('asd')
            }
          },
          {
            toRouter: {
              name: 'admin_integral'
            },
            name: '学分管理',
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