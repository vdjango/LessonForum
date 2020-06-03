<template>
    <div>
        <!--        记录当前班级学生学习进度-通过教师中心管理当前所属班级学习进度-->
        <!--        根据学习进度来把控 抓取的考题所属范围-->
        <!--        后期可以通过指定 抓取的考题所属范围: [书名分类-模块分类-章节分类]-->
        <Alert show-icon>每个班级所对应的学生</Alert>

        <Row :gutter="16">
            <Col span="8">
                <Card dis-hover>
                    <p slot="title">班级</p>
                    <Table ref="selection" :loading="tables.loading" :columns="tables.columns"
                           :data="tables.pagination.items" highlight-row>
                        <template slot="user" slot-scope="{ row, index }">
                            <div v-if="row.user.length > 0">
                                <div v-for="(item, key) in row.user" :key="key">
                                    <Tag size="default" color="cyan">{{item.first_name}}</Tag>
                                </div>
                            </div>
                            <Tag v-else size="default" color="orange">未指派</Tag>
                        </template>
                        <template slot="lately_time" slot-scope="{ row, index }">
                            <Time :time="row.lately_time"></Time>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="primary" size="small"
                                    @click="getExam(row, index)" style="margin-right: 5px">选择
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
                </Card>
            </Col>
            <Col span="16">
                <Card dis-hover>
                    <div slot="title">
                        班级学员
                        <Tag type="dot" color="primary" style="margin-left: 10px" v-if="this.tables.user.name !== ''">
                            {{ this.tables.user.name }}
                        </Tag>
                    </div>
                    <Button size="small" slot="extra" :disabled="this.tables.user.name === ''"
                            @click="tables.user.froms.model = true">添加
                    </Button>

                    <Table ref="selection" :loading="tables.user.loading" :columns="tables.user.columns"
                           :data="tables.user.pagination.items" highlight-row>
                        <template slot="username" slot-scope="{ row, index }">
                            {{row.user_name.username}}
                        </template>
                        <template slot="email" slot-scope="{ row, index }">
                            {{row.user_name.email}}
                        </template>
                        <template slot="first_name" slot-scope="{ row, index }">
                            {{row.user_name.first_name}}
                        </template>
                        <template slot="date_joined" slot-scope="{ row, index }">
                            <Time :time="row.user_name.date_joined"></Time>
                        </template>
                        <template slot="lately_time" slot-scope="{ row, index }">
                            <Time :time="row.lately_time"></Time>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="error" size="small" @click="removeUser(row, index)">移除</Button>
                        </template>
                    </Table>
                    <Card :bordered="false" dis-hover>
                        <Page :total="tables.user.pagination.count"
                              :current.sync="tables.user.pagination.index"
                              :page-size="tables.user.pagination.pageSize"
                              :page-size-opts="tables.user.pagination.pageSizeOpts"
                              @on-change="pageChangeUser"
                              @on-page-size-change="pageSizeChangeUser"
                              transfer
                              size="small" show-elevator
                              :disabled="this.tables.user.froms.formValidate.school_info === null"
                              show-sizer show-total/>
                    </Card>

                    <Modal v-model="tables.user.froms.model" draggable scrollable
                           :title="tables.user.froms.title">
                        <Spin fix v-if="tables.user.froms.loading">
                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                            <div>请等待，正在加载班级信息...</div>
                        </Spin>
                        <Form ref="formValidateModelUser"
                              :model="tables.user.froms.formValidate"
                              :rules="tables.user.froms.ruleValidate"
                              :label-width="80">
                            <FormItem label="用户" prop="user">
                                <Select v-model="tables.user.froms.formValidate.user"
                                        filterable
                                        clearable
                                        remote
                                        :remote-method="remoteMethodUser"
                                        :loading="tables.user.froms.select_loading"
                                        placeholder="请搜索学生姓名，不支持UID搜索">
                                    <Option v-for="(item, index) in tables.user.froms.options" :value="item.id"
                                            :key="index" style="display: flow-root;">
                                        {{item.first_name}}
                                        <span style="float:right;color:#ccc;">UID:{{item.username}}</span>
                                    </Option>
                                </Select>
                            </FormItem>
                        </Form>
                        <template slot="footer">
                            <Button type="primary" @click="addUser">添加</Button>
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
    name: 'study',
    data () {
      return {
        tables: {
          index: null,
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
              key: 'name'
            },
            {
              title: '教师',
              key: 'user',
              slot: 'user'
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
          user: {
            text: '选择 在授班级 后，为您展示本页数据...',
            name: '',
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
                title: 'UID',
                key: 'username',
                slot: 'username',
                width: 120
              },
              {
                title: '邮箱',
                key: 'email',
                slot: 'email'
              },
              {
                title: '名字',
                key: 'first_name',
                slot: 'first_name'
              },
              {
                title: '上次登录',
                key: 'date_joined',
                slot: 'date_joined',
                width: 150
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
                width: 100,
                align: 'right'
              }
            ],
            froms: {
              title: '添加 授课进度',
              model: false,
              index: null,
              loading: true,
              select_loading: false,
              options: [],
              formValidate: {
                id: null,
                school_info: null,
                stats: 0,
                user: null
              },
              ruleValidate: {
                user: [
                  { required: true, message: '请选择用户 [课程]' }
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
          name: '在学学员',
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
       * 用户远程搜索
       * @param query
       */
      remoteMethodUser: function (query) {
        this.tables.user.froms.select_loading = true

        axios.user('GET', { first_name__icontains: query, status: 0 }).then(response => {
          this.tables.user.froms.options = null
          this.tables.user.froms.options = response.data.results
          console.log(this.tables.user.froms.options)
        }).finally(() => {
          this.tables.user.froms.select_loading = false
        })

      },
      addUser: function () {
        this.$refs['formValidateModelUser'].validate((valid) => {
          if (valid) {
            this.initHttpUser('POST', this.tables.user.froms.formValidate).catch(error => {
              Modal.error({
                title: '啊呀，这是怎么了',
                content: error.data.detail
              })
              console.log(error.data.detail)
            }).finally(() => {
              this.initHttpUser('GET', {
                stats: 0,
                school_info: this.tables.user.froms.formValidate.school_info
              })
            })
            this.tables.user.froms.model = false
          }
        })
      },
      /**
       * 将学员从当前班级移除
       * @param row
       * @param index
       */
      removeUser: function (row, index) {
        console.log(row)
        Modal.confirm({
          title: '确定移除吗？',
          content: '<p>移除后，学员将不在是本班学员！</p>',
          loading: true,
          closable: true,
          onOk: () => {
            this.initHttpUser('DELETE', {}, row.id).then(response => {
              Message.success('已移除')
              this.tables.user.pagination.items.splice(index, 1)
            }).catch(err => {
              Modal.error({
                title: '啊呀，用户移除失败了',
                content: error.data.detail
              })
            }).finally(() => {
              Modal.remove()
            })
          }
        })

      },

      /**
       * 学员分页器实现
       * @param index
       */
      pageChangeUser: function (index) {
        this.initHttpUser('GET', {
          stats: 0,
          school_info: this.tables.user.froms.formValidate.school_info
        })
      },
      /**
       * 学员分页条数实现
       * @param page
       */
      pageSizeChangeUser: function (page) {
        this.tables.user.pagination.pageSize = page
        this.initHttpUser('GET', {
          stats: 0,
          school_info: this.tables.user.froms.formValidate.school_info
        })
      },

      getExam: function (row, index) {
        this.tables.user.text = '加载中...'
        this.tables.user.loading = true
        this.tables.user.pagination.items = []
        this.tables.user.pagination.count = 1
        this.tables.user.pagination.next = null
        this.tables.user.pagination.previous = null

        this.tables.user.froms.formValidate.school_info = row.id
        this.tables.user.name = row.name

        this.initHttpUser('GET', {
          stats: 0,
          school_info: row.id
        })
      },
      pageChange: function (index) {
        /**
         * 分页器实现
         */
        this.initHttp()
      },
      pageSizeChange: function (page) {
        /**
         * 分页条数实现
         */
        this.tables.pagination.pageSize = page
        this.initHttp()
      },

      /**
       *
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttp: function (methods = 'GET', data = {
        stats: 0
      }, index = null) {
        this.tables.loading = true

        return new Promise((resolve, reject) => {
          axios.userSchool(
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
       *
       * @param methods
       * @param data
       * @param index
       * @returns {Promise<unknown>}
       */
      initHttpUser: function (methods = 'GET', data = {
        stats: 0,
        key_school_info: this.tables.user.froms.formValidate.school_info
      }, index = null) {
        this.tables.user.loading = true

        return new Promise((resolve, reject) => {
          axios.userSchoolManyUser(
            methods,
            data,
            index,
            this.tables.user.pagination
          ).then(response => {
            if (methods.toUpperCase() === 'GET') {
              this.tables.user.pagination.items = response.data.results
              this.tables.user.pagination.count = response.data.count
              this.tables.user.pagination.next = response.data.next
              this.tables.user.pagination.previous = response.data.previous
            }
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            this.tables.user.loading = false
            this.tables.user.text = '选择 在授班级 后，为您展示本页数据...'
            return resolve(finallys)
          })
        })
      }
    },
    computed: {
      getUserModel: function () {
        return this.tables.user.froms.model
      }
    },
    watch: {
      getUserModel: function (a, b) {
        if (a) {
          axios.user('GET', { stats: 0 }).then(response => {
            this.tables.user.froms.options = response.data.results
          }).finally(() => {
            this.tables.user.froms.loading = false
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