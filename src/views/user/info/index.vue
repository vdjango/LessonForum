<template>
    <Card :bordered="false" dis-hover>
        <Spin fix v-if="fromData.formLoading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>{{ fromData.formName }}</div>
        </Spin>
        <Row type="flex" align="middle">
            <Col>
                <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        multiple
                        type="drag"
                        :action="actionUrl"
                        :headers="headers"
                        name="image"
                        style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Avatar
                                shape="square"
                                icon="ios-person"
                                size="60"
                                style="line-height: 0 !important;"
                                :src="fromData.formInline.image"/>
                    </div>
                </Upload>
            </Col>
            <Col>
                <Card :bordered="false" dis-hover>
                    头像
                </Card>
            </Col>
        </Row>
        <Form ref="formInline" :label-width="120" label-position="left" :model="fromData.formInline"
              :rules="fromData.ruleInline">
            <Divider size="small" dashed/>
            <FormItem label="ID" prop="username">
                <Input placeholder="请输入昵称" v-model="fromData.formInline.username"
                       :disabled="fromData.formInline.username!=null"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="姓名" prop="first_name">
                <Input placeholder="请输入姓名" v-model="fromData.formInline.first_name"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="性别" prop="username">
                <RadioGroup v-model="fromData.formInline.sex">
                    <Radio :label="0">男</Radio>
                    <Radio :label="1">女</Radio>
                    <Radio :label="2">保密</Radio>
                </RadioGroup>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="学校/班级" prop="key_school_info">
                <Select v-model.number="fromData.formInline.edu" @on-change="onChangeSchool" style="width:200px"
                        placeholder="请选择学校">
                    <Option v-for="(item, key) in edu.data" :key="key" :value="item.id">{{item.name}}</Option>
                </Select>
                <Select :disabled="school.data.length === 0" v-model.number="fromData.formInline.key_school_info"
                        style="width:200px; margin-left: 25px"
                        placeholder="请选择班级">
                    <Option v-for="(item, key) in school.data" :key="key" :value="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="名族" prop="famous_race">
                <Input placeholder="请输入名族" v-model="fromData.formInline.famous_race"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="年龄" prop="age">
                <Input placeholder="请输入年龄" v-model.number="fromData.formInline.age"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="籍贯" prop="native_place">
                <Input placeholder="请输入籍贯" v-model="fromData.formInline.native_place"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="电话" prop="telephone">
                <Input placeholder="请输入电话" v-model="fromData.formInline.telephone"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="身份证号码" prop="id_card">
                <Input placeholder="请输入身份证号码" v-model="fromData.formInline.id_card"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="入学时间" prop="entrance">
                <DatePicker type="date" placeholder="请输入入学时间"
                            v-model="fromData.formInline.entrance"></DatePicker>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="毕业时间" prop="graduation">
                <DatePicker type="date" placeholder="请输入毕业时间"
                            v-model="fromData.formInline.graduation"></DatePicker>
            </FormItem>
            <Divider size="small" dashed/>
            <Button type="primary" :loading="fromData.formLoading" @click="saveFromData">保存</Button>
        </Form>
    </Card>

</template>

