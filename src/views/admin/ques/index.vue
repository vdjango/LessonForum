<template>
    <router-view name="adminQues"></router-view>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        leftMenu: [
          {
            toRouter: {
              name: 'admin_ques'
            },
            name: '分类设置',
            icon: 'ios-create',
            run: () => {
              console.log('asd')
            }
          },
          {
            toRouter: {
              name: 'admin_ques_topic'
            },
            name: '题库管理',
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