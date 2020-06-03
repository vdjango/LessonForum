<template>
    <Card :bordered="false" dis-hover style="margin-top: 15px; margin-bottom: 120px;">

        <div style="text-align:center; border-radius: 20px; overflow: hidden;">
            <img style="object-fit: cover; width: 100%;"
                 src="http://127.0.0.1:8000/media/class-question/1580260623/2020-01-29_091703.png">
        </div>
        <Card :bordered="false" dis-hover style="margin-top: 15px; margin-bottom: 120px;">
            <h3 slot="title" style="margin-top: 15px">计算机与网络</h3>
            <Spin fix v-if="loading">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
            <Row>
                <Col span="6">
                    <Card :bordered="false" dis-hover>
                        <Timeline pending style="margin-top: 15px">
                            <TimelineItem v-for="(item, key) in listItem.pagination.items" :key="key">
                                <!--                                <router-link :to="{name: 'modular_chapter',params: {chapterId: item.id}}">-->
                                <!--                                   -->
                                <!--                                </router-link>-->
                                <a href="javascript:;" v-on:click="itemChapter(item.id)"> {{item.name}}</a>
                                <!--                                <p class="content">-->
                                <!--                                    最后练习于-->
                                <!--                                    <Time :time="item.lately_time"></Time>-->
                                <!--                                </p>-->
                            </TimelineItem>
                        </Timeline>
                    </Card>
                </Col>
                <Col span="18">
                    <Card :bordered="false" dis-hover style="border-left: 1px solid #e8eaec;">
                        <List>
                            <ListItem v-for="(item, key) in listItem.item.pagination.items" :key="key">
                                <ListItemMeta :title="item.name">
                                    <!--                <template slot="description">-->
                                    <!--                    最后练习于-->
                                    <!--                    <Time time="2020-01-29T18:46:33.895782+08:00"></Time>-->
                                    <!--                </template>-->
                                </ListItemMeta>
                                <template slot="action">
                                    <li>
                                        <router-link :to="{name: 'trial_exam',params: {id: item.id}}">练习</router-link>
                                    </li>
                                </template>
                            </ListItem>
                        </List>
                    </Card>
                </Col>
            </Row>
        </Card>
    </Card>
</template>

<script>
  import {
    Card,
    Timeline,
    TimelineItem,
    Divider,
    Time,
    Row,
    Col,
    Button,
    List,
    ListItem,
    ListItemMeta,
    Spin,
    Icon
  } from 'view-design'
  import axios from '@/axios/index'
  import dev from '@/../dev.env'

  export default {
    name: 'modularIndex',
    props: {
      modularId: {
        type: [String, Number]
      }
    },
    data () {
      return {
        pageId: 1,
        loading: true,
        listItem: {
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
          item: {
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
            }
          }
        }
      }
    },
    created () {
      console.log(this.modularId)
      this.initHttpModel('GET', {
        key_user: this.modularId
      }).then(response => {
        this.initHttpChapter('GET', {
          key_class_ques_model: this.listItem.pagination.items[0].id
        })
      })
    },
    components: {
      Card,
      Timeline,
      TimelineItem,
      Divider,
      Time,
      Row,
      Col,
      Button,
      List,
      ListItem,
      ListItemMeta,
      Spin,
      Icon
    },
    methods: {
      itemChapter: function (index) {
        this.initHttpChapter('GET', {
          key_class_ques_model: index
        })
      },
      initHttpChapter: function (methods = 'GET', data = {}, index = null) {
        /**
         * 模块分类
         */
        this.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestionChapter(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.listItem.item.pagination.items = response.data.results
              this.listItem.item.pagination.count = response.data.count
              this.listItem.item.pagination.next = response.data.next
              this.listItem.item.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.loading = false
            return resolve(finallys)
          })
        })
      },
      initHttpModel: function (methods = 'GET', data = {}, index = null) {
        /**
         * 模块分类
         */
        this.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestionModel(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.listItem.pagination.items = response.data.results
              this.listItem.pagination.count = response.data.count
              this.listItem.pagination.next = response.data.next
              this.listItem.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.loading = false
            return resolve(finallys)
          })
        })
      }
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