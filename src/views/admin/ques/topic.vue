<template>
    <div>
        <Card dis-hover>
            <p slot="title">题库管理</p>
            <Tooltip slot="extra" placement="bottom-end">
                <Button size="small" @click="addExtraClass">{{tables.tabsAdd.name}}</Button>
                <div slot="content">
                    <p>如果以添加 {{tables.tabsAdd.label}}</p>
                    <p>{{tables.tabsAdd.nextLabel}}</p>
                </div>
            </Tooltip>
            <Alert show-icon v-if="tables.ques.pagination.items.length > 0">
                数据条目可以展开哦，请展开条目添加题目答案吧！
            </Alert>

            <Table ref="selection"
                   :loading="tables.ques.loading"
                   :columns="tables.ques.columns"
                   :data="tables.ques.pagination.items">
                <template slot="state" slot-scope="{ row, index }">
                    <div>
                        <p v-if="row.state === 0">选择题</p>
                        <p v-if="row.state === 1">判断题</p>
                        <p v-if="row.state === 2">简答题</p>
                        <p v-if="row.state === 3">机试题</p>
                    </div>
                </template>
                <template slot="class_question" slot-scope="{ row, index }">
                    {{ row.class_question.name }}
                </template>
                <template slot="class_ques_model" slot-scope="{ row, index }">
                    {{ row.class_ques_model.name }}
                </template>
                <template slot="class_ques_chapter" slot-scope="{ row, index }">
                    {{ row.class_ques_chapter.name }}
                </template>
                <template slot="lately_time" slot-scope="{ row, index }">
                    <Time :time="row.lately_time"></Time>
                </template>
                <template slot="add_time" slot-scope="{ row, index }">
                    <Time :time="row.add_time"></Time>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small"
                            @click="editQues(row, index)"
                            style="margin-right: 5px">编辑
                    </Button>
                    <Button type="error" size="small" @click="HttpQuesDelete(row.id, index)">删除
                    </Button>
                </template>
            </Table>
            <Card :bordered="false" dis-hover>
                <Page :total="tables.ques.pagination.count"
                      :current.sync="tables.ques.pagination.index"
                      :page-size="tables.ques.pagination.pageSize"
                      :page-size-opts="tables.ques.pagination.pageSizeOpts"
                      @on-change="pageChangeQues"
                      @on-page-size-change="pageSizeChangeQues"
                      transfer
                      size="small" show-elevator
                      show-sizer show-total/>
            </Card>
            <Modal v-model="tables.ques.froms.model" draggable scrollable :title="tables.ques.froms.title"
                   @on-ok="editSaveQues">
                <Form ref="formValidate"
                      :model="tables.ques.froms.formValidate"
                      :rules="tables.ques.froms.ruleValidate"
                      :label-width="80">
                    <FormItem label="名称" prop="name">
                        <Input v-model="tables.ques.froms.formValidate.name"
                               placeholder="题目名称"></Input>
                    </FormItem>
                    <FormItem label="内容" prop="text">
                        <Input v-model="tables.ques.froms.formValidate.text"
                               type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="题目描述"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="state">
                        <Select v-model="tables.ques.froms.formValidate.state" placeholder="请选择题目类型">
                            <Option :value="0">选择题</Option>
                            <Option :value="1">判断题</Option>
                            <Option :value="2">简答题</Option>
                            <Option :value="3">机试题</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="素材配图" prop="image">
                        <Upload v-if="!tables.ques.froms.formValidate.image"
                                :before-upload="handleUpload"
                                :format="['jpg','jpeg','png']"
                                :max-size="4096"
                                action="//jsonplaceholder.typicode.com/posts/">
                            <Button icon="ios-cloud-upload-outline">Upload [4MB大小]</Button>
                        </Upload>
                        <div v-else>
                            {{ tables.ques.froms.formValidate.image.name }}
                        </div>
                    </FormItem>
                    <FormItem label="书名分类" prop="key_class_question">
                        <Select v-model="tables.ques.froms.formValidate.key_class_question"
                                placeholder="请选择">
                            <Option v-for="(item, key) in tables.ques.froms.class_question_select" :key="key"
                                    :value="item.id">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="模块分类" prop="key_class_ques_model"
                              v-if="tables.ques.froms.formValidate.key_class_question">
                        <Select v-model="tables.ques.froms.formValidate.key_class_ques_model"
                                placeholder="请选择">
                            <Option v-for="(item, key) in tables.ques.froms.class_ques_model_select" :key="key"
                                    :value="item.id">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="模块分类" prop="key_class_ques_model" v-else>
                        <Select placeholder="书名分类未选择" disabled></Select>
                    </FormItem>
                    <FormItem label="章节分类" prop="key_class_ques_chapter"
                              v-if="tables.ques.froms.formValidate.key_class_ques_model">
                        <Select v-model="tables.ques.froms.formValidate.key_class_ques_chapter"
                                placeholder="请选择">
                            <Option v-for="(item, key) in tables.ques.froms.class_ques_chapter_select"
                                    :key="key"
                                    :value="item.id">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="章节分类" prop="key_class_ques_chapter" v-else>
                        <Select placeholder="模块分类未选择" disabled></Select>
                    </FormItem>
                </Form>
            </Modal>
        </Card>
    </div>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Select,
    Option,
    Table,
    Tabs,
    TabPane,
    Time,
    Button,
    Alert,
    Tooltip,
    Page,
    Modal,
    Message,
    Form,
    FormItem,
    Input,
    Upload,
    Icon
  } from 'view-design'
  import expandRow from './topic-table-expand'
  import axios from '../../../axios/index'
  import dev from '../../../../dev.env'

  export default {
    name: 'topic',
    data () {
      return {
        tables: {
          tabsAdd: {
            name: '添加题目',
            value: 'ques',
            label: '题目',
            nextLabel: '请切换至 模块分类 进行下一步'
          },
          ques: {
            name: '题目',
            loading: false,
            columns: [
              {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                  return h(expandRow, {
                    props: {
                      topic: params.row
                    }
                  })
                }
              },
              {
                title: 'ID',
                key: 'id',
                width: 60
              },
              {
                title: '题目描述',
                key: 'text'
              },
              {
                title: '类型',
                key: 'state',
                slot: 'state',
                width: 150
              },
              {
                title: '书名分类',
                key: 'class_question',
                slot: 'class_question'
              },
              {
                title: '模块分类',
                key: 'class_ques_model',
                slot: 'class_ques_model'
              },
              {
                title: '章节分类',
                key: 'class_ques_chapter',
                slot: 'class_ques_chapter'
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
                name: null,
                text: null,
                state: null,
                image: null,
                key_class_question: null,
                key_class_ques_model: null,
                key_class_ques_chapter: null
              },
              class_question_select: [],
              class_ques_model_select: [],
              class_ques_chapter_select: [],
              ruleValidate: {
                name: [
                  { required: false, message: '请正确填写题目名称' }
                ],
                text: [
                  { required: true, message: '请正确填写题目描述' }
                ],
                state: [
                  { required: true, message: '请正确选择类型' }
                ],
                key_class_question: [
                  { required: true, message: '请正确选择书名分类' }
                ],
                key_class_ques_model: [
                  { required: true, message: '请正确选择模块分类' }
                ],
                key_class_ques_chapter: [
                  { required: true, message: '请正确选择章节分类' }
                ],
                image: [
                  { required: false, message: '请正确上传题目配图' }
                ]
              }
            }
          },
          answer: {
            name: '答案',
            loading: false,
            columns: [
              {
                title: 'ID',
                key: 'id',
                width: 60
              },
              {
                title: '答案内容',
                slot: 'answer'
              },
              {
                title: '是否正确',
                key: 'solu',
                slot: 'solu'
              },
              {
                title: '得分',
                key: 'score',
                width: 150
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
                name: null,
                text: null,
                state: null,
                image: null,
                key_class_question: null,
                key_class_ques_model: null,
                key_class_ques_chapter: null
              },
              class_question_select: [],
              class_ques_model_select: [],
              class_ques_chapter_select: [],
              ruleValidate: {
                name: [
                  { required: false, message: '请正确填写题目名称' }
                ],
                text: [
                  { required: true, message: '请正确填写题目描述' }
                ],
                state: [
                  { required: true, message: '请正确选择类型' }
                ],
                key_class_question: [
                  { required: true, message: '请正确选择书名分类' }
                ],
                key_class_ques_model: [
                  { required: true, message: '请正确选择模块分类' }
                ],
                key_class_ques_chapter: [
                  { required: true, message: '请正确选择章节分类' }
                ],
                image: [
                  { required: false, message: '请正确上传题目配图' }
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
          name: '题库',
          toRouter: {
            name: 'admin_ques'
          }
        },
        {
          name: '题库管理',
          toRouter: {
            name: 'admin_ques'
          }
        }
      ])
      this.initHttpQues()
      this.initHttpBook()
    },
    components: {
      Row,
      Col,
      Card,
      Select,
      Option,
      Table,
      Tabs,
      TabPane,
      Time,
      Button,
      Alert,
      Tooltip,
      Page,
      Modal,
      Form,
      FormItem,
      Input,
      Upload,
      Icon
    },
    computed: {
      classQuestions: function () {
        return this.tables.ques.froms.formValidate.key_class_question
      },
      classQuesModels: function () {
        return this.tables.ques.froms.formValidate.key_class_ques_model
      }
    },
    watch: {
      classQuestions: function (a, b) {
        this.initHttpModel('GET', {
          key_class_question: a
        })
      },
      classQuesModels: function (a, b) {
        this.initHttpChapter('GET', {
          key_class_ques_model: a
        })
      }
    },
    methods: {
      addExtraClass: function () {
        this.tables[this.tables.tabsAdd.value].froms.model = true
        this.tables[this.tables.tabsAdd.value].froms.title = '添加' + this.tables.tabsAdd.label
        this.tables[this.tables.tabsAdd.value].froms.formValidate.id = null
        this.tables[this.tables.tabsAdd.value].froms.index = null
      },

      editSaveQues () {
        /**
         * 题库修改保存
         */
        let methods = 'PATCH'
        let context = {
          name: this.tables.ques.froms.formValidate.name,
          text: this.tables.ques.froms.formValidate.text,
          state: this.tables.ques.froms.formValidate.state,
          key_class_question: this.tables.ques.froms.formValidate.key_class_question,
          key_class_ques_model: this.tables.ques.froms.formValidate.key_class_ques_model,
          key_class_ques_chapter: this.tables.ques.froms.formValidate.key_class_ques_chapter
        }
        if (!this.tables.ques.froms.formValidate.id) methods = 'POST'
        if (this.tables.ques.froms.formValidate.image) context['image'] = this.tables.ques.froms.formValidate.image

        this.initHttpQues(methods, context, this.tables.ques.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.ques.pagination.items[this.tables.ques.froms.index].name = response.data.name
            this.tables.ques.pagination.items[this.tables.ques.froms.index].image = response.data.image
          } else {
            this.tables.ques.pagination.items.unshift(response.data)
          }
        }).finally()
      },
      editSaveAnswer () {
        /**
         * 题库修改保存
         */
        let methods = 'PATCH'
        let context = {
          name: this.tables.ques.froms.formValidate.name,
          text: this.tables.ques.froms.formValidate.text,
          state: this.tables.ques.froms.formValidate.state,
          key_class_question: this.tables.ques.froms.formValidate.key_class_question,
          key_class_ques_model: this.tables.ques.froms.formValidate.key_class_ques_model,
          key_class_ques_chapter: this.tables.ques.froms.formValidate.key_class_ques_chapter
        }
        if (!this.tables.ques.froms.formValidate.id) methods = 'POST'
        if (this.tables.ques.froms.formValidate.image) context['image'] = this.tables.ques.froms.formValidate.image

        this.initHttpQues(methods, context, this.tables.ques.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.ques.pagination.items[this.tables.ques.froms.index].name = response.data.name
            this.tables.ques.pagination.items[this.tables.ques.froms.index].image = response.data.image
          } else {
            this.tables.ques.pagination.items.unshift(response.data)
          }
        }).finally()
      },

      handleUpload: function (file) {
        this.tables.ques.froms.formValidate.image = file
        console.log(this.tables.ques.froms.formValidate.image)
        return false
      },

      editQues: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.tables.ques.froms.index = index
        this.tables.ques.froms.model = true
        this.tables.ques.froms.title = '编辑' + this.tables.tabsAdd.label
        this.tables.ques.froms.formValidate = row
      },

      /**
       * 删除题库索引
       * @param row
       * @param index
       * @constructor
       */
      HttpQuesDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除会触发联级删除哦，不可撤销！</p><p>同时删除以下条目所关联数据：</p>  <div style="color: #ed4014;"><li>题目</li><li>答案</li></div><br><p>如没有必要，建议逐个删除！！！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpQues('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.ques.pagination.items.splice(index, 1)
            }).finally(finallys => {
              Modal.remove()
            }).catch(catchs => {
              Message.error('删除失败')
            })
          }
        })
      },

      pageChangeQues: function (index) {
        /**
         * 分页器实现
         */
        this.initHttpQues()
      },
      pageSizeChangeQues: function (page) {
        /**
         * 分页条数实现
         */
        this.tables.ques.pagination.pageSize = page
        this.initHttpQues()
      },

      initHttpQues: function (methods = 'GET', data = {}, index = null) {
        /**
         * 书名分类
         */
        this.tables.ques.loading = true

        return new Promise((resolve, reject) => {
          axios.questionQues(
            methods,
            data,
            index,
            this.tables.ques.pagination
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.ques.pagination.items = response.data.results
              this.tables.ques.pagination.count = response.data.count
              this.tables.ques.pagination.next = response.data.next
              this.tables.ques.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.ques.loading = false
            return resolve(finallys)
          })
        })
      },

      initHttpBook: function (methods = 'GET', data = {}, index = null) {
        /**
         * 书名分类
         */
        this.tables.ques.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestion(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.ques.froms.class_question_select = response.data.results
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.ques.loading = false
            return resolve(finallys)
          })
        })
      },
      initHttpModel: function (methods = 'GET', data = {}, index = null) {
        /**
         * 模块分类
         */
        this.tables.ques.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestionModel(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.ques.froms.class_ques_model_select = response.data.results
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.ques.loading = false
            return resolve(finallys)
          })
        })
      },
      initHttpChapter: function (methods = 'GET', data = {}, index = null) {
        /**
         * 章节分类
         */
        this.tables.ques.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestionChapter(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.ques.froms.class_ques_chapter_select = response.data.results
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.ques.loading = false
            return resolve(finallys)
          })
        })
      },

      clickTabs: function (name) {
        /**
         * 添加分类按钮
         * 改变属性
         */
        if (name === 'ques') {
          this.tables.tabsAdd.value = 'ques'
          this.tables.tabsAdd.name = '添加书名分类'
          this.tables.tabsAdd.label = this.tables.ques.name
          this.tables.tabsAdd.nextLabel = '请切换至 ' + this.tables.model.name + ' 进行下一步'
        }
        if (name === 'model') {
          this.tables.tabsAdd.value = 'model'
          this.tables.tabsAdd.name = '添加模块分类'
          this.tables.tabsAdd.label = this.tables.model.name
          this.tables.tabsAdd.nextLabel = '请切换至 ' + this.tables.chapter.name + ' 进行下一步'
        }
        if (name === 'chapter') {
          this.tables.tabsAdd.value = 'chapter'
          this.tables.tabsAdd.name = '添加章节分类'
          this.tables.tabsAdd.label = this.tables.chapter.name
          this.tables.tabsAdd.nextLabel = '请切换板块至 ' + '题库管理' + ' 进行下一步'
        }
      }
    }
  }
</script>

<style scoped>

</style>