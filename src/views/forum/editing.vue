<template>
    <Row>
        <Col span="4" class="menu">
            <div class="menu-backup">
                <Button class="button" type="warning" shape="circle" ghost :to="{name: 'forum'}">返回首页</Button>
            </div>
            <div class="menu-backup">
                <Button v-if="isVerify" class="button" type="info" shape="circle" ghost v-on:click="onPublish">发布文章
                </Button>
                <Button v-else class="button" type="info" shape="circle" ghost disabled>发布文章</Button>
            </div>

            <div class="menu-backup" style="padding: 20px">

                <div class="demo-upload-list" v-for="item in uploadFileImage">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline"></Icon>
                            <Icon type="ios-trash-outline"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>

            </div>
        </Col>

        <Col span="20" class="border-right">
            <Card :bordered="false" dis-hover style="width: 415px; float: left; margin: 0 auto;">
                <template slot="title">
                    <Input v-model="title" placeholder="无标题。。。"/>
                </template>
                <!--                <markdown v-model="text"-->
                <!--                          :headers="headers"-->
                <!--                          :updateData="{key:pid}"-->
                <!--                          @on-value="gethtml"-->
                <!--                          :initialValue="initialValue"></markdown>-->

                <editor v-model="tinyValue" api-key="u4aqvp838kgicpb4gotilbvwy26dbu8385bmd1d5s0xq7kap" :init="init"></editor>
            </Card>
            <Card style="width: 415px; float: left; margin: 0 auto;">
                <div v-html="tinyValue"></div>
            </Card>
        </Col>
        <div v-if="isUpload.default">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>{{ isUpload.message }}</div>
            </Spin>
        </div>

    </Row>
</template>

<script>
  import config from '@/../dev.env'
  import Axiox from '@/axios/index'
  import Cookies from '@/utils/Cookie'
  import markdown from '@/components/markdown/index'
  import Editor from '@tinymce/tinymce-vue'
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver'
  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/wordcount'// 字数统计插件
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/autosave'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/quickbars'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/codesample'

  import {
    Row,
    Col,
    Input,
    Divider,
    Button,
    Upload,
    Spin,
    Icon
  } from 'view-design'

  const Autherization = Cookies.getCookieAutherization()

  export default {
    name: 'forumEditing',
    data: function () {
      return {
        tinyValue: '123',
        pid: null,
        isVerify: false,
        userId: Number(Autherization.pk),
        cid: null,
        title: '',
        text: '',
        html: '',
        initialValue: '',
        uploadFileImage: [],
        isUpload: {
          default: false,
          message: '正在保存...'
        },
        data: {
          name: '',
          text: '',
          images: null,
          user: Number(Autherization.pk)
        },
        fileList: [
          // {
          //   name: '2019-03-20_120835.jpg',
          //   url: 'http://127.0.0.1:8000/media/article-image/1553054915/2019-03-20_120835.jpg'
          // }
        ],
        headers: {
          Authorization: config.API.TOKENPREFIX + ' ' + Autherization.token
        },
        tinymceHtml: '',
        init: {
          language_url: '/tinymce/langs/zh_CN.js',// 语言包的路径
          language: 'zh_CN',//语言
          skin_url: '/tinymce/skins/ui/oxide',// skin路径，注意这个，很多网上教程都是skins/lightgray，但是发现其实并没有这个玩意儿
          height: 630,
          plugins: 'lists image media table wordcount autolink autosave codesample link quickbars',
          toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
          // branding: false
          images_upload_handler: (blobInfo, success, failure) => {
            const img = 'data:image/jpeg;base64,' + blobInfo.base64()
            success(img)
          },
          selector: '.dfree-body',
          // toolbar: false,
          quickbars_insert_toolbar: 'quicktable image',
          quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote quicklink',
          contextmenu: 'inserttable | cell row column deletetable undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
          powerpaste_word_import: 'clean',
          powerpaste_html_import: 'clean'
        }
      }
    },
    mounted: function () {
      /* eslint-disable */
      tinymce.init({})
    },
    components: {
      markdown,
      Row,
      Col,
      Input,
      Divider,
      Button,
      Upload,
      Spin,
      Icon,
      'editor': Editor
    },
    methods: {
      gethtml: function (html) {
        this.html = html
        console.log('html', html)
      },
      // 上传文件之前
      beforeUpload: function (file) {
        return true
      },
      // 文件上传时
      onUploadProgress: function (event, file, fileList) {
      },
      // 文件上传失败
      onUploadError: function (error, file, fileList) {
        if (error) {
        }
      },
      // 点击已上传的文件
      onUploadPreview: function (file) {
        // 通过 file.response 拿到服务端返回数据
      },
      // 文件列表移除文件
      onUploadRemove: function (file, fileList) {
      },
      // 上传
      onPublish: function () {
        let method = 'POST'
        let index = null
        const datas = {
          user: this.articleUser,
          verify: true
        }
        console.log(this.data)
        if (this.pid) {
          method = 'PATCH'
          index = this.pid
        }

        if (this.title) datas['name'] = this.title
        if (this.html) datas['text'] = this.html

        this.isUpload.default = true
        Axiox.article(method, datas, index).then(response => {
          this.pid = response.id
          setTimeout(() => {
            setTimeout(() => {
              this.isUpload.default = false
              this.$router.push({
                name: 'forum'
              })
            }, 300)
            this.isUpload.message = '已保存，正在跳转'
          }, 200)
        })
      },
      isVerifys: function () {
        if (this.title && this.text) {
          this.isVerify = true
        } else {
          this.isVerify = false
        }
      }
    },
    computed: {
      articleUser: function () {
        return Number(Autherization.pk)
      },
      articleName: function () {
        return this.title
      },
      articleText: function () {
        return this.text
      },
      articleUploadFileImage: function () {
        return this.uploadFileImage
      },
      getArticleId: function () {
        return this.$store.getters['forumHeader/getArticleId']
      }
    },
    watch: {
      articleName: function (a, b) {
        this.data.name = a
        this.isVerifys()
      },
      articleText: function (a, b) {
        this.data.text = a
        this.isVerifys()
      },
      articleUploadFileImage: function (a, b) {
        this.data.images = a
      },
      getArticleId: function (a, b) {
        this.pid = a
        console.log('cid', this.pid)
        this.$emit('article-id', a)
      }
    }
  }
</script>

<style scoped>
    .border-right {
        border-right: 1px solid #eff1f2;
        border-left: 1px solid #eff1f2;
    }

    .menu {
        background-color: #404040;
        height: -webkit-fill-available;
        color: #f2f2f2;
    }

    .menu > .menu-backup {
        width: 100%;
        margin-top: 15px;
        text-align: center;
    }

    .menu > .menu-backup > .button {
        width: 85%;
    }

    .font-color {
        color: #eff1f2;
    }

    .context-text {
        width: auto;
        overflow: auto;
        height: 650px;
    }

    >>> .ivu-divider-horizontal.ivu-divider-with-text-center, .ivu-divider-horizontal.ivu-divider-with-text-left, .ivu-divider-horizontal.ivu-divider-with-text-right {
        margin: 12px 0;
    }

    >>> .ivu-upload-drag {
        background: unset;
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
