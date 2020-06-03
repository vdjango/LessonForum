<template>
    <div class="auth">
        <Card bordered dis-hover>
            <div class="auth-title">
                <div slot="title">
                    <div class="auth-left">
                        <h5 class="auth-title">注册微题账户</h5>
                        <p class="auth-text">您注册的微题账户是登陆网站的唯一凭据</p>
                    </div>
                    <div class="auth-right">
                        <transition name="fade" mode="out-in">
                        <span v-if="!errorForm.error">
                            <Icon v-if="!loginLock" type="md-person-add" key="0"/>
                            <Icon v-else class="green" type="md-checkmark-circle-outline" key="1"/>
                        </span>
                            <span v-else>
                            <Icon class="error" type="ios-close-circle-outline"/>
                        </span>
                        </transition>
                    </div>
                </div>
            </div>

            <div class="auth-form">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <FormItem prop="email" :error="errorValidate.email.message">
                        <Input type="email" placeholder="邮箱" size="large"
                               v-model="formValidate.email">
                            <Icon type="ios-mail-outline" slot="prefix"/>
                        </Input>
                    </FormItem>
                    <FormItem prop="first_name" :error="errorValidate.first_name.message">
                        <Input placeholder="姓名" size="large"
                               v-model="formValidate.first_name">
                            <Icon type="ios-person-outline" slot="prefix"/>
                        </Input>
                    </FormItem>
                    <FormItem prop="password" :error="errorValidate.password.message">
                        <Input type="password" placeholder="密码" size="large"
                               v-model="formValidate.password"
                               @keyup.enter="onRegister">
                            <Icon type="ios-lock-outline" slot="prefix"/>
                        </Input>
                    </FormItem>
                    <FormItem prop="subpassword">
                        <Input type="password" placeholder="重复密码" size="large"
                               v-model="formValidate.subpassword"
                               @keyup.enter="onRegister">
                            <Icon type="ios-lock-outline" slot="prefix"/>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Alert type="warning" show-icon v-if="errorForm.error">{{ errorForm.message }}</Alert>
                        <span v-if="loginLock">
                            <Button
                                    type="info"
                                    shape="circle"
                                    size="large"
                                    long disabled loading
                                    v-on:click="onRegister">
                            以注册，正在跳转
                            </Button>
                        </span>
                        <span v-else>
                            <Button v-if="!errorForm.error"
                                    type="primary"
                                    shape="circle"
                                    size="large" long
                                    v-on:click="onRegister">注册
                            </Button>
                            <Button v-else type="primary"
                                    shape="circle"
                                    size="large" long
                                    v-on:click="onRegister" disabled>注册
                            </Button>
                        </span>
                    </FormItem>
                    <FormItem>
                        <div class="float-left">
                            <router-link :to="{name: 'login'}">
                                <Icon type="ios-arrow-back"/>
                                已有账户？ 请登录
                            </router-link>
                        </div>
                        <div class="float-right">
                            <router-link to="">忘记密码</router-link>
                        </div>
                    </FormItem>
                </Form>
            </div>
            <Spin size="large" fix v-if="isValids"></Spin>
        </Card>
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
    Checkbox,
    Spin,
    Alert
  } from 'view-design'
  import '@/assets/Icon-tencent/iconfont.css'
  import Axios from '@/axios/index'
  import Metas from '@/components/auth/meta'

  export default {
    name: 'register',
    data () {
      const email = (rule, value, callback) => {
        this.clearErrorForm()
        if (value) {
          return callback()
        }
        return callback(new Error('请输入邮箱'))
      }
      const firstName = (rule, value, callback) => {
        if (value.length > 2) {
          return callback()
        } else if (value) {
          return callback(new Error('姓名长度需大于2位数哦'))
        }
        return callback(new Error('请输入姓名'))
      }
      const password = (rule, value, callback) => {
        this.clearErrorForm()
        if (value.length > 6) {
          return callback()
        } else if (value) {
          return callback(new Error('密码长度需大于6位数哦'))
        }
        return callback(new Error('请输入密码'))
      }
      const subpassword = (rule, value, callback) => {
        this.clearErrorForm()
        if (value === this.formValidate.password) {
          return callback()
        } else {
          return callback(new Error('密码不一致'))
        }
      }

      return {
        isValids: false, // 正在登录状态 动画
        loginLock: false, // 登录一把锁 状态同步 isValids， 路由跳转
        setting: {
          loop: true,
          autoplay: true,
          autoplaySpeed: 10000,
          dots: 'none',
          radiusDot: false,
          trigger: 'click',
          arrow: 'never'
        },
        formValidate: {
          email: '',
          first_name: '',
          password: '',
          subpassword: ''
        },
        errorForm: {
          error: false,
          message: null
        },
        ruleValidate: {
          first_name: [
            {
              required: true,
              validator: firstName
            }
          ],
          email: [
            {
              required: true,
              validator: email
            },
            {
              required: true,
              type: 'email',
              message: '您输入的不是邮箱哦！'
            }
          ],
          password: [
            {
              required: true,
              validator: password
            }
          ],
          subpassword: [
            {
              required: true,
              message: '请您输入二次确认密码！'
            },
            {
              required: true,
              validator: subpassword
            }
          ]
        },
        errorValidate: {
          email: {
            message: null
          },
          first_name: {
            message: null
          },
          password: {
            message: null
          }
        }
      }
    },
    methods: {
      /* 注册用户 */
      onRegister: function () {
        this.clearErrorForm()
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.isValids = true
            Axios.authorizationRegister('POST', this.formValidate).then(response => {
              this.isValids = false
              this.loginLock = true
            }).catch(error => {
              this.isValids = false
              if (error.data) {
                /* 可能是用户以注册等错误 */
                // if (error.status === 400 && error.data.username) {
                //   this.errorForm.error = true
                //   this.errorForm.message = error.data.username[0]
                // }
                if (error.status === 400 && error.data) {
                  if (error.data.first_name) this.errorValidate.first_name.message = error.data.first_name[0]
                  if (error.data.email) this.errorValidate.email.message = error.data.email[0]
                  if (error.data.password) this.errorValidate.password.message = error.data.password[0]
                  if (error.data.email || error.data.password) {
                    this.errorForm.error = true
                    this.errorForm.message = '注册账号失败，请核对账号信息'
                  }
                }
              }
            })
          }
        })
      },
      clearErrorForm: function () {
        this.errorForm.error = false
        this.errorForm.message = null
        this.errorValidate.email.message = null
        this.errorValidate.first_name.message = null
        this.errorValidate.password.message = null
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
      Spin,
      Alert,
      Metas
    },
    computed: {
      routerLogin: function () {
        if (this.loginLock) return this.loginLock
      }
    },
    watch: {
      /* 路由延迟跳转,跳转登录页 */
      routerLogin: function (a, b) {
        setTimeout(() => {
          this.$router.push({
            name: 'login'
          })
        }, 1000)
      }
    }

  }
