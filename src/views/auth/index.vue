<template>
    <div class="login">
        <div class="auth-logo">
            <div class="login-image">
                <Carousel :loop="setting.loop"
                          :autoplay="setting.autoplay"
                          :autoplay-speed="setting.autoplaySpeed"
                          :dots="setting.dots"
                          :radius-dot="setting.radiusDot"
                          :trigger="setting.trigger"
                          :arrow="setting.arrow">
                    <CarouselItem>
                        <div class="demo-carousel web_bg"
                             :style="'background-image: url(' + require('@/assets/auth/5c90e7fbf15f5.jpg') + ');'">
                        </div>
                    </CarouselItem>
                    <!--                    <CarouselItem>-->
                    <!--                        <div class="demo-carousel web_bg"-->
                    <!--                             :style="'background-image: url(' + require('@/assets/1.jpg') + ');'">-->
                    <!--                        </div>-->
                    <!--                    </CarouselItem>-->
                </Carousel>
            </div>
            <Icon class="auth-image" style="margin-top: 25px" size="160" color="#fc6a83" type="ios-book"/>
            <!--            <img class="auth-image" :src="require('@/assets/logo.jpg')">-->
        </div>


        <b-container fluid class="text-light text-center media-pt">
            <b-row class="m-auto pt-1">
                <!--                <b-col md="12" class="auth mt-5 pl-3 pr-3 auth-login">-->
                <!--                    <div class="login-card-center">-->
                <!--                        <h1>汉服行</h1>-->
                <!--                        <small>汉民族的传统服饰，汉服行天下-->
                <!--                        </small>-->
                <!--                    </div>-->
                <!--                </b-col>-->
                <b-col md="auto" class="m-auto mt-md-2">
                    <router-view name="auth"></router-view>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import {
    Card,
    Menu,
    MenuItem,
    Carousel,
    CarouselItem,
    Icon,
    Form,
    FormItem,
    Button,
    Input,
    Divider,
    Avatar,
    Checkbox
  } from 'view-design'
  import {
    BContainer,
    BRow,
    BCol
  } from 'bootstrap-vue'
  import '@/assets/Icon-tencent/iconfont.css'

  export default {
    name: 'index',
    data () {
      return {
        activeName: '',
        show: true,
        loginLock: false,
        setting: {
          loop: true,
          autoplay: true,
          autoplaySpeed: 5000,
          dots: 'none',
          radiusDot: false,
          trigger: 'click',
          arrow: 'never'
        }
      }
    },
    computed: {
      getMenuActives: function () {
        return this.$store.getters['index/getMenuActive']
      }
    },
    watch: {
      getMenuActives: function (a, b) {
        console.log('aaaa', a, b)
        this.activeName = a
      }
    },
    methods: {
      onLogin: function () {
        this.loginLock = true
      }
    },
    components: {
      Card,
      Menu,
      MenuItem,
      Carousel,
      CarouselItem,
      Icon,
      Form,
      FormItem,
      Button,
      Input,
      Divider,
      Avatar,
      Checkbox,
      'b-container': BContainer,
      'b-row': BRow,
      'b-col': BCol
    }
  }
</script>

<style scoped>

    .login-card-center {
        color: #fff;
        margin-bottom: 15px;
        text-align: center;
    }

    .login-card-center h1 {
        font-size: 50px;
        font-weight: 800;
    }

    .login-card-center small {
        font-size: 32px;
        font-weight: 400;
    }

    @media (max-width: 575px) {
        >>> .col-md-auto {
            width: 100% !important;
        }

        .auth-logo {
            padding-top: 1rem;
        }

        .auth-login {
            display: none;
        }

        .login {
            padding-top: 0rem;
            width: 100%;
        }

        >>> h1 {
            color: #969696;
        }

        >>> small {
            color: #8a8a8a;;
        }

        >>> .container-fluid {
            padding-right: 0px !important;
            padding-left: 0px !important;
            padding-top: 10px !important;
            margin-right: auto;
            margin-left: auto;
        }

        >>> .ivu-carousel {
            display: none;
        }

        >>> .auth-title {
            display: none;
        }

        >>> .save-login {
            display: none;
        }

        .login-image {
            height: auto;
            background: #ffffff;
        }

        .auth-image {
            height: 200px;
            margin: 0 auto;
            text-align: center;
            display: block !important;
        }
    }

    @media (min-width: 576px) {
        >>> .col-md-auto {
            width: 300px !important;
        }

        .login {
            width: 100%;
        }
    }

    @media (min-width: 768px) {
        >>> .col-md-auto {
            width: 350px !important;
        }

        .article-container {
            max-width: 520px;
        }
    }

    @media (min-width: 992px) {
        >>> .col-md-auto {
            width: 400px !important;
        }
    }

    @media (min-width: 1200px) {
        >>> .col-md-auto {
            width: 440px !important;
        }

        .auth-header {
            padding-bottom: 25px;
        }

        .auth-header >>> h1 {
            padding-bottom: 5px;
        }

        .media-pt {
            padding-top: 150px;
        }
    }


    .web_bg {
        zoom: 1;
        width: 100vw;
        height: 100vh;
        z-index: -10;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-position: center;
    }


    >>> .ivu-carousel-item {
        height: -webkit-fill-available !important;
    }


    /* 固定窗口大小 登录或者注册小窗口 */
    >>> .login-text .login-card .ivu-card {
        width: 25vw;
        margin: auto;
    }

    >>> input {
        border-radius: 32px;
    }

    >>> i {
        margin-left: 6px;
    }

    .auth-image {
        display: none;
    }

</style>

<style>
    .auth-title {
        display: flow-root;
    }

    .auth-center h1 {
        font-weight: 100;
    }

    .auth-left {
        float: left;
    }

    .auth-right {
        float: right;
    }

    .auth-right i {
        font-size: 54px;
        color: #dddddd;
    }

    .auth-title {
        color: #2c3e50;
        text-align: left;
        margin-bottom: .55rem;
    }

    .auth-text:last-child {
        color: #2c3e50;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 0;
    }

    .auth-form {
        padding: 0 10px 0 10px;
    }

    .auth .text-light {
        color: #515a6e !important;
    }

    .auth {
        list-style: none;
        text-align: center;
        margin-bottom: 0 !important;
    }

    .auth li {
        display: inline;
    }

    .login-card {
        position: fixed;
    }

    .login-image {
        width: 100%;
        /*height: 100%;*/
        overflow: hidden;
        position: absolute;
    }

    .login-image img {
        width: 100%;
    }

    /* 顶部导航 */
    .login-menu {
        top: 0;
        width: 100vw;
        position: absolute;
        /*display: none;*/
    }

    .login-menu-context {
        width: 1200px;
        margin: auto;
    }
</style>