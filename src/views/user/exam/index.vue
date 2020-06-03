<template>
    <div>
        <Spin fix v-if="fromData.formLoading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>{{ fromData.formName }}</div>
        </Spin>
    </div>
</template>

<script>
  export default {
    name: 'ExamIndex',
    data () {
      return {
        active: 5
      }
    },
    created () {
      this.$store.commit('user/setActive', this.active)
    }
  }
</script>

<style scoped>
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
