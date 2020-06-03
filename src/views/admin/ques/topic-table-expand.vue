<template>
    <Card :bordered="false" style="display: grid;">
        <p slot="title">答案</p>
        <Button slot="extra" size="small" @click="addExtraAnswer">新增答案</Button>

        <Card :bordered="false" dis-hover :padding="5">
            <Breadcrumb>
                <BreadcrumbItem>{{ topic.class_question.name }}</BreadcrumbItem>
                <BreadcrumbItem>{{ topic.class_ques_model.name }}</BreadcrumbItem>
                <BreadcrumbItem>{{ topic.class_ques_chapter.name }}</BreadcrumbItem>

                <BreadcrumbItem v-if="topic.state === 0">选择题 【当前分类】</BreadcrumbItem>
                <BreadcrumbItem v-if="topic.state === 1">判断题 【当前分类】</BreadcrumbItem>
                <BreadcrumbItem v-if="topic.state === 2">简答题 【当前分类】</BreadcrumbItem>
                <BreadcrumbItem v-if="topic.state === 3">机试题 【当前分类】</BreadcrumbItem>
            </Breadcrumb>
        </Card>

        <Table ref="selection"
               :loading="tables.answer.loading"
               :columns="tables.answer.columns"
               :data="tables.answer.pagination.items">
            <template slot="answer" slot-scope="{ row, index }">
                <p v-if="topic.state === 0">{{getChoice(row.choice_gid)}}. {{row.choice}}</p>
                <p v-if="topic.state === 1">{{row.judge}}</p>
                <p v-if="topic.state === 2">{{row.answer}}</p>
                <p v-if="topic.state === 3">{{row.machine}}</p>
            </template>
            <template slot="solu" slot-scope="{ row, index }">
                <Tag v-if="row.solu" type="dot" color="success">正确</Tag>
                <Tag v-else type="dot" color="error">错误</Tag>
            </template>
            <template slot="lately_time" slot-scope="{ row, index }">
                <Time :time="row.lately_time"></Time>
            </template>
            <template slot="add_time" slot-scope="{ row, index }">
                <Time :time="row.add_time"></Time>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button size="small" style="margin-right: 5px"
                        @click="editAnswer(row, index)">编辑
                </Button>
                <Button size="small" @click="HttpAnswerDelete(row.id, index)">删除</Button>
            </template>
        </Table>
        <Card :bordered="false" dis-hover>
            <Page :total="tables.answer.pagination.count"
                  :current.sync="tables.answer.pagination.index"
                  :page-size="tables.answer.pagination.pageSize"
                  :page-size-opts="tables.answer.pagination.pageSizeOpts"
                  @on-change="pageChangeAnswer"
                  @on-page-size-change="pageSizeChangeAnswer"
                  transfer
                  size="small" show-elevator
                  show-sizer show-total/>
        </Card>
        <Modal v-model="tables.answer.froms.model" draggable scrollable :title="tables.answer.froms.title"
               @on-ok="editSaveAnswer">
            <Alert show-icon>
                如果答案是错误的，请设置得分为0，得分将计入分数计算结果
            </Alert>

            <Alert show-icon v-if="topic.state === 1">
                需要添加2条答案哦
                <template slot="desc">
                    <p>未打勾的
                        <Checkbox disabled>正确答案</Checkbox>
                    </p>
                    <p>和打勾的
                        <Checkbox :value="true" disabled>正确答案</Checkbox>
                    </p>
                </template>
            </Alert>

            <Form ref="formValidate"
                  :model="tables.answer.froms.formValidate"
                  :rules="tables.answer.froms.ruleValidate"
                  :label-width="80">

                <FormItem label="题目" prop="key_question">
                    <Input v-model="topic.text" disabled
                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>

                <FormItem label="选项" prop="choice_gid" v-if="topic.state === 0">
                    <Select v-model="tables.answer.froms.formValidate.choice_gid" placeholder="请选择选项">
                        <Option v-for="(item, key) in choice" :key="key" :value="key">{{item}}</Option>
                    </Select>
                </FormItem>

                <FormItem label="选择题" prop="choice" v-if="topic.state === 0">
                    <Input v-model="tables.answer.froms.formValidate.choice"
                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入选择题答案"></Input>
                </FormItem>
                <FormItem label="判断题" prop="judge" v-if="topic.state === 1">
                    <Input v-model="tables.answer.froms.formValidate.judge"
                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入判断题答案，可留空"></Input>
                </FormItem>
                <FormItem label="简答题" prop="answer" v-if="topic.state === 2">
                    <Input v-model="tables.answer.froms.formValidate.answer"
                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入简答题答案"></Input>
                </FormItem>
                <FormItem label="机试题" prop="machine" v-if="topic.state === 3">
                    <Input v-model="tables.answer.froms.formValidate.machine"
                           type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请输入机试题答案"></Input>
                </FormItem>

                <FormItem label="正确答案" prop="solu">
                    <Checkbox v-model="tables.answer.froms.formValidate.solu">正确答案</Checkbox>
                </FormItem>
                <FormItem label="得分" prop="score">
                    <Input v-model="tables.answer.froms.formValidate.score"
                           placeholder="请输入得分"></Input>
                </FormItem>

            </Form>
        </Modal>
    </Card>
