<template>
    <Card>

        <router-link :to="toRouter()">
            <div style="text-align:center">
                <div v-if="images">
                    <img :src="images">
                    <p style="margin-top: 10px;text-align:left">{{title}}</p>
                </div>
                <div v-else style="text-align:left">
                    <p>{{title}}</p>
                </div>
            </div>
        </router-link>

        <div class="other">
            <span v-if="status !== 0"><Icon type="md-alarm"/> <Time :time="add_time" :interval="1"/></span>
            <span v-else><Icon type="md-alarm"/> <Time :time="lately_time" :interval="1"/>完成</span>
            <span style="float: right;"><Icon type="md-contacts"/> {{count}}</span>
            <div style="margin-top: 10px;text-align:left">
                <!--                <template v-if="exam_status === 1">&lt;!&ndash;班级考试进行中&ndash;&gt;-->
                <!--                    <Tooltip v-if="status === 0" content="您的考试已经完成，等待教师评分" placement="right">-->
                <!--                        <Tag type="border" color="success">考试以完成</Tag>-->
                <!--                    </Tooltip>-->
                <!--                    <Tooltip v-if="status === 1" content="您已退出考试，以放弃。不记分处理" placement="right">-->
                <!--                        <Tag type="border" color="warning">已退出考试/不记分处理</Tag>-->
                <!--                    </Tooltip>-->
                <!--                    <Tooltip v-if="status === 2" content="当前班级以开始考试，开始考试吧" placement="right">-->
                <!--                        <Tag type="border" color="primary">考试以开始</Tag>-->
                <!--                    </Tooltip>-->
                <!--                </template>-->
                <!--                <template v-if="exam_status === 0">&lt;!&ndash;班级考试以完成&ndash;&gt;-->
                <!--                    <Tooltip v-if="status === 0" content="您的考试已经完成，等待教师评分" placement="right">-->
                <!--                        <Tag type="border" color="success">考试以完成</Tag>-->
                <!--                    </Tooltip>-->
                <!--                    <Tooltip v-if="status === 1" content="您已退出考试，以放弃。不记分处理" placement="right">-->
                <!--                        <Tag type="border" color="warning">已退出考试/不记分处理</Tag>-->
                <!--                    </Tooltip>-->
                <!--                    <Tooltip v-if="status === 2" content="您未参与考试，不记分处理" placement="right">-->
                <!--                        <Tag type="border" color="error">考试未参与</Tag>-->
                <!--                    </Tooltip>-->
                <!--                </template>-->
                <downTimeMini v-if="endTime" :endTime="endTime" endMsg="考试已结束" @isShow="isShow"></downTimeMini>
            </div>
        </div>
    </Card>
</template>

<script>
  import {
    Card,
    Divider,
    Row,
    Col,
    Icon,
    Time,
    Tag,
    Tooltip,
    Message
  } from 'view-design'
  import downTimeMini from '../../components/time/downTimeMini'

  export default {
    name: 'ArticleBlock',
    props: {
      pageId: {
        type: [String, Number]
      },
      count: { // 多少人 参与考试
        type: [String, Number]
      },
      title: {
        type: String,
        default: function () {
          return ''
        }
      },
      status: {
        type: Number,
        default: function () {
          return 2
        }
      },
      exam_status: {
        type: Number,
        default: function () {
          return 2
        }
      },
      images: {
        type: String,
        default: function () {
          return null // require('../../assets/0.jpg')
        }
      },
      add_time: {
        type: String,
        default: function () {
          return '2020-01-29T17:16:17.125896+08:00'
        }
      },
      lately_time: {
        type: String,
        default: function () {
          return '2020-01-29T17:16:17.125896+08:00'
        }
      },
      endTime: {
        type: String,
        default: function () {
          return '2020-01-29T17:16:17.125896+08:00'
        }
      }
    },
    data () {
      return {
        exam: false // true 结束考试
      }
    },
    components: {
      Card,
      Divider,
      Row,
      Col,
      Icon,
      Time,
      Tag,
      Tooltip,
      downTimeMini
    },
    methods: {
      toRouter: function () {
        if (this.exam) return ''
        return {
          name: 'modular',
          params: {
            modularId: this.pageId
          }
        }
      },
      toMessage: function () {
        Message.info({
          content: 'I ll be gone in 10 seconds',
          duration: 10
        })
        console.log('aaa')
      },
      isShow: function (val) {
        this.exam = val
        this.$emit('isShow', val)
        console.log('OK')
      }
    }
  }
</script>

<style scoped>
    img {
        text-align: center;
        border-radius: 5px;
        max-height: 100%;
        max-width: 100%;
        margin: 0 auto;
        width: 224px;
        height: 149px;
        object-fit: cover;
    }


    .other {
        color: #878d9b;
        margin-top: 10px;
    }

    a {
        color: #1c1e24;
    }
</style>
