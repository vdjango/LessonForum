<template>
    <Row :gutter="16">
        <Col span="16">
            <Card dis-hover>
                <p slot="title">周期设置</p>
                <Button size="small" slot="extra" @click="addExtraClass">{{tables.name}}</Button>

                <Tabs :value="tables.value">
                    <!--<TabPane :label="tables.test.name" name="test"></TabPane>-->
                    <TabPane :label="tables.exam.name" name="exam">
                        <Table ref="selection" :loading="tables.exam.loading" :columns="tables.exam.columns"
                               :data="tables.exam.items">
                            <template slot="status" slot-scope="{ row, index }">
                                <p v-if="row.status === 0">考试周期</p>
                                <p v-if="row.status === 1">测试周期</p>
                            </template>
                            <template slot="state" slot-scope="{ row, index }">
                                <p v-if="row.state === 0">已启用</p>
                                <p v-if="row.state === 1">启用</p>
                            </template>
                            <template slot="lately_time" slot-scope="{ row, index }">
                                <Time :time="row.lately_time"></Time>
                            </template>
                            <template slot="add_time" slot-scope="{ row, index }">
                                <Time :time="row.add_time"></Time>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small"
                                        @click="editExam(row, index)"
                                        style="margin-right: 5px">修改
                                </Button>
                                <Button type="error" size="small" @click="HttpExamDelete(row.id, index)">删除
                                </Button>
                            </template>
                        </Table>
                        <Modal v-model="tables.exam.froms.model" draggable scrollable
                               :title="tables.exam.froms.title"
                               @on-ok="editSaveChapter">
                            <Alert>
                                请参考Linux crontab 使用方法
                            </Alert>
                            <Form ref="formValidateModel"
                                  :model="tables.exam.froms.formValidate"
                                  :rules="tables.exam.froms.ruleValidate"
                                  :label-width="80">
                                <FormItem label="定时" prop="name">
                                    <Input v-model="tables.exam.froms.formValidate.times"
                                           placeholder="*/1 * * * *"></Input>
                                </FormItem>
                            </Form>
                        </Modal>
                    </TabPane>
                </Tabs>

            </Card>
        </Col>
        <Col span="8">
            <Card dis-hover>
                <p slot="title">定时日志</p>
                后续完善
            </Card>
        </Col>
    </Row>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Tabs,
    TabPane,
    Message,
    Table,
    Button,
    Modal,
    Form,
    FormItem,
    Input,
    Time,
    Alert
  } from 'view-design'
  import axios from '../../../axios/index'

  export default {
    name: 'period',
    data: function () {
      return {
        tables: {
          value: 'exam',
          name: '添加',
          exam: {
            name: '考试周期',
            loading: true,
            columns: [
              {
                title: '任务',
                key: 'status',
                slot: 'status'
              },
              {
                title: '定时',
                key: 'times'
              },
              {
                title: '状态',
                key: 'state',
                slot: 'state'
              },
              {
                title: '最近修改',
                key: 'lately_time',
                slot: 'lately_time',
                width: 150
              },
              {
                title: '添加时间',
                key: 'add_time',
                slot: 'add_time',
                width: 150
              },
              {
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'right'
              }
            ],
            items: [],
            froms: {
              title: '编辑',
              model: false,
              index: null,
              formValidate: {
                id: null,
                times: null,
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
          name: '定时任务',
          toRouter: {
            name: 'admin_setting_crontab'
          }
        }
      ])
      this.initHttpExam('GET', {
        status: 0
      })
    },
    components: {
      Row,
      Col,
      Card,
      Tabs,
      TabPane,
      Table,
      Button,
      Modal,
      Form,
      FormItem,
      Input,
      Time,
      Alert
    },
    methods: {
      addExtraClass: function () {
        this.tables[this.tables.value].froms.model = true
        this.tables[this.tables.value].froms.title = '添加'
        this.tables[this.tables.value].froms.formValidate.id = null
        this.tables[this.tables.value].froms.index = null
      },
      editSaveChapter () {
        /**
         * 修改章节分类保存
         */
        let methods = 'PATCH'
        let context = {
          times: this.tables.exam.froms.formValidate.times,
          status: this.tables.exam.froms.formValidate.status,
          run: this.tables.exam.froms.formValidate.status,
          state: this.tables.exam.froms.formValidate.state
        }
        if (!this.tables.exam.froms.formValidate.id) methods = 'POST'

        this.initHttpExam(methods, context, this.tables.exam.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.exam.items[this.tables.exam.froms.index].times = response.data.times
            this.tables.exam.items[this.tables.exam.froms.index].status = response.data.status
            this.tables.exam.items[this.tables.exam.froms.index].run = response.data.run
            this.tables.exam.items[this.tables.exam.froms.index].state = response.data.state
            this.tables.exam.items[this.tables.exam.froms.index].lately_time = response.data.lately_time
            this.tables.exam.items[this.tables.exam.froms.index].add_time = response.data.add_time
          } else {
            this.tables.exam.items.unshift(response.data)
          }
        }).finally()
      },
      editExam: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.tables.exam.froms.index = index
        this.tables.exam.froms.model = true
        this.tables.exam.froms.title = '编辑'
        this.tables.exam.froms.formValidate.id = row.id
        this.tables.exam.froms.formValidate.times = row.times
      },
      /**
       * 删除模块分类索引
       * @param row
       * @param index
       * @constructor
       */
      HttpExamDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除后，不可撤销！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpExam('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.exam.items.splice(index, 1)
              // this.initHttpExam()
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
      initHttpExam: function (methods = 'GET', data = {}, index = null) {
        this.tables.exam.loading = true

        return new Promise((resolve, reject) => {
          axios.crontabIndex(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.exam.items = response.data
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.exam.loading = false
            return resolve(finallys)
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>