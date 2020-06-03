<template>
    <div class="auth">
        <Card :bordered="false" dis-hover>
            <div class="auth-title">
                <div slot="title">
                    <div class="auth-left">
                        <h5 class="auth-title">登录到微题</h5>
                        <p class="auth-text">请输入您的用户名和密码</p>
                    </div>
                    <div class="auth-right">
                        <transition name="fade" mode="out-in">
                            <Icon v-if="!loginLock" type="ios-lock" :key="0"/>
                            <Icon v-else type="ios-unlock" :key="1"/>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="auth-form">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">

                    <FormItem prop="username" :error="errorValidate.username.message">
                        <Input type="text" placeholder="邮箱/用户名" size="large"
                               v-model="formValidate.username">
                            <Icon type="ios-person-outline" slot="prefix"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password" :error="errorValidate.password.message">
                        <Input type="password" placeholder="密码" size="large"
                               v-model="formValidate.password">
                            <Icon type="ios-lock-outline" slot="prefix"></Icon>
                        </Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" shape="circle" size="large" long
                                v-on:click="onLogin">登录
                        </Button>
                    </FormItem>

                    <FormItem class="auth-pc">
                        <div class="float-left save-login">
                            <Checkbox style="color: #515a6e !important">保持登录</Checkbox>
                        </div>
                        <div class="float-right">
                            <router-link :to="{name: 'register'}">注册账户</router-link>
                            <span>&nbsp;|&nbsp;</span>
                            <router-link to="">忘记密码</router-link>
                        </div>
                    </FormItem>
                    <!--                    <FormItem class="auth-mobile">-->
                    <!--                        <div class="float-left">-->
                    <!--                            <Checkbox style="color: #515a6e !important">保持登录</Checkbox>-->
                    <!--                        </div>-->
                    <!--                        <div class="float-right">-->
                    <!--                            <router-link :to="{name: 'register'}">注册账户</router-link>-->
                    <!--                            <span>&nbsp;|&nbsp;</span>-->
                    <!--                            <router-link to="">忘记密码</router-link>-->
                    <!--                        </div>-->
                    <!--                    </FormItem>-->
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
    Message
  } from 'view-design'
  import '@/assets/Icon-tencent/iconfont.css'
  import Axios from '@/axios/index'
  import loginHerads from '@/components/auth/meta'

  export default {
    name: 'login',
    data () {
      const username = (rule, value, callback) => {
        if (value.length > 2) {
          return callback()
        } else if (value) {
          return callback(new Error('用户名长度需大于2位数哦'))
        }
        return callback(new Error('请输入邮箱或用户名'))
      }
      const password = (rule, value, callback) => {
        if (value.length > 6) {
          return callback()
        } else if (value) {
          return callback(new Error('密码长度需大于6位数哦'))
        }
        return callback(new Error('请输入密码'))
      }
      return {
        pk: null,
        isValids: false, // 正在登录状态 动画
        loginLock: false, // 登录一把锁 状态同步 isValids
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
          username: '',
          password: ''
        },
        ruleValidate: {
          username: [
            {
              required: true,
              validator: username
            }
          ],
          password: [
            {
              required: true,
              validator: password
            }
          ]
        },
        errorValidate: {
          username: {
            message: null
          },
          password: {
            message: null
          }
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (this.verify) this.onNext() // 是否登录
      })
    },
    methods: {
      onLogin: function () {
        this.errorValidate.password.message = null
        this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            this.isValids = true
            Axios.authorization(this.formValidate.username, this.formValidate.password).then((response) => {
              console.log('then', response)
              if (response.statusText === 'OK') {
                this.isValids = false
                this.loginLock = true
                this.$store.commit('auth/setAutherization', {
                  pk: response.data.user.id,
                  token: response.data.token,
                  user: response.data.user.username,
                  verify: true
                })
                this.onNext()
              }
            }).catch(error => {
              console.log('login error', error)
              if (error.data.non_field_errors[0] === '无法使用提供的认证信息登录。') {
                Message.warning('用户或密码错误')
                this.errorValidate.password.message = '用户名或密码错误'
              }
              this.isValids = false
            })
          }
        })
      },
      /* 登录成功后路由跳转 */
      onNext: function () {
        this.$nextTick(() => {
          this.$router.push({ name: 'index' })
        })
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

      'login-herads': loginHerads
    },
    computed: {
      verify: function () {
        return this.$store.getters['auth/getVerify']
      }
    },
    watch: {
      verify: function (a, b) {
        if (a === true) this.onNext()
      }
    }
  }
</script>

<style scoped>


</style>

