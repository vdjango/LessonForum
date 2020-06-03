<template>
    <Card :bordered="false">
        <router-link :to="toRouter()">
            <div style="text-align:center">
                <div v-if="images">
                    <img :src="images">
                    <p style="margin-top: 10px;text-align:left">{{title}}</p>
                </div>
                <div v-else style="text-align:left">
                    <h3>{{title}}</h3>
                </div>
            </div>
        </router-link>
        <div class="other">
            <span><Icon type="md-alarm"/> <Time :time="lately_time" :interval="1"/></span>
            <span style="float: right;"><Icon type="md-contacts"/> {{count}}</span>
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
    Time
  } from 'view-design'

  export default {
    name: 'ArticleBlock',
    props: {
      pageId: {
        type: [String, Number]
      },
      count: {
        type: [String, Number]
      },
      title: {
        type: String,
        default: function () {
          return ''
        }
      },
      lately_time: {
        type: String,
        default: function () {
          return '2020-01-29T17:16:17.125896+08:00'
        }
      },
      images: {
        type: String,
        default: function () {
          return null // require('../../assets/0.jpg')
        }
      }
    },
    components: {
      Card,
      Divider,
      Row,
      Col,
      Icon,
      Time
    },
    methods: {
      toRouter: function () {
        return {
          name: 'modular',
          params: {
            modularId: this.pageId
          }
        }
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
