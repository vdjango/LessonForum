<template>
    <Row :gutter="16">
        <Col span="8">
            <Card dis-hover>
                <p slot="title">数据分页</p>
                <Spin fix v-if="paging.loading">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>保存中...</div>
                </Spin>
                <Alert v-if="!paging.loading_text">
                    前台数据获取条数，一页展示{{paging.froms.formValidate.paging}}条数据
                </Alert>
                <div v-else>
                    <Alert v-if="!paging.error" type="success" closable @on-close="paging.loading_text = false">保存成功！
                    </Alert>
                    <Alert v-else type="error" closable @on-close="paging.loading_text = false">
                        {{paging.error_msg}}
                    </Alert>
                </div>

                <Form ref="formValidateModel"
                      :model="paging.froms.formValidate"
                      :rules="paging.froms.ruleValidate"
                      :label-width="120">
                    <FormItem label="分页条目" prop="name">
                        <Input v-model="paging.froms.formValidate.paging"
                               placeholder="请输入条目数量"></Input>
                    </FormItem>
                    <FormItem>
                        <Button style="float: right" type="primary" @click="editSave()">保存</Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
        <Col span="4">
            <Card dis-hover>
                <p slot="title">邮箱设置</p>
            </Card>
        </Col>
    </Row>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Form,
    FormItem,
    Input,
    Alert,
    Button,
    Spin,
    Icon,
    Table,
    Modal,
    Time,
    Message,
    Select,
    Option
  } from 'view-design'
  import axios from '../../../axios/index'

  export default {
    name: 'systemctl',
    data () {
      return {
        paging: {
          error: false,
          error_msg: '保存失败',
          loading: true,
          loading_text: false,
          froms: {
            title: '编辑',
            model: false,
            index: null,
            formValidate: {
              id: null,
              paging: 40,
              status: 0
            },
            ruleValidate: {
              times: [
                { required: true, message: '请正确填写书名分类名称', trigger: 'blur' }
              ],
              status: [
                { required: false, message: '请正确上传封面图', trigger: 'blur' }
              ]
            }
          }
        },
        question: {
          error: false,
          error_msg: '保存失败',
          loading: true,
          loading_text: false,
          froms: {
            title: '添加',
            model: false,
            index: null,
            disabled: false,
            formValidate: {
              id: null,
              status: null,
              stats: 1,
              amount: null
            },
            ruleValidate: {
              status: [
                { required: true, message: '请选择', type: 'number', trigger: 'change' }
              ],
              amount: [
                { required: true, message: '请正确正确输入数量', type: 'number', trigger: 'blur' }
              ]
            }
          },
          tables: {
            value: 'question',
            columns: [
              {
                title: '类型',
                key: 'status',
                slot: 'status'
              },
              {
                title: '抓取数量',
                key: 'amount'
              },
              {
                title: '最近修改',
                key: 'lately_time',
                slot: 'lately_time'
              },
              {
                title: '操作',
                slot: 'action',
                align: 'right'
              }
            ],
            items: []
          }
        }
      }
    },
    created () {
      this.$store.commit('setTopPath', [
        {
          name: '设置',
          toRouter: {
            name: 'admin_setting_system'
          }
        },
        {
          name: '系统设置',
          toRouter: {
            name: 'admin_setting_system'
          }
        }
      ])
      this.initHttpPaging()
    },
    components: {
      Row,
      Col,
      Card,
      Form,
      FormItem,
      Input,
      Alert,
      Button,
      Spin,
      Icon,
      Table,
      Modal,
      Time,
      Select,
      Option
    },
    methods: {
      editSave () {
        let methods = 'PATCH'
        if (!this.paging.froms.formValidate.id) methods = 'POST'
        this.initHttpPaging(methods, this.paging.froms.formValidate, this.paging.froms.formValidate.id)
      },
      /**
       *
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttpPaging: function (methods = 'GET', data = {}, index = null) {
        this.paging.loading = true

        return new Promise((resolve, reject) => {
          axios.systemIndex(
            methods,
            data,
            index
          ).then(response => {
            if (methods === 'GET') {
              if (response.data.length > 0) {
                this.paging.froms.formValidate.id = response.data[0].id
                this.paging.froms.formValidate.status = response.data[0].status
                this.paging.froms.formValidate.paging = response.data[0].paging
              }
            } else {
              this.paging.froms.formValidate.id = response.data.id
              this.paging.froms.formValidate.status = response.data.status
              this.paging.froms.formValidate.paging = response.data.paging
              this.paging.loading_text = true
              this.paging.error = false
            }
            return resolve(response)
          }).catch(error => {
            this.paging.error = true
            return reject(error)
          }).finally(finallys => {
            this.paging.loading = false
            return resolve(finallys)
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>