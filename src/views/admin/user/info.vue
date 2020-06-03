<template>
    <Layout>
        <Card :bordered="false" dis-hover>
            <p slot="title">
                <Icon type="md-apps"/>
                用户
            </p>
            <Table :columns="tablesColumns" :data="pagination.items" :loading="loading">
                <template slot-scope="{ row, index }" slot="sex">
                    <p v-if="row.sex === 0">男</p>
                    <p v-if="row.sex === 1">女</p>
                    <p v-if="row.sex === 2">保密</p>
                </template>
                <template slot-scope="{ row, index }" slot="entrance">
                    <!--                    <el-time :time="row.entrance"/>-->
                    {{row.entrance}}
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px"
                            @click="show(true, index)">
                        操作
                    </Button>
                    <Button type="error" size="small">删除</Button>
                </template>
            </Table>
            <Card :bordered="false" dis-hover style="float: right">
                <Page :total="pagination.count"
                      :current.sync="pagination.index"
                      :page-size="pagination.pageSize"
                      :page-size-opts="pagination.pageSizeOpts"
                      @on-change="pageChangeUser"
                      @on-page-size-change="pageSizeChangeUser"
                      transfer
                      size="small" show-elevator
                      show-sizer show-total/>
            </Card>
        </Card>
        <Modal
                title="操作"
                v-model="model.default"
                scrollable
                draggable
                :styles="{top: 60}"
                footer-hide
                :z-index="1000"
                :mask-closable="false"
                class-name="vertical-center-modal">

            <Tabs value="name1">
                <TabPane label="基本信息" name="name1">
                    <Row>
                        <Col>
                            <Spin fix v-if="fromInfo.formLoading">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>{{ fromInfo.formName }}</div>
                            </Spin>
                            <Form ref="fromInfo" :label-width="120" label-position="left"
                                  :model="fromInfo.formInline"
                                  :rules="fromInfo.ruleInline">

                                <FormItem label="ID" prop="username">
                                    <Input placeholder="请输入昵称"
                                           v-model="fromInfo.formInline.username"
                                           :disabled="fromInfo.formInline.username!=null"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="姓名" prop="first_name">
                                    <Input placeholder="请输入姓名"
                                           v-model="fromInfo.formInline.first_name"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="性别" prop="username">
                                    <RadioGroup v-model="fromInfo.formInline.sex">
                                        <Radio :label="0">男</Radio>
                                        <Radio :label="1">女</Radio>
                                        <Radio :label="2">保密</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="名族" prop="famous_race">
                                    <Input placeholder="请输入名族"
                                           v-model="fromInfo.formInline.famous_race"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="年龄" prop="age">
                                    <Input placeholder="请输入年龄"
                                           v-model.number="fromInfo.formInline.age"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="籍贯" prop="native_place">
                                    <Input placeholder="请输入籍贯"
                                           v-model="fromInfo.formInline.native_place"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="电话" prop="telephone">
                                    <Input placeholder="请输入电话"
                                           v-model="fromInfo.formInline.telephone"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="身份证号码" prop="id_card">
                                    <Input placeholder="请输入身份证号码"
                                           v-model="fromInfo.formInline.id_card"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="入学时间" prop="entrance">
                                    <DatePicker transfer type="date" placeholder="请输入入学时间"
                                                format="yyyy-MM-dd hh:mm"
                                                v-model="fromInfo.formInline.entrance"></DatePicker>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="毕业时间" prop="graduation">
                                    <DatePicker transfer type="date" placeholder="请输入毕业时间"
                                                format="yyyy-MM-dd hh:mm"
                                                v-model="fromInfo.formInline.graduation"></DatePicker>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <Button type="primary" :loading="fromInfo.formLoading"
                                        @click="saveFromDataInfo">保存
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane label="工作情况" name="name2">
                    <Row>
                        <Col>
                            <Spin fix v-if="fromWorking.formLoading">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>{{ fromWorking.formName }}</div>
                            </Spin>
                            <Form ref="fromWorking" :label-width="120" label-position="left"
                                  :model="fromWorking.formInline"
                                  :rules="fromWorking.ruleInline">
                                <FormItem label="单位" prop="unit">
                                    <Input placeholder="请输入单位"
                                           v-model="fromWorking.formInline.unit"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="职位" prop="position">
                                    <Input placeholder="请输入职位"
                                           v-model="fromWorking.formInline.position"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="单位电话" prop="work_telephone">
                                    <Input placeholder="请输入单位电话"
                                           v-model="fromWorking.formInline.work_telephone"></Input>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <FormItem label="入职时间" prop="entry_time">
                                    <DatePicker type="date" placeholder="请输入入职时间"
                                                v-model="fromWorking.formInline.entry_time"></DatePicker>
                                </FormItem>
                                <Divider size="small" dashed/>
                                <Button type="primary" :loading="fromWorking.formLoading"
                                        @click="saveFromDataWorking">
                                    保存
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </TabPane>
                <TabPane label="积分记录" name="name3">
                    <Row>
                        <Col>
                            <Spin fix v-if="fromIntegral.tables.tableLoading">
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>{{ fromIntegral.tables.formName }}</div>
                            </Spin>
                            <Card :bordered="false" dis-hover>
                                <Row type="flex" justify="center" align="middle" class="code-row-bg">
                                    <Col>
                                        <i-circle
                                                :percent="parseInt(fromIntegral.tables.tableData.number)"
                                                dashboard :size="250"
                                                :trail-width="4"
                                                :stroke-width="5"
                                                stroke-linecap="square"
                                                :stroke-color="fromIntegral.tables.tableColor">
                                            <div class="demo-Circle-custom">
                                                <h1>{{ fromIntegral.tables.tableData.number }}分</h1>
                                                <p>违规记录{{ fromIntegral.tables.tableData.violation.length
                                                    }}次</p>
                                                <span>{{fromIntegral.tables.text}}</span>
                                            </div>
                                        </i-circle>
                                    </Col>
                                </Row>
                            </Card>

                            <Card :bordered="false" dis-hover>
                                <p slot="title">违规记录</p>
                                <Table height="300" :columns="fromIntegral.tables.tableLabel"
                                       :data="fromIntegral.tables.tableData.violation">
                                    <template slot-scope="{ row }" slot="date">
                                        <datetimes :time="row.date"></datetimes>
                                    </template>
                                </Table>
                            </Card>

                            <Card v-if="fromIntegral.formAdd" :bordered="false" dis-hover>
                                <p slot="title">新增记录</p>
                                <Spin fix v-if="fromIntegral.formLoading">
                                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                    <div>{{ fromIntegral.formName }}</div>
                                </Spin>
                                <Form ref="fromIntegral" :model="fromIntegral.formInline"
                                      label-position="left"
                                      :rules="fromIntegral.ruleInline" :label-width="80">
                                    <FormItem prop="number" label="分数">
                                        <Input type="text"
                                               v-model.number="fromIntegral.formInline.number"
                                               placeholder="分数">
                                        </Input>
                                    </FormItem>
                                    <Divider size="small" dashed/>
                                    <FormItem prop="text" label="说明">
                                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                               v-model="fromIntegral.formInline.text"
                                               placeholder="说明">
                                        </Input>
                                    </FormItem>
                                </Form>
                            </Card>


                            <Button type="primary" :loading="fromIntegral.formLoading"
                                    @click="saveFromDataIntegral">
                                {{fromIntegral.formName}}
                            </Button>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>

        </Modal>
    </Layout>