<script>
  import {
    Row,
    Col,
    Card,
    Upload,
    Avatar,
    Form,
    FormItem,
    DatePicker,
    RadioGroup,
    Radio,
    Input,
    Divider,
    Button,
    Message,
    Spin,
    Icon,
    Select,
    Option
  } from 'view-design'
  import axios from '@/axios/index'

  import {
    userInfo
  } from '@/axios/restful'

  export default {
    name: 'index',
    data () {
      let u = this.$store.getters['auth/getUserPk']
      return {
        active: 1,
        actionUrl: userInfo(u),
        headers: {},
        /**
         * Image Update**/
        image: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        uploadList: [],
        edu: {
          value: 0,
          data: []
        },
        school: {
          value: 0,
          data: []
        },
        /**
         * From Data
         */
        fromData: {
          user: u,
          formLoading: true,
          formName: '加载中...',
          formInline: {
            id: null,
            edu: null,
            username: null,
            first_name: null,
            sex: 2,
            image: null,
            famous_race: null,
            age: null,
            native_place: null,
            telephone: null,
            id_card: null,
            entrance: null,
            graduation: null,
            key_school_info: null
          },
          ruleInline: {
            username: [
              { required: true, type: 'string', message: '请正确输入用户名', trigger: 'blur' },
              { max: 150, message: '最大150长度', trigger: 'blur' }
            ],
            first_name: [
              { required: true, type: 'string', min: 2, message: '请正确输入姓名', trigger: 'blur' },
              { max: 30, message: '最大30长度', trigger: 'blur' }
            ],
            famous_race: [
              { required: true, type: 'string', message: '请正确输入名族', trigger: 'blur' },
              { max: 100, message: '最大100长度', trigger: 'blur' }
            ],
            age: [
              { required: true, message: '请输入年龄' },
              { type: 'integer', message: '请输入数字' }
            ],
            native_place: [
              { required: true, type: 'string', min: 2, message: '请正确输入籍贯', trigger: 'blur' },
              { max: 100, message: '最大100长度', trigger: 'blur' }
            ],
            telephone: [
              { required: true, type: 'string', min: 10, message: '请正确输入电话', trigger: 'blur' },
              { max: 50, message: '最大50长度', trigger: 'blur' }
            ],
            id_card: [
              { required: true, type: 'string', min: 10, message: '请正确输入身份证', trigger: 'blur' },
              { max: 50, message: '最大50长度', trigger: 'blur' }
            ],
            entrance: [
              { required: true, type: 'date', message: '请正确选择入学时间' }
            ],
            graduation: [
              { required: true, type: 'date', message: '请正确选择毕业时间' }
            ],
            key_school_info: [
              { required: false, type: 'number', message: '请选择', trigger: 'change' }
            ]
          }
        }
      }
    },
    created () {
      this.$store.commit('user/setActive', this.active)
      axios.user('GET', null, this.fromData.user).then(res => {
        this.fromData.formInline = res.data
      }).catch(err => {
        Message.error('获取用户信息保存失败， 请重新登陆')
      })
      axios.userEdu().then(res => {
        this.edu.data = res.data
      }).catch(err => {
        Message.error('获取学校失败')
      }).finally(f => {
        this.fromData.formLoading = false
      })
    },
    components: {
      Row,
      Col,
      Card,
      Upload,
      Avatar,
      Form,
      FormItem,
      DatePicker,
      RadioGroup,
      Radio,
      Input,
      Divider,
      Button,
      Spin,
      Icon,
      Select,
      Option
    },
    methods: {
      onChangeSchool: function (value) {
        axios.userSchool('GET', { key: value }).then(res => {
          this.school.data = res.data.results
        }).catch(err => {
          Message.error('获取班级失败')
        }).finally(f => {
        })
      },
      saveFromData: function () {
        this.fromData.formLoading = true
        this.fromData.formName = '正在保存...'
        this.$refs['formInline'].validate((valid) => {
          if (valid) {

            let context = {
              username: this.fromData.formInline.username,
              first_name: this.fromData.formInline.first_name,
              sex: this.fromData.formInline.sex,
              famous_race: this.fromData.formInline.famous_race,
              age: this.fromData.formInline.age,
              native_place: this.fromData.formInline.native_place,
              telephone: this.fromData.formInline.telephone,
              id_card: this.fromData.formInline.id_card,
              entrance: this.fromData.formInline.entrance,
              graduation: this.fromData.formInline.graduation,
              school_info: {
                'school_info': this.fromData.formInline.key_school_info,
                'user': this.fromData.formInline.id
              }
            }
            axios.user('PATCH', context, this.fromData.user).then(res => {
              this.fromData.formInline = res.data
              if (res.data.key_school_info.length > 0) {
                this.fromData.formInline.key_school_info = res.data.key_school_info[0]
              } else {
                this.fromData.formInline.key_school_info = null
              }
              Message.success('用户信息保存成功')
              this.fromData.formLoading = false
            }).catch(err => {
              Message.error('用户信息保存失败')
            }).finally(f => {
              this.fromData.formLoading = false
            })
          } else {
            Message.error('Fail!')
            this.fromData.formLoading = false
          }
        })
      }
    },
    computed: {
      getEdu: function () {
        return this.fromData.formInline.edu
      }
    },
    watch: {
      getEdu: function (a, b) {
        this.onChangeSchool(a[0])
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
