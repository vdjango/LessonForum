<template>
    <Row type="flex" justify="center" class="code-row-bg article-container">
        <Col md="16" style="width: 100%">
            <div class="forum-center">

                <h1 class="article">{{ name }}</h1>

                <div class="author">
                    <div class="author-avatar">
                        <Avatar size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                    </div>
                    <div class="author-info">
                        <a class="name">作者</a>
                        <div class="meta">
                            <span>阅读 {{ browse }}</span>
                            <span>{{ create_date }}</span>
                            <span>评论 0</span>
                            <span>喜欢 0</span>
                        </div>
                    </div>
                </div>

                <div class="forum-context-html forum-context-article" v-html="text"></div>


            </div>
        </Col>
    </Row>
</template>

<script>
  import {
    Row,
    Col,
    Avatar
  } from 'view-design'
  import Axios from '@/axios/index'
  import '../../assets/js/tinymce/skins/content/default/content.css'

  export default {
    name: 'forumArticle',
    data: function () {
      /* eslint-disable */
      return {
        pid: null,
        name: null,
        text: null,
        images: null,
        create_date: null,
        change_date: null,
        browse: null
      }
    },
    components: {
      Row,
      Col,
      Avatar
    },
    created: function () {
      /* eslint-disable */
      Axios.article('GET', null, this.$route.params['pageId']).then(response => {
        console.log(response)
        this.pid = response.data.pid
        this.name = response.data.name
        this.text = response.data.text
        this.images = response.data.images
        this.create_date = response.data.create_date
        this.change_date = response.data.change_date
        this.browse = response.data.browse
      })
    }
  }
</script>

<style scoped>
    .article {
        word-break: break-word !important;
        word-break: break-all;
        margin: 20px 0 0;
        font-size: 34px;
        font-weight: 700;
        line-height: 1.3;
    }

    .author {
        padding: 30px 0;
    }

    .author-avatar, .author-info {
        vertical-align: middle;
        display: table-cell;
        padding: 0 10px 0 0;
    }

    .author-info {
        margin-left: 10px;
    }

    .author-info .name {
        color: #333;
        margin-right: 3px;
        font-size: 14px;
        vertical-align: middle;
    }

    .author-info .meta {
        /*margin-top: 5px;*/
        font-size: 10px;
        color: #969696;
    }

    .author-info .meta span {
        padding-right: 5px;
    }

    .forum-center {
        margin: 10px auto;
    }

    .forum-context-html {
        width: 100%;
    }

    >>> .forum-context-html img {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
    }


    /**/

    >>> .forum-context-article h2 {
        font-size: 24px;
    }

    >>> .forum-context-article h3 {
        font-size: 22px;
    }

    >>> .forum-context-article p {
        color: #2f2f2f;
        word-break: break-word !important;
        word-break: break-all;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.7;
    }

    >>> .forum-context-articleh1, >>> .forum-context-article h2, >>> .forum-context-article h3, >>> .forum-context-article h4, >>> .forum-context-article h5, >>> .forum-context-article h6 {
        margin: 0 0 15px;
        font-weight: 700;
        color: #2f2f2f;
        line-height: 1.7;
        text-rendering: optimizelegibility;
    }

    >>> .forum-context-article p {
        margin: 0 0 25px;
        display: grid;
    }

    >>> .forum-context-article table {
        width: 100%;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-collapse: collapse;
        border-left: none;
        word-break: normal;
    }

    >>> .forum-context-article table thead th {
        vertical-align: middle;
        text-align: inherit;
    }

    >>> .forum-context-article table th {
        font-weight: 700;
    }

    >>> .forum-context-article table td, >>> .forum-context-article table th {
        padding: 8px;
        border: 1px solid #ddd;
        line-height: 20px;
        vertical-align: middle;
    }

    >>> .forum-context-article table tr:nth-of-type(2n) {
        background-color: hsla(0, 0%, 71%, .1);
    }

    >>> .forum-context-article table th {
        padding: 8px;
        border: 1px solid #ddd;
        line-height: 20px;
        vertical-align: middle;
    }

    >>> .forum-context-article ol, >>> .forum-context-article p, >>> .forum-context-article ul {
        word-break: break-word !important;
        word-break: break-all;
    }

    >>> .forum-context-article a {
        color: #3194d0;
    }

    >>> .forum-context-article img {
        padding-bottom: 25px;
        /*width: 700px;*/
        /*margin-left: -40px;*/
        text-align: center;
    }

    >>> .forum-context-article code {
        padding: 2px 4px;
        background-color: #f6f6f6;
        border: none;
        font-size: 15px;
        white-space: pre-wrap;
        vertical-align: middle;
    }

    >>> .forum-context-article pre {
        margin-bottom: 20px;
        padding: 15px;
        font-size: 13px;
        word-wrap: normal;
        word-break: break-word !important;
        word-break: break-all;
        white-space: pre;
        overflow: auto;
        border-radius: 4px;
    }

    >>> pre {
        display: block;
        margin: 0 0 10px;
        font-size: 13px;
        line-height: 1.42857;
        word-break: break-all;
        word-wrap: break-word;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow-x: auto;
        padding: .5em;
        color: #abb2bf;
        background: #fafafe !important;
    }

    >>> .forum-context-article pre code {
        padding: 0;
        background-color: transparent;
        /*white-space: pre;*/
    }

    >>> pre >>> code {
        padding: 0;
        font-size: inherit;
        color: inherit;
        white-space: pre-wrap;
        background-color: transparent;
        border-radius: 0;
    }


    @media (min-width: 576px) {
        .article-container {
            max-width: 440px;
        }
    }

    @media (min-width: 768px) {
        .article-container {
            max-width: 520px;
        }
    }

    @media (min-width: 992px) {
        .article-container {
            max-width: 660px;
        }
    }

    @media (min-width: 1200px) {
        .article-container {
            max-width: 720px;
        }
    }

    .article-container {
        margin: 0 auto;
    }
</style>
