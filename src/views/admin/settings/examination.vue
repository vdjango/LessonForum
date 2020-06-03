<template>
    <Row :gutter="16">
        <Col>
            <Card dis-hover>
                <p slot="title">刷/考设置</p>
                <Button size="small" slot="extra" @click="addExtraClass">{{question.froms.title}}</Button>
                <Alert v-if="!question.loading_text">
                    刷题/考试 时，数据抓取每项题型时的数量设置
                </Alert>
                <div v-else>
                    <Alert v-if="!question.error" type="success" closable @on-close="question.loading_text = false">
                        保存成功！
                    </Alert>
                    <Alert v-else type="error" closable @on-close="question.loading_text = false">
                        {{question.error_msg}}
                    </Alert>
                </div>

                <Table ref="selection" :loading="question.loading" :columns="question.tables.columns"
                       :data="question.tables.items">
                    <template slot="status" slot-scope="{ row, index }">
                        <p v-if="row.status === 0">选择题</p>
                        <p v-if="row.status === 1">判断题</p>
                        <p v-if="row.status === 2">简答题</p>
                        <p v-if="row.status === 3">机试题</p>
                    </template>

                    <template slot="lately_time" slot-scope="{ row, index }">
                        <Time :time="row.lately_time"></Time>
                    </template>
                    <template slot="add_time" slot-scope="{ row, index }">
                        <Time :time="row.add_time"></Time>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small"
                                @click="editQuestion(row, index)"
                                style="margin-right: 5px">修改
                        </Button>
                        <Button type="error" size="small" @click="HttpQuestionDelete(row.id, index)">删除
                        </Button>
                    </template>
                </Table>

                <Modal v-model="question.froms.model" draggable scrollable
                       :title="question.froms.title"
                       @on-ok="editSaveQuestion">
                    <Alert>
                        每种类型只能添加一种，不可重复
                    </Alert>

                    <Form ref="formValidateModel"
                          :model="question.froms.formValidate"
                          :rules="question.froms.ruleValidate"
                          :label-width="80">

                        <FormItem label="类型" prop="status">
                            <Select v-model.number="question.froms.formValidate.status" placeholder="请选择"
                                    :disabled="question.froms.disabled">
                                <Option :value="0">选择题</Option>
                                <Option :value="1">判断题</Option>
                                <Option :value="2">简答题</Option>
                                <Option :value="3">机试题</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="数量" prop="amount">
                            <Input v-model.number="question.froms.formValidate.amount"
                                   placeholder="抓取题数量"></Input>
                        </FormItem>
                    </Form>
                </Modal>

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
    name: 'examination',
    data () {
      return {
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
          name: '刷题考试',
          toRouter: {
            name: 'admin_setting_examination'
          }
        }
      ])
      this.initHttpQuestion()
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
      addExtraClass: function () {
        this.question.froms.model = true
        this.question.froms.title = '添加'
        this.question.froms.formValidate.id = null
        this.question.froms.index = null
      },
      editSaveQuestion () {
        /**
         * 修改章节分类保存
         */
        let methods = 'PATCH'
        let context = {
          stats: this.question.froms.formValidate.stats,
          status: this.question.froms.formValidate.status,
          amount: this.question.froms.formValidate.amount
        }
        if (!this.question.froms.formValidate.id) methods = 'POST'
        this.question.froms.title = '添加'
        this.question.froms.disabled = false

        this.initHttpQuestion(methods, context, this.question.froms.formValidate.id)
      },
      /**
       * 删除模块分类索引
       * @param row
       * @param index
       * @constructor
       */
      HttpQuestionDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除后，不可撤销！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpQuestion('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.question.tables.items.splice(index, 1)
            }).finally(finallys => {
              Modal.remove()
            }).catch(catchs => {
              Message.error('删除失败')
            })
          }
        })
      },
      /**
       *
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttpQuestion: function (methods = 'GET', data = {}, index = null) {
        this.question.loading = true

        return new Promise((resolve, reject) => {
          axios.systemQuestion(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.question.tables.items = response.data
            } else if (methods.toUpperCase() === 'PATCH' || methods.toUpperCase() === 'PUT') {
              this.question.tables.items[this.question.froms.index].status = response.data.status
              this.question.tables.items[this.question.froms.index].amount = response.data.amount
              this.question.tables.items[this.question.froms.index].lately_time = response.data.lately_time
              this.question.tables.items[this.question.froms.index].add_time = response.data.add_time
            } else if (methods.toUpperCase() === 'POST') {
              this.question.tables.items.unshift(response.data)
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.question.loading = false
            return resolve(finallys)
          })
        })
      },
      editQuestion: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.question.froms.index = index
        this.question.froms.model = true
        this.question.froms.disabled = true
        this.question.froms.title = '编辑'
        this.question.froms.formValidate.id = row.id
        this.question.froms.formValidate.status = row.status
        this.question.froms.formValidate.amount = row.amount
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