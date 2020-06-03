<template>
    <router-view name="school"></router-view>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        leftMenu: [
          {
            toRouter: {
              name: 'admin_school_learning'
            },
            name: '学习进度', // 记录当前班级学生学习进度
            icon: 'ios-create',
            run: () => {
              console.log('asd')
            }
          },
          {
            toRouter: {
              name: 'admin_school_study'
            },
            name: '在学学员', // 学员正在学习的书籍
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