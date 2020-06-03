<template>
    <Card :bordered="false" dis-hover>
        <Spin fix v-if="tables.tableLoading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>

        <Card :bordered="false" dis-hover>
            <Row type="flex" justify="center" align="middle" class="code-row-bg">
                <Col>
                    <!--          43a3fb  stroke-color="#5cb85c" stroke-color="#ff5500"-->
                    <i-circle :percent="parseInt(tables.tableData.number)"
                              dashboard :size="250"
                              :trail-width="4"
                              :stroke-width="5"
                              stroke-linecap="square"
                              :stroke-color="tables.tableColor">
                        <div class="demo-Circle-custom">
                            <h1>{{ tables.tableData.number }}分</h1>
                            <p>违规记录{{ tables.tableData.violation.length }}次</p>
                            <span>
                        {{tables.text}}
                    </span>
                        </div>
                    </i-circle>
                </Col>
            </Row>
        </Card>

        <Card :bordered="false" dis-hover>
            <p slot="title">违规记录</p>
            <Table height="600" :columns="tables.tableLabel" :data="tables.tableData.violation">
                <template slot-scope="{ row }" slot="date">
                    <datetimes :time="row.date"></datetimes>
                </template>
            </Table>
        </Card>
    </Card>

</template>

<script>
  import {
    Table,
    TableColumn,
    Card,
    Circle,
    Row,
    Col,
    Spin,
    Icon
  } from 'view-design'
  import datetimes from '@/components/datetime/index'
  import axios from '@/axios/index'

  export default {
    name: 'integralIndex',
    data () {
      return {
        active: 3,
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
      }
    },
    created () {
      this.$store.commit('user/setActive', this.active)

      let context = {
        key: this.tables.user
      }
      axios.userIntegral('GET', context).then(res => {
        if (res.data.results.length !== 0) {
          this.tables.tableData = res.data.results[0]
          // if (res.data[0]['violation'].length !== 0) this.tables.tableData.violation = res.data[0]['violation']
        }
      }).catch(err => {
        Message.error('获取用户积分记录失败')
      }).finally(f => {
        if (this.tables.tableData.number >= 70) {
          this.tables.tableColor = '#43a3fb'
          this.tables.text = '加把劲啦'
        }
        if (this.tables.tableData.number < 70 && this.tables.tableData.number >= 60) {
          this.tables.tableColor = '#ff9900'
          this.tables.text = '不是一般的努力'
        }
        if (this.tables.tableData.number < 60) {
          this.tables.tableColor = '#ff5500'
          this.tables.text = '有点遗憾哦'
        }
        this.tables.tableLoading = false
      })
    },
    components: {
      Table,
      TableColumn,
      Card,
      Row,
      Col,
      Spin,
      Icon,
      'i-circle': Circle,
      datetimes
    }
  }
</script>

<style lang="less" scoped>
    .demo-Circle-custom {
        & h1 {
            color: #3f414d;
            font-size: 28px;
            font-weight: normal;
        }

        & p {
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }

        & span {
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;

            &:before {
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -15px;
            }
        ;
        }

        & span i {
            font-style: normal;
            color: #3f414d;
        }
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
