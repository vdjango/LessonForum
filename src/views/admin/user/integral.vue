<template>
    <Layout>
        <Card :bordered="false" dis-hover>
            <p slot="title">
                <Icon type="md-apps"/>
                学分
            </p>
            <Table :columns="tablesColumns" :data="pagination.items" :loading="loading">
                <template slot-scope="{ row, index }" slot="sex">
                    <div v-if="row.key">
                        <p v-if="row.key.sex === 0">男</p>
                        <p v-if="row.key.sex === 1">女</p>
                        <p v-if="row.key.sex === 2">保密</p>
                    </div>
                </template>
                <template slot-scope="{ row, index }" slot="first_name">
                    <p v-if="row.key">{{row.key.first_name}}</p>
                </template>
                <template slot-scope="{ row, index }" slot="violation">
                    <p v-if="row.violation">
                        当前{{row.violation.length}}条记录
                    </p>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px"
                            @click="show(true, index)">
                        操作
                    </Button>
                </template>
            </Table>
            <Card :bordered="false" dis-hover style="float: right">
                <Page :total="pagination.count"
                      :current.sync="pagination.index"
                      :page-size="pagination.pageSize"
                      :page-size-opts="pagination.pageSizeOpts"
                      @on-change="pageChangeUserIntegral"
                      @on-page-size-change="pageSizeChangeUserIntegral"
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
                <TabPane label="积分记录" name="name1">
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
  import dev from '../../../../dev.env'
  import datetimes from '@/components/datetime/index'

  export default {
    name: 'integral',
    data () {
      return {
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
            title: 'ID',
            key: 'id',
            width: 150
          },
          {
            title: '姓名',
            key: 'key',
            width: 150,
            slot: 'first_name'
          },
          {
            title: '性别',
            key: 'key',
            slot: 'sex',
            width: 150
          },
          {
            title: '学分',
            key: 'number',
            width: 150
          },
          {
            title: '记录',
            key: 'violation',
            slot: 'violation'
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
          name: '学分管理',
          toRouter: {
            name: 'admin_user'
          }
        }
      ])
      this.initHttpUserIntegral()
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
    },
    methods: {
      show (val, index) {
        let user = this.pagination.items[index].key.id
        this.fromIntegral.tables.tableLoading = true
        this.model.default = val
        this.model.user = user
        this.model.index = index

        this.fromIntegral.formInline = {
          id: null,
          text: null,
          number: null,
          key: null
        }

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
      pageChangeUserIntegral: function (index) {
        /**
         * 分页器实现
         */
        this.initHttpUserIntegral()
      },
      pageSizeChangeUserIntegral: function (page) {
        /**
         * 分页条数实现
         */
        this.pagination.pageSize = page
        this.initHttpUserIntegral()
      },
      initHttpUserIntegral: function () {
        /**
         * 用户
         */
        this.loading = true
        axios.userIntegral('GET', {}, null, this.pagination).then(response => {
          this.pagination.items = response.data.results
          this.pagination.count = response.data.count
          this.pagination.next = response.data.next
          this.pagination.previous = response.data.previous
        }).finally(finallys => {
          this.loading = false
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
    }
  }
</script>

<style scoped>

</style>