</template>

<script>
  import {
    Layout,
    Icon,
    Table,
    Button,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Card,
    Modal,
    Form,
    FormItem,
    DatePicker,
    RadioGroup,
    Radio,
    Input,
    Divider,
    Message,
    Spin,
    Tabs,
    TabPane,
    Col,
    Row,
    Circle,
    Time,
    Page
  } from 'view-design'
  import axios from '@/axios/index'
  import datetimes from '@/components/datetime/index'
  import dev from '../../../../dev.env'

  export default {
    name: 'info',
    data () {
      return {
        option: {
          /**
           * 设置日期返回格式 v-model
           */
          shortcuts: [
            {
              value () {
                return 'yyyy-MM-dd hh:mm'
              }
            }
          ]
        },
        fromInfo: {
          formLoading: true,
          formName: '加载中...',
          formInline: {
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
            graduation: null
          },
          ruleInline: {
            username: [
              { required: true, type: 'string', message: '请正确输入用户名', trigger: 'blur' },
              { max: 150, message: '最大150长度', trigger: 'blur' }
            ],
            first_name: [
              { required: false, type: 'string', min: 2, message: '请正确输入姓名', trigger: 'blur' },
              { max: 30, message: '最大30长度', trigger: 'blur' }
            ],
            famous_race: [
              { required: false, type: 'string', message: '请正确输入名族', trigger: 'blur' },
              { max: 100, message: '最大100长度', trigger: 'blur' }
            ],
            age: [
              { required: false, message: '请输入年龄' },
              { type: 'integer', message: '请输入数字' }
            ],
            native_place: [
              { required: false, type: 'string', min: 2, message: '请正确输入籍贯', trigger: 'blur' },
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
              { required: false, type: 'date', message: '请正确选择入学时间' }
            ],
            graduation: [
              { required: false, type: 'date', message: '请正确选择毕业时间' }
            ]
          }
        },
        fromWorking: {
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
            key: null
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
        },
        fromIntegral: {
          formLoading: false,
          formAdd: false,
          formName: '增加',
          formMethod: 'PATCH',
          formDefault: false,
          formInline: {
            id: null,
            text: null,
            number: null,
            key: null
          },
          ruleInline: {
            text: [
              { required: true, type: 'string', message: '请正确输入违规说明', trigger: 'blur' }
            ],
            number: [
              { required: true, type: 'number', message: '请正确数值' }
            ]
          },
          tables: {
            user: null,
            tableLoading: true,
            tableLabel: [
              {
                title: '积分',
                key: 'number',
                width: 100
              },
              {
                title: '信息',
                key: 'text'
              },
              {
                title: '时间',
                key: 'date',
                slot: 'date'
              }
            ],
            tableData: {
              number: 100,
              violation: []
            },
            tableColor: '#5cb85c',
            text: '表现不错哎'
          }
        },
        tablesColumns: [
          {
            title: 'UID',
            key: 'username',
            width: 150
          },
          {
            title: '姓名',
            key: 'first_name',
            width: 150
          },
          {
            title: '性别',
            key: 'sex',
            slot: 'sex',
            width: 150
          },
          {
            title: '年龄',
            key: 'age',
            width: 150
          },
          {
            title: '入学时间',
            key: 'entrance',
            slot: 'entrance'
          },
          {
            title: '操作',
            key: 'id',
            align: 'right',
            slot: 'action'
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
        loading: true,
        model: {
          default: false,
          user: null,
          index: null
        }
      }
    },
    created () {
      this.$store.commit('setTopPath', [
        {
          name: '用户',
          toRouter: {
            name: 'admin_user'
          }
        },
        {
          name: '用户管理',
          toRouter: {
            name: 'admin_user'
          }
        }
      ])
      this.initHttpUser()
    },
    methods: {
      show (val, index) {
        let user = this.pagination.items[index].id
        this.fromIntegral.tables.tableLoading = true
        this.model.default = val
        this.model.user = user
        this.model.index = index

        this.fromWorking.formInline = {
          id: null,
          text: null,
          number: null,
          key: user
        }
        this.fromInfo.formInline = {
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
          graduation: null
        }
        this.fromIntegral.formInline = {
          id: null,
          text: null,
          number: null,
          key: null
        }

        /**
         * 基本信息
         */
        axios.user('GET', null, user).then(res => {
          this.fromInfo.formInline = res.data
        }).catch(err => {
          Message.error('获取用户信息保存失败， 请重新登陆')
        }).finally(f => {
          this.fromInfo.formLoading = false
        })

        /**
         * 工作情况
         */
        axios.userInfo('GET', {
          key: user
        }).then(res => {
          if (res.data.length !== 0) {
            this.fromWorking.formInline.id = res.data.results[0].id
            this.fromWorking.formInline.unit = res.data.results[0].unit
            this.fromWorking.formInline.entry_time = res.data.results[0].entry_time
            this.fromWorking.formInline.position = res.data.results[0].position
            this.fromWorking.formInline.work_telephone = res.data.results[0].work_telephone
          } else {
            this.fromWorking.formMethod = 'POST'
          }
        }).catch(err => {
          Message.error('获取用户信息失败')
        }).finally(f => {
          this.fromWorking.formLoading = false
        })

        /**
         * 积分违规记录
         */
        axios.userIntegral('GET', {
          key: user
        }).then(res => {
          if (res.data.results.length !== 0) {
            this.fromIntegral.tables.tableData = res.data.results[0]
            this.fromIntegral.formInline.key = res.data.results[0].id
          }
        }).catch(err => {
          Message.error('获取用户积分记录失败')
        }).finally(f => {
          if (this.fromIntegral.tables.tableData.number < 70 && this.fromIntegral.tables.tableData.number >= 80) {
            this.fromIntegral.tables.tableColor = '#43a3fb'
            this.fromIntegral.tables.text = '加把劲啦'
          }
          if (this.fromIntegral.tables.tableData.number < 70 && this.fromIntegral.tables.tableData.number >= 60) {
            this.fromIntegral.tables.tableColor = '#ff9900'
            this.fromIntegral.tables.text = '不是一般的努力'
          }
          if (this.fromIntegral.tables.tableData.number < 60) {
            this.fromIntegral.tables.tableColor = '#ff5500'
            this.fromIntegral.tables.text = '有点遗憾哦'
          }
          this.fromIntegral.tables.tableLoading = false
        })
      },
      remove (index) {
        this.pagination.items.splice(index, 1)
      },
      accAdd (arg1, arg2) {
        let r1, r2, m
        try {r1 = arg1.toString().split('.')[1].length} catch (e) {r1 = 0}
        try {r2 = arg2.toString().split('.')[1].length} catch (e) {r2 = 0}
        m = Math.pow(10, Math.max(r1, r2))
        return (arg1 * m + arg2 * m) / m
      },
      pageChangeUser: function (index) {
        /**
         * 分页器实现
         */
        this.initHttpUser()
      },
      pageSizeChangeUser: function (page) {
        /**
         * 分页条数实现
         */
        this.pagination.pageSize = page
        this.initHttpUser()
      },
      initHttpUser: function () {
        /**
         * 用户
         */
        this.loading = true
        axios.user('GET', {}, null, this.pagination).then(response => {
          this.pagination.items = response.data.results
          this.pagination.count = response.data.count
          this.pagination.next = response.data.next
          this.pagination.previous = response.data.previous
        }).finally(finallys => {
          this.loading = false
        })
      },
      saveFromDataInfo () {
        this.fromInfo.formLoading = true
        this.fromInfo.formName = '正在保存...'

        this.$refs['fromInfo'].validate((valid) => {
          if (valid) {
            axios.user('PATCH', {
              username: this.fromInfo.formInline.username,
              first_name: this.fromInfo.formInline.first_name,
              sex: this.fromInfo.formInline.sex,
              famous_race: this.fromInfo.formInline.famous_race,
              age: this.fromInfo.formInline.age,
              native_place: this.fromInfo.formInline.native_place,
              telephone: this.fromInfo.formInline.telephone,
              id_card: this.fromInfo.formInline.id_card,
              entrance: this.fromInfo.formInline.entrance,
              graduation: this.fromInfo.formInline.graduation
            }, this.model.user).then(res => {
              this.fromInfo.formInline = res.data
              Message.success('用户信息保存成功')
              this.fromInfo.formLoading = false
            }).catch(err => {
              Message.error('用户信息保存失败')
            }).finally(f => {
              this.fromInfo.formLoading = false
            })
          } else {
            Message.error('Fail!')
            this.fromInfo.formLoading = false
          }
        })
      },
      saveFromDataWorking () {
        this.fromWorking.formLoading = true
        this.fromWorking.formName = '正在保存...'
        this.$refs['fromWorking'].validate((valid) => {
          if (valid) {
            let user = this.fromWorking.formInline.id
            if (this.fromWorking.formMethod === 'POST') user = null
            axios.userInfo(this.fromWorking.formMethod, this.fromWorking.formInline, user).then(res => {
              this.fromWorking.formInline = res.data
              Message.success('用户信息保存成功')
              this.fromWorking.formLoading = false
            }).catch(err => {
              Message.error('用户信息保存失败')
            }).finally(f => {
              this.fromWorking.formLoading = false
            })
          } else {
            Message.error('Fail!')
            this.fromWorking.formLoading = false
          }
        })
      },
      saveFromDataIntegral () {
        if (this.fromIntegral.formAdd) {
          this.fromIntegral.formLoading = true
          this.fromIntegral.formName = '正在保存...'
          this.$refs['fromIntegral'].validate((valid) => {
            if (valid) {
              axios.userViolation('POST', this.fromIntegral.formInline).then(res => {
                // this.fromWorking.formInline = res.data
                this.fromIntegral.tables.tableData.violation.unshift(res.data)
                let number = this.accAdd(this.fromIntegral.tables.tableData.number, this.fromIntegral.formInline.number)
                this.fromIntegral.tables.tableData.number = number
                this.pagination.items[this.model.index].number = number
                if (this.fromIntegral.tables.tableData.number >= 70) {
                  this.fromIntegral.tables.tableColor = '#43a3fb'
                  this.fromIntegral.tables.text = '加把劲啦'
                }
                if (this.fromIntegral.tables.tableData.number < 70 && this.fromIntegral.tables.tableData.number >= 60) {
                  this.fromIntegral.tables.tableColor = '#ff9900'
                  this.fromIntegral.tables.text = '不是一般的努力'
                }
                if (this.fromIntegral.tables.tableData.number < 60) {
                  this.fromIntegral.tables.tableColor = '#ff5500'
                  this.fromIntegral.tables.text = '有点遗憾哦'
                }

                Message.success('用户信息保存成功')
                this.fromIntegral.formLoading = false
                this.fromIntegral.formAdd = false
                this.fromIntegral.formName = '增加'
              }).catch(err => {
                Message.error('用户信息保存失败')
              }).finally(f => {
                this.fromIntegral.formLoading = false
                this.fromIntegral.formAdd = false
                this.fromIntegral.formName = '增加'
              })
            } else {
              Message.error('Fail!')
              this.fromIntegral.formLoading = false
              this.fromIntegral.formName = '增加'
            }
          })
        } else {
          this.fromIntegral.formAdd = true
        }
      }
    },
    components: {
      Layout,
      Icon,
      Table,
      Button,
      Dropdown,
      DropdownMenu,
      DropdownItem,
      Card,
      Modal,
      Form,
      FormItem,
      DatePicker,
      RadioGroup,
      Radio,
      Input,
      Divider,
      Message,
      Spin,
      Tabs,
      TabPane,
      Col,
      Row,
      Page,
      'i-circle': Circle,
      'el-time': Time,
      datetimes
    }
  }
</script>

<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }


    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .ivu-modal {
        top: 0;
    }


    >>> .ivu-form .ivu-divider-horizontal {
        margin: 15px 0 15px 0;
    }

    >>> .ivu-form-item, >>> .ivu-form-item > .ivu-form-item-label {
        margin-bottom: 0;
    }

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