</script>

<style scoped>
    >>> .ivu-form-item-content {
        line-height: 15px;
    }

    >>> .float-left > a .ivu-icon {
        line-height: 0;
    }

    .login-card {
        top: 15vh;
        width: 100vw;
        position: fixed;
    }


    .login-title {
        display: flow-root;
    }

    .login-card-center {
        color: #fff;
        margin-bottom: 45px;
        text-align: center;
    }

    .login-card-left {
        float: left;
    }

    .login-card-right {
        float: right;
    }

    .login-card-right i {
        font-size: 54px;
        color: #dddddd;
    }

    .login-card-title {
        color: #2c3e50;
        margin-bottom: .75rem;
    }

    .login-card-text:last-child {
        color: #2c3e50;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 0;
    }

    .login-form {
        padding: 10px;
    }

    /* 登录一把锁，动画 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }


    /* 调整其他登录方式 Icon图标大小及位置 */
    >>> .ivu-avatar-large i {
        font-size: 24px;
    }

    >>> .ivu-avatar-large {
        width: 35px;
        height: 35px;
    }

    >>> .ivu-avatar-large span {
        margin: auto;
        text-align: center;
        line-height: 36px !important;
    }

    >>> .ivu-card {
        background: rgba(255, 255, 255, 0.9);
    }

    .green {
        color: #00cf00 !important;
    }

    .error {
        color: crimson !important;
    }
</style>
