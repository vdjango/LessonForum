<template>
    <div>
        <!--        记录当前班级学生学习进度-通过教师中心管理当前所属班级学习进度-->
        <!--        根据学习进度来把控 抓取的考题所属范围-->
        <!--        后期可以通过指定 抓取的考题所属范围: [书名分类-模块分类-章节分类]-->
        <Alert show-icon>合理设置学习进度，根据学习进度抓取 测试/考题 范围</Alert>

        <Row :gutter="16">
            <Col span="8">
                <Card dis-hover>
                    <p slot="title">在授班级</p>
                    <Button size="small" slot="extra" @click="tables.froms.model = true">添加</Button>
                    <Alert show-icon>管理 教师 所教授的班级</Alert>

                    <Table ref="selection" :loading="tables.loading" :columns="tables.columns"
                           :data="tables.pagination.items" highlight-row>
                        <template slot="school" slot-scope="{ row, index }">
                            {{row.school.name}}
                        </template>
                        <template slot="user_name" slot-scope="{ row, index }">
                            <p v-if="row.user_name.first_name !== null && row.user_name.first_name !== '' && row.user_name.first_name !== undefined">
                                {{row.user_name.first_name}}</p>
                            <p v-else>{{row.user_name.username}}</p>
                        </template>
                        <template slot="lately_time" slot-scope="{ row, index }">
                            <Time :time="row.lately_time"></Time>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small"
                                    @click="getExam(row, index)" style="margin-right: 5px">选择
                            </Button>
                            <Button type="error" size="small" @click="HttpExamDelete(row.id, index)">删除
                            </Button>
                        </template>
                    </Table>
                    <Card :bordered="false" dis-hover>
                        <Page :total="tables.pagination.count"
                              :current.sync="tables.pagination.index"
                              :page-size="tables.pagination.pageSize"
                              :page-size-opts="tables.pagination.pageSizeOpts"
                              @on-change="pageChange"
                              @on-page-size-change="pageSizeChange"
                              transfer
                              size="small" show-elevator
                              show-sizer show-total/>
                    </Card>

                    <Modal v-model="tables.froms.model" draggable scrollable
                           :title="tables.froms.title">
                        <Spin fix v-if="tables.froms.loading">
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>请等待，正在加载班级信息...</div>
                        </Spin>
                        <Form ref="formValidateModelExam"
                              :model="tables.froms.formValidate"
                              :rules="tables.froms.ruleValidate"
                              :label-width="80">

                            <FormItem label="班级" prop="school_info">
                                <Select v-model.number="tables.froms.formValidate.school_info"
                                        filterable
                                        remote
                                        :remote-method="remoteMethod"
                                        :loading="tables.froms.select_loading"
                                        placeholder="请搜索班级名称，支持模糊搜索">
                                    <Option v-for="(item, index) in tables.froms.options" :value.number="item.id"
                                            :key="index">{{item.name}}
                                    </Option>
                                </Select>
                            </FormItem>

                            <FormItem label="用户" prop="user">
                                <Select v-model.number="tables.froms.formValidate.user"
                                        filterable
                                        remote
                                        :remote-method="remoteMethodUser"
                                        :loading="tables.froms.user_loading"
                                        placeholder="请搜索教师用户，支持模糊搜索">
                                    <Option v-for="(item, index) in tables.froms.options_user" :value="item.id"
                                            :key="index">{{item.first_name}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <template slot="footer">
                            <Button type="primary" @click="addExam">添加</Button>
                        </template>
                    </Modal>
                </Card>
            </Col>
            <Col span="16">
                <Card dis-hover>
                    <div slot="title">授课进度
                        <Tag type="dot" color="primary" style="margin-left: 10px" v-if="this.tables.tag_name !== ''">{{
                            this.tables.tag_name }}
                        </Tag>
                    </div>
                    <Button size="small" slot="extra" :disabled="tables.school.loading"
                            @click="tables.school.froms.model=true">添加
                    </Button>
                    <Alert v-if="tables.school.loading" show-icon>管理 在授班级 所教授的课程进度</Alert>

                    <Table ref="selection" :loading="tables.school.loading" :columns="tables.school.columns"
                           :data="tables.school.pagination.items" highlight-row>
                        <template slot="loading">
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>{{tables.school.text}}</div>
                        </template>
                        <template slot="class_question" slot-scope="{ row, index }">
                            {{row.class_question.name}}
                        </template>
                        <template slot="lately_time" slot-scope="{ row, index }">
                            <Time :time="row.lately_time"></Time>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small"
                                    @click="getSchool(row, index)"
                                    style="margin-right: 5px">选择
                            </Button>
                            <Button type="error" size="small" @click="HttpSchoolDelete(row.id, index)">删除
                            </Button>
                        </template>
                    </Table>
                    <Card :bordered="false" dis-hover>
                        <Page :total="tables.school.pagination.count"
                              :current.sync="tables.school.pagination.index"
                              :page-size="tables.school.pagination.pageSize"
                              :page-size-opts="tables.school.pagination.pageSizeOpts"
                              @on-change="pageChangeSchool"
                              @on-page-size-change="pageSizeChangeSchool"
                              transfer
                              :disabled="tables.index === null"
                              size="small" show-elevator
                              show-sizer show-total/>
                    </Card>

                    <Modal v-model="tables.school.froms.model" draggable scrollable
                           :title="tables.school.froms.title">
                        <Spin fix v-if="tables.school.froms.loading">
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>请等待，正在加载班级信息...</div>
                        </Spin>
                        <Form ref="formValidateModelSchool"
                              :model="tables.school.froms.formValidate"
                              :rules="tables.school.froms.ruleValidate"
                              :label-width="80">
                            <FormItem label="课程" prop="key_class_question">
                                <Select v-model.number="tables.school.froms.formValidate.key_class_question"
                                        filterable
                                        remote
                                        :remote-method="remoteMethodSchool"
                                        :loading="tables.school.froms.select_loading"
                                        placeholder="请搜索课程名称，支持模糊搜索">
                                    <Option v-for="(item, index) in tables.school.froms.options" :value.number="item.id"
                                            :key="index">{{item.name}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <template slot="footer">
                            <Button type="primary" @click="addSchool">添加</Button>
                        </template>
                    </Modal>
                </Card>

            </Col>
            <Col span="24" style="margin-top: 15px">
                <Card dis-hover>
                    <div slot="title">章节进度
                        <Tag type="dot" color="primary" style="margin-left: 10px"
                             v-if="this.tables.school.tag_name !== ''">
                            {{ this.tables.school.tag_name }}
                        </Tag>
                    </div>
                    <Button size="small" slot="extra" :disabled="tables.chapter.loading"
                            @click="tables.chapter.froms.model = true">添加
                    </Button>
                    <Alert v-if="tables.chapter.loading" show-icon>管理 授课进度 所教授的章节进度</Alert>

                    <Table ref="selection" :loading="tables.chapter.loading" :columns="tables.chapter.columns"
                           :data="tables.chapter.pagination.items" highlight-row>
                        <template slot="loading">
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>{{tables.chapter.text}}</div>
                        </template>
                        <template slot="class_ques_chapter" slot-scope="{ row, index }">
                            {{row.class_ques_chapter.name}}
                        </template>
                        <template slot="status" slot-scope="{ row, index }">

                            <p v-if="row.status === 0">
                                <Tooltip content="当前章节计入抓取范围 测试/考题" placement="right">
                                    <Tag type="dot" color="success">已开启</Tag>
                                </Tooltip>
                            </p>
                            <p v-else>
                                <Tooltip content="当前章节不计入抓取范围 测试/考题" placement="right">
                                    <Tag type="dot" color="warning">已关闭</Tag>
                                </Tooltip>
                            </p>
                        </template>
                        <template slot="lately_time" slot-scope="{ row, index }">
                            <Time :time="row.lately_time"></Time>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="warning" size="small" v-if="row.status === 0"
                                    @click="setChapter(row, index, 1)" style="margin-right: 5px">关闭抓题
                            </Button>
                            <Button type="success" size="small" v-else
                                    @click="setChapter(row, index, 0)" style="margin-right: 5px">开启抓题
                            </Button>
                            <Button type="error" size="small" @click="HttpChapterDelete(row.id, index)">删除
                            </Button>
                            <!--                            <Button type="error" size="small" @click="HttpChapterDelete(row.id, index)">删除</Button>-->
                        </template>
                    </Table>
                    <Card :bordered="false" dis-hover>
                        <Page :total="tables.chapter.pagination.count"
                              :current.sync="tables.chapter.pagination.index"
                              :page-size="tables.chapter.pagination.pageSize"
                              :page-size-opts="tables.chapter.pagination.pageSizeOpts"
                              @on-change="pageChangeChapter"
                              @on-page-size-change="pageSizeChangeChapter"
                              transfer
                              :disabled="tables.chapter.index === null"
                              size="small" show-elevator
                              show-sizer show-total/>
                    </Card>

                    <Modal v-model="tables.chapter.froms.model" draggable scrollable
                           :title="tables.chapter.froms.title">
                        <Spin fix v-if="tables.chapter.froms.loading">
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>请等待，正在加载班级信息...</div>
                        </Spin>
                        <Form ref="formValidateModelChapter"
                              :model="tables.chapter.froms.formValidate"
                              :rules="tables.chapter.froms.ruleValidate"
                              :label-width="80">
                            <FormItem label="章节" prop="key_class_ques_chapter">
                                <Select v-model.number="tables.chapter.froms.formValidate.key_class_ques_chapter"
                                        filterable
                                        remote
                                        :remote-method="remoteMethodChapter"
                                        :loading="tables.chapter.froms.select_loading"
                                        placeholder="请搜索章节名称，支持模糊搜索">
                                    <Option v-for="(item, index) in tables.chapter.froms.options"
                                            :value.number="item.id"
                                            :key="index">{{item.name}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="抓题" prop="status">
                                <i-switch v-model.number="tables.chapter.froms.formValidate.status"
                                          :true-value="0" :false-value="1">
                                    <span slot="open">开</span>
                                    <span slot="close">关</span>
                                </i-switch>
                            </FormItem>
                        </Form>
                        <template slot="footer">
                            <Button type="primary" @click="addChapter">添加</Button>
                        </template>
                    </Modal>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Button,
    Alert,
    Table,
    Time,
    Modal,
    Message,
    Page,
    Icon,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Spin,
    Tooltip,
    Tag,
    Switch
  } from 'view-design'
  import axios from '../../../axios/index'
  import dev from '../../../../dev.env'

  export default {
    name: 'learning',
    data () {
      return {
        tables: {
          index: null,
          value: 'exam',
          name: '添加',
          tag_name: '',
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
          loading: true,
          columns: [
            {
              title: '班级',
              key: 'school',
              slot: 'school'
            },
            {
              title: '教师',
              key: 'user_name',
              slot: 'user_name'
            },
            {
              title: '最近修改',
              key: 'lately_time',
              slot: 'lately_time',
              width: 150
            },
            {
              title: '操作',
              slot: 'action',
              width: 150,
              align: 'right'
            }
          ],
          froms: {
            title: '添加 在授班级',
            model: false,
            index: null,
            loading: true,
            model_loading: false,
            select_loading: false, // Select
            user_loading: false, // Select
            options: [],
            options_user: [],
            formValidate: {
              id: null,
              school_info: null,
              user: null
            },
            ruleValidate: {
              school_info: [
                { required: true, message: '请正确填写班级名称' }
              ],
              user: [
                { required: true, message: '请正确填写教师名称' }
              ]
            }
          },
          school: {
            index: null,
            text: '选择 在授班级 后，为您展示本页数据...',
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
            loading: true,
            columns: [
              {
                title: '课程',
                key: 'class_question',
                slot: 'class_question'
              },
              {
                title: '最近修改',
                key: 'lately_time',
                slot: 'lately_time',
                width: 150
              },
              {
                title: '操作',
                slot: 'action',
                width: 150,
                align: 'right'
              }
            ],
            froms: {
              title: '添加 授课进度',
              model: false,
              index: null,
              select_loading: false,
              options: [],
              formValidate: {
                id: null,
                key_class_question: null,
                key_user_school_info_many: 0
              },
              ruleValidate: {
                key_class_question: [
                  { required: true, message: '请正确填写书名分类名称 [课程]' }
                ]
              }
            }
          },
          chapter: {
            index: null,
            text: '选择 授课进度 后，为您展示本页数据...',
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
            loading: true,
            columns: [
              {
                title: '章节',
                key: 'class_ques_chapter',
                slot: 'class_ques_chapter'
              },
              {
                title: '抓题',
                key: 'status',
                slot: 'status'
              },
              {
                title: '最近修改',
                key: 'lately_time',
                slot: 'lately_time'
              },
              {
                title: '操作',
                slot: 'action',
                width: 200,
                align: 'right'
              }
            ],
            froms: {
              title: '添加 章节进度',
              model: false,
              index: null,
              select_loading: false,
              options: [],
              formValidate: {
                id: null,
                status: 0,
                key_class_ques_chapter: null,
                key: null
              },
              ruleValidate: {
                status: [
                  { required: false, message: '请选择' }
                ],
                key_class_ques_chapter: [
                  { required: true, message: '请正确填写章节名称' }
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
          name: '班级',
          toRouter: {
            name: 'admin_school_learning'
          }
        },
        {
          name: '学习进度',
          toRouter: {
            name: 'admin_school_learning'
          }
        }
      ])
      this.initHttp()
    },
    components: {
      Row,
      Col,
      Card,
      Button,
      Alert,
      Table,
      Time,
      Modal,
      Page,
      Icon,
      Form,
      FormItem,
      Input,
      Select,
      Option,
      Spin,
      Tooltip,
      Tag,
      'i-switch': Switch
    },
    methods: {
      /**
       * 改变 是否抓取本章节题库信息
       */
      setChapter: function (row, index, val) {
        let content = '<p>当前章节 将 不计入抓取范围 测试/考题</p>'
        if (val === 0) content = '<p>当前章节 将 计入抓取范围 测试/考题</p>'

        Modal.confirm({
          title: '确定修改吗？',
          content: content,
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpChapter('PATCH', { status: val }, row.id).then(response => {
              Message.success('以修改')
              this.tables.chapter.pagination.items[index].status = response.data.status
              this.tables.chapter.pagination.items[index].lately_time = response.data.lately_time
            }).finally(() => {
              Modal.remove()
            }).catch(() => {
              Message.error('修改失败')
            })
          }
        })
      },

      /**
       * 添加 章节进度
       */
      addChapter: function () {
        this.$refs['formValidateModelChapter'].validate((valid) => {
          if (valid) {
            this.initHttpChapter('POST', this.tables.chapter.froms.formValidate).catch(error => {
              Modal.error({
                title: '啊呀，这是怎么了',
                content: error.data.detail
              })
              console.log(error.data.detail)
            }).finally(() => {
              // this.initHttp()
              this.initHttpChapter('GET', { key: this.tables.chapter.index })
            })
            this.tables.chapter.froms.model = false
          }
        })
      },
      /**
       * 添加 授课进度
       */
      addSchool: function () {
        this.$refs['formValidateModelSchool'].validate((valid) => {
          if (valid) {
            this.tables.chapter.loading = true
            this.tables.chapter.pagination.items = []
            this.tables.chapter.pagination.count = 1
            this.tables.chapter.pagination.next = null
            this.tables.chapter.pagination.previous = null

            this.initHttpSchool('POST', this.tables.school.froms.formValidate).catch(error => {
              Modal.error({
                title: '啊呀，这是怎么了',
                content: error.data.detail
              })
            }).finally(() => {
              this.initHttpSchool('GET', { key_user_school_info_many: this.tables.index })
            })
            this.tables.school.froms.model = false
          }
        })
      },
      /**
       * 添加 在授班级
       */
      addExam: function () {
        this.$refs['formValidateModelExam'].validate((valid) => {
          if (valid) {
            this.tables.school.loading = true
            this.tables.school.pagination.items = []
            this.tables.school.pagination.count = 1
            this.tables.school.pagination.next = null
            this.tables.school.pagination.previous = null

            this.tables.chapter.loading = true
            this.tables.chapter.pagination.items = []
            this.tables.chapter.pagination.count = 1
            this.tables.chapter.pagination.next = null
            this.tables.chapter.pagination.previous = null

            this.initHttp('POST', this.tables.froms.formValidate).catch(error => {
              Modal.error({
                title: '啊呀，这是怎么了',
                content: error.data.detail
              })
              console.log(error.data.detail)
            }).finally(() => {
              this.initHttp()
            })
            this.tables.froms.model = false
          }
        })

      },

      /**
       * 章节进度 章节远程搜索
       * @param query
       */
      remoteMethodChapter: function (query) {
        this.tables.chapter.froms.select_loading = true
        axios.classQuestionChapter('GET', {
          name__icontains: query
        }).then(response => {
          this.tables.chapter.froms.options = response.data.results
        }).finally(() => {
          this.tables.chapter.froms.select_loading = false
        })
      },
      /**
       * 在授班级 课程远程搜索
       * @param query
       */
      remoteMethodSchool: function (query) {
        this.tables.school.froms.select_loading = true
        axios.classQuestion('GET', {
          name__icontains: query
        }).then(reponse => {
          this.tables.school.froms.options = reponse.data.results
        }).finally(finay => {
          this.tables.school.froms.select_loading = false
        })
      },
      /**
       * 在授班级 教师用户远程搜索
       * @param query
       */
      remoteMethodUser: function (query) {
        this.tables.froms.user_loading = true
        console.log(query)
        axios.user('GET', {
          first_name__icontains: query,
          stats: 1
        }).then(reponse => {
          this.tables.froms.options_user = reponse.data.results
        }).finally(finay => {
          this.tables.froms.user_loading = false
        })
      },
      /**
       * 在授班级 班级远程搜索
       * @param query
       */
      remoteMethod: function (query) {
        this.tables.froms.select_loading = true
        console.log(query)
        axios.userSchool('GET', {
          name__icontains: query
        }).then(reponse => {
          this.tables.froms.options = reponse.data.results
        }).finally(finay => {
          this.tables.froms.select_loading = false
        })
      },

      /**
       * 选择 在授班级 获取 章节进度 数据
       * @param row
       * @param index
       */
      getSchool: function (row, index) {
        this.tables.chapter.text = '加载中...'
        this.tables.chapter.loading = true
        this.tables.chapter.pagination.items = []
        this.tables.chapter.pagination.count = 1
        this.tables.chapter.pagination.next = null
        this.tables.chapter.pagination.previous = null

        this.tables.chapter.index = row.id
        this.tables.chapter.froms.formValidate.key = row.id
        this.tables.school.tag_name = row.class_question.name

        this.initHttpChapter('GET', { key: row.id })
      },
      /**
       * 选择 在授班级 获取 在授班级 数据
       * @param row
       * @param index
       */
      getExam: function (row, index) {
        this.tables.school.text = '加载中...'
        this.tables.school.loading = true
        this.tables.school.pagination.items = []
        this.tables.school.pagination.count = 1
        this.tables.school.pagination.next = null
        this.tables.school.pagination.previous = null

        this.tables.chapter.loading = true
        this.tables.chapter.pagination.items = []
        this.tables.chapter.pagination.count = 1
        this.tables.chapter.pagination.next = null
        this.tables.chapter.pagination.previous = null

        this.tables.index = row.id
        this.tables.chapter.index = null
        this.tables.school.froms.formValidate.key_user_school_info_many = row.id
        this.tables.tag_name = row.school.name
        this.tables.school.tag_name = ''

        this.initHttpSchool('GET', { key_user_school_info_many: row.id })
      },

      /**
       * 章节进度 分页器实现
       * @param index
       */
      pageChangeChapter: function (index) {
        this.initHttpChapter('GET', { key: this.tables.chapter.index })
      },
      /**
       * 章节进度 分页条数实现
       * @param page
       */
      pageSizeChangeChapter: function (page) {
        this.tables.chapter.pagination.pageSize = page
        this.initHttpChapter('GET', { key: this.tables.chapter.index })
      },

      /**
       * 授课进度 分页器实现
       * @param index
       */
      pageChangeSchool: function (index) {
        this.initHttpSchool('GET', { key_user_school_info_many: this.tables.index })
      },
      /**
       * 授课进度 分页条数实现
       * @param page
       */
      pageSizeChangeSchool: function (page) {
        this.tables.school.pagination.pageSize = page
        this.initHttpSchool('GET', { key_user_school_info_many: this.tables.index })
      },

      /**
       * 在授班级 分页器实现
       * @param index
       */
      pageChange: function (index) {
        this.initHttp()
      },
      /**
       * 在授班级 分页条数实现
       * @param page
       */
      pageSizeChange: function (page) {
        this.tables.pagination.pageSize = page
        this.initHttp()
      },

      /**
       * 删除章节进度索引
       * @param row
       * @param index
       * @constructor
       */
      HttpChapterDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>以下条目数据将被删除，不可撤销！</p><p>删除以下条目数据：</p><div style="color: #ed4014;"><li>章节进度</li></div>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpChapter('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.chapter.pagination.items.splice(index, 1)
            }).finally(() => {
              Modal.remove()
            }).catch(() => {
              Message.error('删除失败')
            })
          }
        })
      },
      /**
       * 删除授课进度索引
       * @param row
       * @param index
       * @constructor
       */
      HttpSchoolDelete: function (row, index) {
        console.log(row)
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除会触发联级删除哦，不可撤销！</p><p>同时删除以下条目所关联数据：</p>  <div style="color: #ed4014;"><li>授课进度</li><li>章节进度</li></div><br><p>如没有必要，建议逐个删除！！！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpSchool('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.tables.school.pagination.items.splice(index, 1)
            }).finally(() => {
              Modal.remove()
            }).catch(() => {
              Message.error('删除失败')
            })
          }
        })
      },
      /**
       * 删除在授班级索引
       * @param row
       * @param index
       * @constructor
       */
      HttpExamDelete: function (row, index) {
        Modal.confirm({
          title: '确定删除吗？',
          content: '<p>删除会触发联级删除哦，不可撤销！</p><p>同时删除以下条目所关联数据：</p>  <div style="color: #ed4014;"><li>在授班级</li><li>授课进度</li><li>章节进度</li></div><br><p>如没有必要，建议逐个删除！！！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttp('DELETE', {}, row).then(response => {
              Message.success('以删除')
              this.initHttp()
            }).finally(() => {
              Modal.remove()
            }).catch(() => {
              Message.error('删除失败')
            })
          }
        })
      },

      /**
       * 获取 在授班级 数据
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttp: function (methods = 'GET', data = {
        stats: 1
      }, index = null) {
        this.tables.loading = true

        return new Promise((resolve, reject) => {
          axios.userSchoolManyUser(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.pagination.items = response.data.results
              this.tables.pagination.count = response.data.count
              this.tables.pagination.next = response.data.next
              this.tables.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.loading = false
            return resolve(finallys)
          })
        })
      },
      /**
       * 获取 在授班级 数据
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttpSchool: function (methods = 'GET', data = {
        key_user_school_info_many: null
      }, index = null) {
        this.tables.school.loading = true

        return new Promise((resolve, reject) => {
          axios.userSemester(
            methods,
            data,
            index
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.school.pagination.items = response.data.results
              this.tables.school.pagination.count = response.data.count
              this.tables.school.pagination.next = response.data.next
              this.tables.school.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.school.loading = false
            this.tables.school.text = '选择 在授班级 后，为您展示本页数据...'
            return resolve(finallys)
          })
        })
      },
      /**
       * 获取 章节进度 数据
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttpChapter: function (methods = 'GET', data = {
        userExamStock: null
      }, index = null) {
        this.tables.chapter.loading = true

        return new Promise((resolve, reject) => {
          axios.userExamStock(
            methods,
            data,
            index
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
            this.tables.chapter.text = '选择 授课进度 后，为您展示本页数据...'
            return resolve(finallys)
          })
        })
      }
    },
    computed: {
      getModel: function () {
        return this.tables.froms.model
      },
      getSchoolModel: function () {
        return this.tables.school.froms.model
      },
      getChapterModel: function () {
        return this.tables.chapter.froms.model
      }

    },
    watch: {
      getModel: function (a, b) {
        if (a) {
          axios.userSchool().then(reponse => {
            this.tables.froms.options = reponse.data.results
          }).finally(finay => {
            this.tables.froms.loading = false
          })
          axios.user('GET', { stats: 1 }).then(reponse => {
            this.tables.froms.options_user = reponse.data.results
          }).finally(finay => {
            this.tables.froms.user_loading = false
          })
        }
      },
      getSchoolModel: function (a, b) {
        if (a) {
          axios.classQuestion().then(reponse => {
            this.tables.school.froms.options = reponse.data.results
          }).finally(finay => {
            this.tables.school.froms.select_loading = false
          })
        }
      },
      getChapterModel: function (a, b) {
        if (a) {
          axios.classQuestionChapter().then(reponse => {
            this.tables.chapter.froms.options = reponse.data.results
          }).finally(finay => {
            this.tables.chapter.froms.select_loading = false
          })
        }
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