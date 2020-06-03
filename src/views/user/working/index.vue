<!--工作表 第一份工作情况等信息的登记管理-->
<template>
    <Card :bordered="false" dis-hover>
        <Spin fix v-if="fromData.formLoading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>{{ fromData.formName }}</div>
        </Spin>

        <Form ref="formInline" :label-width="120" label-position="left" :model="fromData.formInline"
              :rules="fromData.ruleInline">
            <FormItem label="单位" prop="unit">
                <Input placeholder="请输入单位" v-model="fromData.formInline.unit"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="职位" prop="position">
                <Input placeholder="请输入职位" v-model="fromData.formInline.position"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="单位电话" prop="work_telephone">
                <Input placeholder="请输入单位电话" v-model="fromData.formInline.work_telephone"></Input>
            </FormItem>
            <Divider size="small" dashed/>
            <FormItem label="入职时间" prop="entry_time">
                <DatePicker type="date" placeholder="请输入入职时间"
                            v-model="fromData.formInline.entry_time"></DatePicker>
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
    Icon
  } from 'view-design'
  import axios from '@/axios/index'

  export default {
    name: 'workingIndex',
    data () {
      return {
        active: 2,
        /**
         * Image Update**/
        image: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        uploadList: [],

        /**
         * From Data
         */
        fromData: {
          user: this.$store.getters['auth/getUserPk'],
          formLoading: true,
          formName: '加载中...',
          formMethod: 'PATCH',
          formDefault: false,
          formInline: {
            id: null,
            unit: null,
            entry_time: null,
            position: null,
            work_telephone: null,
            key: this.$store.getters['auth/getUserPk']
          },
          ruleInline: {
            unit: [
              { required: true, type: 'string', message: '请正确输入单位名称', trigger: 'blur' },
              { max: 200, message: '最大200长度', trigger: 'blur' }
            ],
            position: [
              { required: true, type: 'string', min: 2, message: '请正确输入职位', trigger: 'blur' },
              { max: 50, message: '最大50长度', trigger: 'blur' }
            ],
            work_telephone: [
              { required: true, type: 'string', max: 50, message: '请正确输入单位电话' },
              { max: 50, message: '最大50长度', trigger: 'blur' }

            ],
            entry_time: [
              { required: true, type: 'date', message: '入职时间' }
            ]
          }
        }
      }
    },
    created () {
      this.$store.commit('user/setActive', this.active)
      let context = {
        key: this.fromData.user
      }
      axios.userInfo('GET', context).then(res => {
        console.log(res.data.results.length)
        if (res.data.results.length !== 0) {
          this.fromData.formInline = res.data.results[0]
        } else {
          this.fromData.formMethod = 'POST'
        }
      }).catch(err => {
        Message.error('获取用户信息保存失败')
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
      Icon
    },
    methods: {
      saveFromData: function () {
        this.fromData.formLoading = true
        this.fromData.formName = '正在保存...'
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            let user = this.fromData.formInline.id
            if (this.fromData.formMethod === 'POST') user = null
            axios.userInfo(this.fromData.formMethod, this.fromData.formInline, user).then(res => {
              this.fromData.formInline = res.data
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
