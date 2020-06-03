<template>
    <Row :gutter="16">
        <Col>
            <Alert show-icon style="margin-bottom: 15px;">
                提示
                <template slot="desc">
                    分类依次添加顺序为：
                    <!--                    [选择题|判断题|简答题|机试题] -> 答案-->
                    <p style="color: #808695">书名分类 -> 模块分类 -> 章节分类 -> 题库管理</p>
                </template>
            </Alert>
        </Col>
        <Col>
            <Card dis-hover>
                <p slot="title">分类设置</p>
                <Tooltip slot="extra" placement="bottom-end">
                    <Button size="small" @click="addExtraClass">{{tables.tabsAdd.name}}</Button>
                    <div slot="content">
                        <p>如果以添加 {{tables.tabsAdd.label}}</p>
                        <p>{{tables.tabsAdd.nextLabel}}</p>
                    </div>
                </Tooltip>
                <Tabs :value="tables.tabsAdd.value" @on-click="clickTabs">
                    <TabPane :label="tables.book.name" name="book">
                        <Table ref="selection"
                               :loading="tables.book.loading"
                               :columns="tables.book.columns"
                               :data="tables.book.pagination.items">
                            <template slot="image" slot-scope="{ row, index }">
                                <div class="image-img">
                                    <img :src="row.image" alt="">
                                </div>
                            </template>
                            <template slot="lately_time" slot-scope="{ row, index }">
                                <Time :time="row.lately_time"></Time>
                            </template>
                            <template slot="add_time" slot-scope="{ row, index }">
                                <Time :time="row.add_time"></Time>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small"
                                        @click="editBook(row, index)"
                                        style="margin-right: 5px">编辑
                                </Button>
                                <Button type="error" size="small" @click="HttpBookDelete(row.id, index)">删除
                                </Button>
                            </template>
                        </Table>
                        <Card :bordered="false" dis-hover style="float: right">
                            <Page :total="tables.book.pagination.count"
                                  :current.sync="tables.book.pagination.index"
                                  :page-size="tables.book.pagination.pageSize"
                                  :page-size-opts="tables.book.pagination.pageSizeOpts"
                                  @on-change="pageChangeBook"
                                  @on-page-size-change="pageSizeChangeBook"
                                  transfer
                                  size="small" show-elevator
                                  show-sizer show-total/>
                        </Card>
                        <Modal v-model="tables.book.froms.model" draggable scrollable :title="tables.book.froms.title"
                               @on-ok="editSaveBook">
                            <Form ref="formValidate"
                                  :model="tables.book.froms.formValidate"
                                  :rules="tables.book.froms.ruleValidate"
                                  :label-width="80">
                                <FormItem label="名称" prop="name">
                                    <Input v-model="tables.book.froms.formValidate.name"
                                           placeholder="书名分类名称"></Input>
                                </FormItem>

                                <FormItem label="封面" prop="image">
                                    <Upload v-if="!tables.book.froms.formValidate.image"
                                            :before-upload="handleUpload"
                                            :format="['jpg','jpeg','png']"
                                            :max-size="4096"
                                            action="//jsonplaceholder.typicode.com/posts/">
                                        <Button icon="ios-cloud-upload-outline">Upload [4MB大小]</Button>
                                    </Upload>
                                    <div v-else>
                                        {{ tables.book.froms.formValidate.image.name }}
                                    </div>
                                </FormItem>
                            </Form>
                        </Modal>
                    </TabPane>

                    <TabPane :label="tables.model.name" name="model">
                        <Table ref="selection" :loading="tables.model.loading" :columns="tables.model.columns"
                               :data="tables.model.pagination.items">
                            <template slot="image" slot-scope="{ row, index }">
                                <div class="image-img">
                                    <img :src="row.image" alt="">
                                </div>
                            </template>
                            <template slot="lately_time" slot-scope="{ row, index }">
                                <Time :time="row.lately_time"></Time>
                            </template>
                            <template slot="add_time" slot-scope="{ row, index }">
                                <Time :time="row.add_time"></Time>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small"
                                        @click="editModel(row, index)"
                                        style="margin-right: 5px">编辑
                                </Button>
                                <Button type="error" size="small" @click="HttpModelDelete(row.id, index)">删除
                                </Button>
                            </template>
                        </Table>
                        <Card :bordered="false" dis-hover style="float: right">
                            <Page :total="tables.model.pagination.count"
                                  :current.sync="tables.model.pagination.index"
                                  :page-size="tables.model.pagination.pageSize"
                                  :page-size-opts="tables.model.pagination.pageSizeOpts"
                                  @on-change="pageChangeModel"
                                  @on-page-size-change="pageSizeChangeModel"
                                  transfer
                                  size="small" show-elevator
                                  show-sizer show-total/>
                        </Card>
                        <Modal v-model="tables.model.froms.model" draggable scrollable :title="tables.model.froms.title"
                               @on-ok="editSaveModel">
                            <Form ref="formValidateModel"
                                  :model="tables.model.froms.formValidate"
                                  :rules="tables.model.froms.ruleValidate"
                                  :label-width="80">
                                <FormItem label="名称" prop="name">
                                    <Input v-model="tables.model.froms.formValidate.name"
                                           placeholder="模块分类名称"></Input>
                                </FormItem>

                                <FormItem label="书名" prop="key_class_question">
                                    <Select v-model="tables.model.froms.formValidate.key_class_question"
                                            placeholder="Select your city">
                                        <Option v-for="(item, key) in tables.book.pagination.items" :key="key"
                                                :value="item.id">
                                            {{ item.name }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Modal>
                    </TabPane>

                    <TabPane :label="tables.chapter.name" name="chapter">
                        <Table ref="selection" :loading="tables.chapter.loading" :columns="tables.chapter.columns"
                               :data="tables.chapter.pagination.items">
                            <template slot="image" slot-scope="{ row, index }"></template>
                            <template slot="lately_time" slot-scope="{ row, index }">
                                <Time :time="row.lately_time"></Time>
                            </template>
                            <template slot="add_time" slot-scope="{ row, index }">
                                <Time :time="row.add_time"></Time>
                            </template>
                            <template slot-scope="{ row, index }" slot="action">
                                <Button type="primary" size="small"
                                        @click="editChapter(row, index)"
                                        style="margin-right: 5px">编辑
                                </Button>
                                <Button type="error" size="small" @click="HttpChapterDelete(row.id, index)">删除
                                </Button>
                            </template>
                        </Table>
                        <Card :bordered="false" dis-hover style="float: right">
                            <Page :total="tables.chapter.pagination.count"
                                  :current.sync="tables.chapter.pagination.index"
                                  :page-size="tables.chapter.pagination.pageSize"
                                  :page-size-opts="tables.chapter.pagination.pageSizeOpts"
                                  @on-change="pageChangeChapter"
                                  @on-page-size-change="pageSizeChangeChapter"
                                  transfer
                                  size="small" show-elevator
                                  show-sizer show-total/>
                        </Card>
                        <Modal v-model="tables.chapter.froms.model" draggable scrollable
                               :title="tables.chapter.froms.title"
                               @on-ok="editSaveChapter">
                            <Form ref="formValidateModel"
                                  :model="tables.chapter.froms.formValidate"
                                  :rules="tables.chapter.froms.ruleValidate"
                                  :label-width="80">
                                <FormItem label="名称" prop="name">
                                    <Input v-model="tables.chapter.froms.formValidate.name"
                                           placeholder="模块分类名称"></Input>
                                </FormItem>

                                <FormItem label="书名" prop="key_class_question">
                                    <Select v-model="tables.chapter.froms.formValidate.key_class_ques_model"
                                            placeholder="Select your city">
                                        <Option v-for="(item, key) in tables.model.pagination.items" :key="key"
                                                :value="item.id">
                                            {{ item.name }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Modal>
                    </TabPane>
                </Tabs>
            </Card>
        </Col>
    </Row>
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
  import axios from '../../../axios/index'
  import dev from '../../../../dev.env'

  export default {
    name: 'question',
    data () {
      return {
        tables: {
          tabsAdd: {
            name: '添加书名分类',
            value: 'book',
            label: '书名分类',
            nextLabel: '请切换至 模块分类 进行下一步'
          },
          book: {
            name: '书名分类',
            loading: true,
            columns: [
              {
                title: 'ID',
                key: 'id',
                width: 60
              },
              {
                title: '封面',
                key: 'image',
                slot: 'image',
                width: 80
              },
              {
                title: '书名名称',
                key: 'name'
              },
              {
                title: '学习人数',
                key: 'count'
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
                image: null
              },
              ruleValidate: {
                name: [
                  { required: true, message: '请正确填写书名分类名称', trigger: 'blur' }
                ],
                image: [
                  { required: false, message: '请正确上传封面图', trigger: 'blur' }
                ]
              }
            }
          },
          model: {
            name: '模块分类',
            loading: true,
            columns: [
              {
                title: 'ID',
                key: 'id',
                width: 60
              },
              {
                title: '模块名称',
                key: 'name'
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
                key_class_question: null,
                class_question: {
                  id: null,
                  name: null
                }
              },
              ruleValidate: {
                name: [
                  { required: true, message: '请正确填写模块分类名称', trigger: 'blur' }
                ],
                key_class_question: [
                  { required: true, message: '请选择书名分类选项' }
                ]
              }
            }
          },
          chapter: {
            name: '章节分类',
            loading: true,
            columns: [
              {
                title: 'ID',
                key: 'id',
                width: 60
              },
              {
                title: '章节名称',
                key: 'name'
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
                key_class_ques_model: null,
                class_ques_model: {
                  id: null,
                  name: null
                }
              },
              ruleValidate: {
                name: [
                  { required: true, message: '请正确填写章节分类名称', trigger: 'blur' }
                ],
                key_class_ques_model: [
                  { required: true, message: '请正确填写模块分类名称' }
                ]
              }
            }
          }
        },
        cityList: [
          {
            label: '书名分类',
            value: 1
          },
          {
            label: '模块分类',
            value: 2
          },
          {
            label: '章节分类',
            value: 3
          }
        ]
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
          name: '分类设置',
          toRouter: {
            name: 'admin_ques'
          }
        }
      ])
      this.initHttpBook()
      this.initHttpModel()
      this.initHttpChapter()
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
    methods: {
      addExtraClass: function () {
        this.tables[this.tables.tabsAdd.value].froms.model = true
        this.tables[this.tables.tabsAdd.value].froms.title = '添加' + this.tables.tabsAdd.label
        this.tables[this.tables.tabsAdd.value].froms.formValidate.id = null
        this.tables[this.tables.tabsAdd.value].froms.index = null

        if (this.tables.tabsAdd.value === 'book') {
          this.tables[this.tables.tabsAdd.value].froms.model = true
          this.tables[this.tables.tabsAdd.value].froms.title = '添加' + this.tables.tabsAdd.label
        }
        if (this.tables.tabsAdd.value === 'model') {
          console.log(this.tables.tabsAdd.value)
          console.log(this.tables.tabsAdd.label)
        }
        if (this.tables.tabsAdd.value === 'chapter') {
          console.log(this.tables.tabsAdd.value)
          console.log(this.tables.tabsAdd.label)
        }

      },

      editSaveBook () {
        /**
         * 修改书名分类保存
         */
        let methods = 'PATCH'
        let context = {
          name: this.tables.book.froms.formValidate.name
        }
        if (!this.tables.book.froms.formValidate.id) methods = 'POST'
        if (this.tables.book.froms.formValidate.image) context['image'] = this.tables.book.froms.formValidate.image

        this.initHttpBook(methods, context, this.tables.book.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.book.pagination.items[this.tables.book.froms.index].name = response.data.name
            this.tables.book.pagination.items[this.tables.book.froms.index].image = response.data.image
          } else {
            this.tables.book.pagination.items.unshift(response.data)
          }
        }).finally()
      },
      editSaveModel () {
        /**
         * 修改模块分类保存
         */
        let methods = 'PATCH'
        let context = {
          name: this.tables.model.froms.formValidate.name,
          key_class_question: this.tables.model.froms.formValidate.key_class_question
        }
        if (!this.tables.model.froms.formValidate.id) methods = 'POST'

        this.initHttpModel(methods, context, this.tables.model.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.model.pagination.items[this.tables.model.froms.index].name = response.data.name
            this.tables.model.pagination.items[this.tables.model.froms.index].key_class_question = response.data.key_class_question
            this.tables.model.pagination.items[this.tables.model.froms.index].class_question = response.data.class_question
          } else {
            this.tables.model.pagination.items.unshift(response.data)
          }
        }).finally()
      },
      editSaveChapter () {
        /**
         * 修改章节分类保存
         */
        let methods = 'PATCH'
        let context = {
          name: this.tables.chapter.froms.formValidate.name,
          key_class_ques_model: this.tables.chapter.froms.formValidate.key_class_ques_model
        }
        if (!this.tables.chapter.froms.formValidate.id) methods = 'POST'

        this.initHttpChapter(methods, context, this.tables.chapter.froms.formValidate.id).then(response => {
          if (methods !== 'POST') {
            this.tables.chapter.pagination.items[this.tables.chapter.froms.index].name = response.data.name
            this.tables.chapter.pagination.items[this.tables.chapter.froms.index].key_class_ques_model = response.data.key_class_ques_model
            this.tables.chapter.pagination.items[this.tables.chapter.froms.index].class_ques_model = response.data.class_ques_model
          } else {
            this.tables.chapter.pagination.items.unshift(response.data)
          }
        }).finally()
      },

      handleUpload: function (file) {
        this.tables.book.froms.formValidate.image = file
        console.log(this.tables.book.froms.formValidate.image)
        return false
      },

      editBook: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.tables.book.froms.index = index
        this.tables.book.froms.model = true
        this.tables.book.froms.title = '编辑' + this.tables.tabsAdd.label
        this.tables.book.froms.formValidate.id = row.id
        this.tables.book.froms.formValidate.name = row.name
      },
      editModel: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.tables.model.froms.index = index
        this.tables.model.froms.model = true
        this.tables.model.froms.title = '编辑' + this.tables.tabsAdd.label
        this.tables.model.froms.formValidate.id = row.id
        this.tables.model.froms.formValidate.name = row.name
        this.tables.model.froms.formValidate.class_question = row.class_question
        this.tables.model.froms.formValidate.key_class_question = row.key_class_question
      },
      editChapter: function (row, index) {
        /**
         * 编辑书名分类索引
         */
        this.tables.chapter.froms.index = index
        this.tables.chapter.froms.model = true
        this.tables.chapter.froms.title = '编辑' + this.tables.tabsAdd.label
        this.tables.chapter.froms.formValidate.id = row.id
        this.tables.chapter.froms.formValidate.name = row.name

        this.tables.chapter.froms.formValidate.key_class_ques_model = row.key_class_ques_model
        this.tables.chapter.froms.formValidate.class_ques_model = row.class_ques_model
      },

      /**
       * 删除书名分类索引
       * @param row
       * @param index
       * @constructor
       */
      HttpBookDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除会触发联级删除哦，不可撤销！</p><p>同时删除以下条目所关联数据：</p>  <div style="color: #ed4014;"><li>书名分类</li><li>模块分类</li><li>章节分类</li><li>选择题|判断题|简答题|机试题</li><li>答案</li></div><br><p>如没有必要，建议逐个删除！！！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpBook('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.book.pagination.items.splice(index, 1)
              this.initHttpModel()
              this.initHttpChapter()
            }).finally(finallys => {
              Modal.remove()
            }).catch(catchs => {
              Message.error('删除失败')
            })
          }
        })
      },
      /**
       * 删除模块分类索引
       * @param row
       * @param index
       * @constructor
       */
      HttpModelDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除会触发联级删除哦，不可撤销！</p><p>同时删除以下条目所关联数据：</p>  <div style="color: #ed4014;"><li>模块分类</li><li>章节分类</li><li>选择题|判断题|简答题|机试题</li><li>答案</li></div><br><p>如没有必要，建议逐个删除！！！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpModel('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.model.pagination.items.splice(index, 1)
              this.initHttpCheditModelapter()
            }).finally(finallys => {
              Modal.remove()
            }).catch(catchs => {
              Message.error('删除失败')
            })
          }
        })
      },
      /**
       * 删除章节分类索引
       * @param row
       * @param index
       * @constructor
       */
      HttpChapterDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除会触发联级删除哦，不可撤销！</p><p>同时删除以下条目所关联数据：</p>  <div style="color: #ed4014;"><li>章节分类</li><li>选择题|判断题|简答题|机试题</li><li>答案</li></div><br><p>如没有必要，建议逐个删除！！！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpChapter('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.chapter.pagination.items.splice(index, 1)
            }).finally(finallys => {
              Modal.remove()
            }).catch(catchs => {
              Message.error('删除失败')
            })
          }
        })
      },

      pageChangeBook: function (index) {
        /**
         * 分页器实现
         */
        this.initHttpBook()
      },
      pageSizeChangeBook: function (page) {
        /**
         * 分页条数实现
         */
        this.tables.book.pagination.pageSize = page
        this.initHttpBook()
      },
      pageChangeModel: function (index) {
        /**
         * 分页器实现
         */
        this.tables.model.pagination.index = index
        this.initHttpModel()
      },
      pageSizeChangeModel: function (page) {
        /**
         * 分页条数实现
         */
        this.tables.model.pagination.pageSize = page
        this.initHttpModel()
      },
      pageChangeChapter: function (index) {
        /**
         * 分页器实现
         */
        this.tables.chapter.pagination.index = index
        this.initHttpChapter()
      },
      pageSizeChangeChapter: function (page) {
        /**
         * 分页条数实现
         */
        this.tables.chapter.pagination.pageSize = page
        this.initHttpChapter()
      },

      initHttpBook: function (methods = 'GET', data = {}, index = null) {
        /**
         * 书名分类
         */
        this.tables.book.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestion(
            methods,
            data,
            index,
            this.tables.book.pagination
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.book.pagination.items = response.data.results
              this.tables.book.pagination.count = response.data.count
              this.tables.book.pagination.next = response.data.next
              this.tables.book.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.book.loading = false
            return resolve(finallys)
          })
        })
      },
      initHttpModel: function (methods = 'GET', data = {}, index = null) {
        /**
         * 模块分类
         */
        this.tables.model.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestionModel(
            methods,
            data,
            index,
            this.tables.book.pagination
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.model.pagination.items = response.data.results
              this.tables.model.pagination.count = response.data.count
              this.tables.model.pagination.next = response.data.next
              this.tables.model.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.model.loading = false
            return resolve(finallys)
          })
        })
      },
      initHttpChapter: function (methods = 'GET', data = {}, index = null) {
        /**
         * 章节分类
         */
        this.tables.chapter.loading = true

        return new Promise((resolve, reject) => {
          axios.classQuestionChapter(
            methods,
            data,
            index,
            this.tables.book.pagination
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.chapter.pagination.items = response.data.results
              this.tables.chapter.pagination.count = response.data.count
              this.tables.chapter.pagination.next = response.data.next
              this.tables.chapter.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.chapter.loading = false
            return resolve(finallys)
          })
        })
      },

      clickTabs: function (name) {
        /**
         * 添加分类按钮
         * 改变属性
         */
        if (name === 'book') {
          this.tables.tabsAdd.value = 'book'
          this.tables.tabsAdd.name = '添加书名分类'
          this.tables.tabsAdd.label = this.tables.book.name
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
    .image-img img {
        width: 54px;
        height: 36px;
        object-fit: cover;
    }
</style>