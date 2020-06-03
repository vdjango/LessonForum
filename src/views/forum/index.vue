<template>
    <div>
        <Card v-if="exam.default" :bordered="false" dis-hover style="margin-top: 15px">
            <div slot="title">
                考试安排
                <Tag type="border" color="primary" style="margin-left: 15px;">{{exam.school.name}}</Tag>
            </div>
            <Alert show-icon>
                <Icon type="ios-bulb-outline" slot="icon"></Icon>
                <template slot="desc">新的考试开始啦！赶快来考试吧～</template>
            </Alert>
            <Row :gutter="16" type="flex" justify="center" align="middle">
                <Col span="6" v-for="(item, key) in exam.pagination.items" style="margin-top: 15px">
                    <ExamBlock
                            @click="isShow"
                            :key="key"
                            :pageId="item.id"
                            :status="item.status"
                            :exam_status="item.cron_tab_main.status"
                            :count="item.cron_tab_main.number"
                            :title="item.cron_tab_main.message"
                            :endTime="item.cron_tab_main.time"
                            :add_time="item.add_time"
                            :lately_time="item.lately_time">
                    </ExamBlock>
                </Col>
            </Row>
            <Spin fix v-if="exam.Loading">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>新的考试正在加载中...</div>
            </Spin>
        </Card>
        <Card :bordered="false" dis-hover style="margin-top: 15px">
            <p slot="title">我的题库</p>
            <Row :gutter="16" type="flex" justify="center" align="middle">
                <Col span="6" v-for="(item, key) in pagination.items" style="margin-top: 15px">
                    <ArticleBlock
                            :key="key"
                            :pageId="item.class_question.id"
                            :count="item.class_question.count"
                            :title="item.class_question.name"
                            :lately_time="item.lately_time"
                            :images="item.class_question.image">
                    </ArticleBlock>
                </Col>
            </Row>
            <Card :bordered="false" dis-hover>
                <Page :total="pagination.count"
                      :current.sync="pagination.index"
                      :page-size="pagination.pageSize"
                      :page-size-opts="pagination.pageSizeOpts"
                      @on-change="pageChange"
                      @on-page-size-change="pageSizeChange"
                      transfer size="small" show-elevator
                      show-sizer show-total/>
            </Card>
            <Spin fix v-if="Loading">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中...</div>
            </Spin>
        </Card>
        <BackTop></BackTop>
    </div>
</template>

<script>
  import {
    Row,
    BackTop,
    Col,
    Card,
    Spin,
    Icon,
    Button,
    Alert,
    Tag,
    Page
  } from 'view-design'
  import dev from '../../../dev.env'
  import axios from '@/axios/index'
  import ArticleBlock from '@/components/forum/ArticleBlock'
  import ExamBlock from '@/components/forum/ExamBlock'

  export default {
    name: 'articleContext',
    components: {
      ArticleBlock,
      ExamBlock,
      Row,
      BackTop,
      Col,
      Card,
      Spin,
      Icon,
      Button,
      Alert,
      Tag,
      Page
    },
    data () {
      return {
        exam_is: false,
        user: this.$store.getters['auth/getUserPk'],
        pagination: {
          items: [],
          index: 1,
          pageSize: dev.HTTP.pageSize,
          pageSizeOpts: [
            dev.HTTP.pageSize,
            dev.HTTP.pageSize * 10,
            dev.HTTP.pageSize * 20,
            dev.HTTP.pageSize * 40,
            dev.HTTP.pageSize * 80
          ],
          count: 1,
          next: null,
          previous: null
        },
        Loading: true,
        exam: {
          default: false,
          pagination: {
            items: [],
            index: 1,
            pageSize: dev.HTTP.pageSize,
            pageSizeOpts: [
              dev.HTTP.pageSize,
              dev.HTTP.pageSize * 10,
              dev.HTTP.pageSize * 20,
              dev.HTTP.pageSize * 40,
              dev.HTTP.pageSize * 80
            ],
            count: 1,
            next: null,
            previous: null
          },
          school: {
            name: ''
          },
          Loading: false
        }
      }
    },
    created: function () {
      this.initHttpCronUser()
      this.initHttp()
    },
    methods: {
      isShow: function (val) {
        this.exam_is = val
      },
      /**
       * 学员任务分页器实现
       * @param index
       */
      pageChangeExam: function (index) {
        this.initHttpCronUser()
      },
      /**
       * 学员任务分页条数实现
       * @param page
       */
      pageSizeChangeExam: function (page) {
        this.exam.pagination.pageSize = page
        this.initHttpCronUser()
      },
      /**
       * 课程分页器实现
       * @param index
       */
      pageChange: function (index) {
        this.initHttp()
      },
      /**
       * 课程分页条数实现
       * @param page
       */
      pageSizeChange: function (page) {
        this.pagination.pageSize = page
        this.initHttp()
      },
      initHttpCronUser: function (methods = 'GET', data = {
        key_user: this.user,
        status: 1
      }, index = null) {
        return new Promise((resolve, reject) => {
          this.exam.Loading = true
          axios.cronUser('GET', data, index, this.exam.pagination).then(response => {
            if (methods.toUpperCase() === 'GET') {
              if (response.data.results.length > 0) {
                this.exam.school.name = response.data.results[0].cron_tab_main.school.name
                this.exam.pagination.items = response.data.results
                this.exam.pagination.count = response.data.count
                this.exam.pagination.next = response.data.next
                this.exam.pagination.previous = response.data.previous
                this.exam.default = true
              }
              return resolve(response)
            }
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.exam.Loading = false
            return resolve(finallys)
          })
        })
      },

      initHttp: function (methods = 'GET', data = {
        key_user: this.user
      }, index = null) {
        return new Promise((resolve, reject) => {
          this.Loading = true
          axios.userSemester('GET', data, index, this.pagination).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.pagination.items = response.data.results
              this.pagination.count = response.data.count
              this.pagination.next = response.data.next
              this.pagination.previous = response.data.previous
              this.Loading = false
              return resolve(response)
            }
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.Loading = false
            return resolve(finallys)
          })
        })
      }
    }
  }
</script>

<style scoped>
    >>> .ivu-row-flex {
        /**
         * 布局内容 左对齐
         */
        display: flow-root !important;
    }

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
