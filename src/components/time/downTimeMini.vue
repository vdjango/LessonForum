<template>
    <div>
        <Tag v-if="!isShow" class="time" type="border" color="error">
            <!-- <span class="hour">{{myDay}}</span> :-->
            <span class="hour">距离结束</span> &nbsp;
            <span class="hour">{{myHours}}</span> :
            <span class="minute">{{myMinutes}}</span> :
            <span class="second">{{mySeconds}}</span>
        </Tag>
        <div v-else>
            <Tag type="border" color="warning">已结束</Tag>
            本期考试已结束！
        </div>

    </div>
</template>

<script>
  var moment = require('moment')
  import { Tag } from 'view-design'

  export default {
    name: 'downTime',
    props: { // 接收父组件传递过来的参数,这里传了  结束时间 - 开始时间 - 结束后显示的内容
      endTime: {
        type: String
      },
      startTime: {
        type: Number,
        default () {
          return new Date().getTime()
        }
      },
      endMsg: {
        type: String
      }
    },
    data () {
      return {
        isShow: false, // 控制显示结束或还未结束显示的内容
        clocker: '结束', // 结束后显示的内容
        timeObj: null, // 时间对象,下方会用到
        myDay: 0, // 我定义来接收计算出来的 天 的
        myHours: 0, // 我定义来接收计算出来的 小时 的
        myMinutes: 0, // 我定义来接收计算出来的 分钟 的
        mySeconds: 0,// 我定义来接收计算出来的 秒钟 的
        go: null
      }
    },
    components: {
      Tag
    },
    mounted () {
      if (!this.endTime) {
        return
      }
      var endTime = moment(this.endTime).unix()

      // 判断当前是否时分秒的值是否大于10
      let add = num => {
        return num < 10 ? '0' + num : num
      }
      // 时间倒计时运算的方法
      let timeFunction = () => {
        // 计算时间差
        let t = new Date().getTime() / 1000
        let time = (endTime - t)
        this.timeObj = { // 时间对象
          seconds: Math.floor(time % 60),
          minutes: Math.floor(time / 60) % 60,
          hours: Math.floor(time / 60 / 60) % 24,
          days: Math.floor(time / 60 / 60 / 24)
        }
        // 计算出时分秒
        this.myDay = `${add(this.timeObj.days)}`
        this.myHours = `${add(this.timeObj.hours)}`
        this.myMinutes = `${add(this.timeObj.minutes)}`
        this.mySeconds = `${add(this.timeObj.seconds)}`
        // 当时间差小于等于0时,停止倒计时
        console.log(this.endTime)
        if (time <= 0) {
          this.isShow = true
          this.$emit('isShow', this.isShow)
          this.clocker = this.endMsg || this.clocker
          clearInterval(this.go)
        }
      }
      // 开始执行倒计时
      timeFunction()
      // 每一秒执行一次
      this.go = setInterval(() => {
        timeFunction()
      }, 1000)
    },
    beforeDestroy () {
      if (this.go) clearInterval(this.go)
      console.log('销毁定时器')
    }

  }
</script>

<style lang="scss" scoped>
    .downTime-wrapper {
        display: flex;
        font-size: 14px;
        font-weight: bold;
        // .hour{}
        // .minute{}
        .second {
            color: rgb(235, 62, 61);
        }
    }
</style>