<template>
    <List>
        <!--        没有使用-->
        <ListItem v-for="(item, key) in pagination.items" :key="key">
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
</template>

<script>
  import {
    Card,
    List,
    ListItem,
    ListItemMeta,
    Time
  } from 'view-design'
  import axios from '@/axios/index'
  import dev from '@/../dev.env'

  export default {
    name: 'modularChapter',
    props: {
      chapterId: {
        type: [String, Number]
      }
    },
    data () {
      return {
        loading: true,
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
    },
    created () {
      console.log(this.chapterId)
      // this.initHttpChapter('GET', {
      //   key_class_ques_model: this.chapterId
      // })
    },
    components: {
      Card,
      List,
      ListItem,
      ListItemMeta,
      Time
    },
    methods: {
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
              this.pagination.items = response.data.results
              this.pagination.count = response.data.count
              this.pagination.next = response.data.next
              this.pagination.previous = response.data.previous
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

</style>