</template>

<script>
  import {
    Card,
    Select,
    Option,
    Table,
    Time,
    Button,
    Page,
    Modal,
    Form,
    FormItem,
    Input,
    Tag,
    Breadcrumb,
    BreadcrumbItem,
    Message,
    Checkbox,
    Alert
  } from 'view-design'
  import axios from '../../../axios/index'
  import dev from '../../../../dev.env'

  export default {
    name: 'topic-table-expand',
    props: {
      topic: Object
    },
    data () {
      return {
        choice: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        tables: {
          tabsAdd: {
            name: '添加答案',
            value: 'answer',
            label: '答案',
            nextLabel: '请切换至 答案 进行下一步'
          },
          answer: {
            name: '答案',
            loading: false,
            columns: [
              {
                title: '答案内容',
                slot: 'answer'
              },
              {
                title: '是否正确',
                key: 'solu',
                slot: 'solu',
                width: 120
              },
              {
                title: '得分',
                key: 'score',
                width: 120
              },
              {
                title: '最近修改',
                key: 'lately_time',
                slot: 'lately_time',
                width: 120
              },
              {
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'right'
              }
            ],
            pagination: {
              items: [],
              index: 1,
              pageSize: dev.HTTP.pageSize,
              pageSizeOpts: [
                dev.HTTP.pageSize,
                dev.HTTP.pageSize * 10,
                dev.HTTP.pageSize * 20,
                dev.HTTP.pageSize * 40,
                dev.HTTP.pageSize * 80
              ],
              count: 1,
              next: null,
              previous: null
            },
            froms: {
              title: '编辑',
              model: false,
              index: null,
              formValidate: {
                id: null,
                score: null,
                solu: null,
                choice_gid: null,
                choice: null,
                judge: null,
                answer: null,
                machine: null,
                key_question: this.topic.id
              },
              ruleValidate: {
                score: [
                  { required: true, message: '请正确填写得分' }
                ],
                solu: [
                  { required: true, message: '请正确选择类型' }
                ],
                choice_gid: [
                  { required: false, message: '请正确选择书名分类' }
                ],
                choice: [
                  { required: false, message: '请正确选择模块分类' }
                ],
                judge: [
                  { required: false, message: '请正确选择章节分类' }
                ],
                answer: [
                  { required: false, message: '请正确上传题目配图' }
                ],
                machine: [
                  { required: false, message: '请正确上传题目配图' }
                ]
              }
            }
          }
        }
      }
    },
    created () {
      console.log(this.topic.id)
      this.initHttpAnswer()
    },
    components: {
      Card,
      Select,
      Option,
      Table,
      Time,
      Button,
      Page,
      Modal,
      Form,
      FormItem,
      Input,
      Tag,
      Breadcrumb,
      BreadcrumbItem,
      Checkbox,
      Alert
    },
    methods: {
      pageSizeChangeAnswer: function (page) {
        /**
         * 分页条数实现
         */
        this.tables.ques.pagination.pageSize = page
        this.initHttpQues()
      },
      pageChangeAnswer: function (index) {
        /**
         * 分页器实现
         */
        this.initHttpAnswer()
      },
      addExtraAnswer: function () {
        this.tables.answer.froms.model = true
        this.tables.answer.froms.title = '添加' + this.tables.tabsAdd.label
        this.tables.answer.froms.formValidate.id = null
        this.tables.answer.froms.formValidate.score = null
        this.tables.answer.froms.formValidate.solu = false
        this.tables.answer.froms.formValidate.choice_gid = null
        this.tables.answer.froms.formValidate.choice = null
        this.tables.answer.froms.formValidate.judge = null
        this.tables.answer.froms.formValidate.answer = null
        this.tables.answer.froms.formValidate.machine = null
        this.tables.answer.froms.index = null
      },
      editSaveAnswer: function () {
        /**
         * 题库修改保存
         */
        let methods = 'PATCH'
        let context = {
          score: this.tables.answer.froms.formValidate.score,
          solu: this.tables.answer.froms.formValidate.solu,
          key_question: this.tables.answer.froms.formValidate.key_question
        }
        if (!this.tables.answer.froms.formValidate.id) methods = 'POST'
        if (this.tables.answer.froms.formValidate.choice) {
          context['choice'] = this.tables.answer.froms.formValidate.choice
          context['choice_gid'] = this.tables.answer.froms.formValidate.choice_gid
        }
        if (this.tables.answer.froms.formValidate.judge) context['judge'] = this.tables.answer.froms.formValidate.judge
        if (this.tables.answer.froms.formValidate.answer) context['answer'] = this.tables.answer.froms.formValidate.answer
        if (this.tables.answer.froms.formValidate.machine) context['machine'] = this.tables.answer.froms.formValidate.machine

        this.initHttpAnswer(methods, context, this.tables.answer.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.answer.pagination.items[this.tables.answer.froms.index].score = response.data.score
            this.tables.answer.pagination.items[this.tables.answer.froms.index].solu = response.data.solu
            this.tables.answer.pagination.items[this.tables.answer.froms.index].choice_gid = response.data.choice_gid
            this.tables.answer.pagination.items[this.tables.answer.froms.index].choice = response.data.choice
            this.tables.answer.pagination.items[this.tables.answer.froms.index].judge = response.data.judge
            this.tables.answer.pagination.items[this.tables.answer.froms.index].answer = response.data.answer
            this.tables.answer.pagination.items[this.tables.answer.froms.index].machine = response.data.machine
          } else {
            this.tables.answer.pagination.items.unshift(response.data)
          }
        }).finally()
      },
      editAnswer: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.tables.answer.froms.index = index
        this.tables.answer.froms.model = true
        this.tables.answer.froms.title = '编辑' + this.tables.tabsAdd.label
        this.tables.answer.froms.formValidate.id = row.id
        this.tables.answer.froms.formValidate.score = row.score
        this.tables.answer.froms.formValidate.solu = row.solu
        this.tables.answer.froms.formValidate.choice_gid = row.choice_gid
        this.tables.answer.froms.formValidate.choice = row.choice
        this.tables.answer.froms.formValidate.judge = row.judge
        this.tables.answer.froms.formValidate.answer = row.answer
        this.tables.answer.froms.formValidate.machine = row.machine
      },
      /**
       * 删除题库索引
       * @param row
       * @param index
       * @constructor
       */
      HttpAnswerDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>将会删除此条数据</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpAnswer('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.answer.pagination.items.splice(index, 1)
            }).finally(finallys => {
              Modal.remove()
            }).catch(catchs => {
              Message.error('删除失败')
            })
          }
        })
      },
      getChoice: function (val) {
        return this.choice[val]
      },
      initHttpAnswer: function (methods = 'GET', data = { key_question: this.topic.id }, index = null) {
        /**
         * 书名分类
         */
        this.tables.answer.loading = true

        return new Promise((resolve, reject) => {
          axios.questionAnswer(
            methods,
            data,
            index,
            this.tables.answer.pagination
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              console.log(response.data.results)
              this.tables.answer.pagination.items = response.data.results
              this.tables.answer.pagination.count = response.data.count
              this.tables.answer.pagination.next = response.data.next
              this.tables.answer.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.answer.loading = false
            return resolve(finallys)
          })
        })
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>