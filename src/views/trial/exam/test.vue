<template>
    <Scroll height="1200" :on-reach-bottom="handleReachBottom" :distance-to-edge="5">
        <Spin fix v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>{{ info.text }}</div>
        </Spin>

        <Row :gutter="16" type="flex" justify="center" class="trial-bottom">
            <Col span="18">
                <Alert show-icon v-if="data.multiple.choice.length >1">
                    猜猜红色是啥
                    <Icon type="ios-bulb-outline" slot="icon"></Icon>
                    <template slot="desc">
                        选项被标柱绿色是正确答案哦
                    </template>
                </Alert>
                <Card dis-hover class="trial-top">
                    <h4>开始刷题吧</h4>
                    <Button slot="extra" type="text" :to="{name: 'modular', params: {modularId: this.id}}">退出刷题
                    </Button>
                </Card>

                <div v-for="(item, key) in data.multiple.pagination.items" :key="'a' + key">
                    <!--选择题-->
                    <Card :bordered="false" v-if="item.state === 0" dis-hover class="trial-top">
                        <div v-if="key === 0">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">选择题</Tag>
                            <Divider dashed size="small" orientation="left">每小题2分</Divider>
                        </div>

                        <p class="trial-top">{{key+1}}、 {{item.text}}
                            <Tag color="blue">选择{{ getQuestionCount(item.questions, null) }}项</Tag>
                        </p>
                        <CheckboxGroup v-model="data.multiple.choice[key]" class="trial-top trial-left">
                            <div v-for="(quest_item, quest_key) in item.questions" :key="quest_key">
                                <div v-if="getQuestionCount(item.questions, data.multiple.choice[key])">
                                    <Checkbox :label="key+','+quest_key" v-if="quest_item.solu"
                                              style="color: #19be6b;"
                                              :disabled="getQuestionCount(item.questions, data.multiple.choice[key])">
                                        {{choices[quest_item.choice_gid].display_name}}） {{quest_item.choice}}
                                    </Checkbox>
                                    <Checkbox :label="key+','+quest_key" v-else style="color: #ed4014;"
                                              :disabled="getQuestionCount(item.questions, data.multiple.choice[key])">
                                        {{choices[quest_item.choice_gid].display_name}}） {{quest_item.choice}}
                                    </Checkbox>
                                </div>
                                <Checkbox :label="key+','+quest_key" v-else
                                          :disabled="getQuestionCount(item.questions, data.multiple.choice[key])">
                                    {{choices[quest_item.choice_gid].display_name}}） {{quest_item.choice}}
                                </Checkbox>
                            </div>
                        </CheckboxGroup>
                    </Card>
                </div>

                <div v-for="(item, key) in data.judge.pagination.items" :key="'b' + key">
                    <!--判断题-->
                    <Card :bordered="false" dis-hover class="trial-top" v-if="item.state === 1">
                        <div v-if="key === 0">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">判断题</Tag>
                            <Divider dashed size="small" orientation="left">每小题1分</Divider>
                        </div>

                        <p class="trial-top">{{key+1}}、 {{item.text}}</p>

                        <RadioGroup v-model="data.judge.choice[key]" class="trial-top trial-judge-left">
                            <div v-if="getQuestionCount(item.questions, data.judge.choice[key])">
                                <Radio label="0" v-if="item.questions[0].solu"
                                       class="exam-success"
                                       :disabled="!(data.judge.choice[key] === undefined)">
                                    <Icon type="md-checkmark"/><!--y-->
                                </Radio>
                                <Radio label="0" v-else-if="!item.questions[0].solu"
                                       class="exam-error"
                                       :disabled="!(data.judge.choice[key] === undefined)">
                                    <Icon type="md-checkmark"/><!--y-->
                                </Radio>

                                <Radio label="1"
                                       v-if="!item.questions[0].solu"
                                       class="exam-success"
                                       :disabled="!(data.judge.choice[key] === undefined)">
                                    <Icon type="md-close"/> <!--x-->
                                </Radio>
                                <Radio label="1"
                                       v-else-if="item.questions[0].solu"
                                       class="exam-error"
                                       :disabled="!(data.judge.choice[key] === undefined)">
                                    <Icon type="md-close"/> <!--x-->
                                </Radio>
                            </div>
                            <div v-else>
                                <Radio label="0" :disabled="!(data.judge.choice[key] === undefined)">
                                    <Icon type="md-checkmark"/><!--y-->
                                </Radio>
                                <Radio label="1" :disabled="!(data.judge.choice[key] === undefined)">
                                    <Icon type="md-close"/> <!--x-->
                                </Radio>
                            </div>
                        </RadioGroup>
                    </Card>
                </div>

                <div v-for="(item, key) in data.answer.pagination.items" :key="'c' + key">
                    <!--简答题-->
                    <Card :bordered="false" dis-hover class="trial-top" v-if="item.state === 2">
                        <div v-if="key === 0">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">简答题</Tag>
                            <Divider dashed size="small" orientation="left">每小题5分</Divider>
                        </div>
                        <p class="trial-top">{{key+1}}、 {{item.text}}</p>
                        <div v-for="(quest_item, quest_key) in item.questions" :key="quest_key">
                            <Input v-model="quest_item.answer" type="textarea"
                                   class="trial-top trial-left"
                                   disabled
                                   :autosize="{minRows: 2,maxRows: 5}"/>
                        </div>
                    </Card>
                </div>
            </Col>
        </Row>
    </Scroll>
</template>

<script>
  import {
    Row,
    Col,
    Card,
    Affix,
    Tag,
    Button,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Icon,
    Input,
    Divider,
    Modal,
    Message,
    Scroll,
    Spin,
    Notice,
    BackTop,
    Alert
  } from 'view-design'
  import downTime from '../../../components/time/downTime'
  import axios from '@/axios/index'
  import dev from '@/../dev.env'

  export default {
    name: 'index',
    props: {
      id: {
        type: [String, Number]
      }
    },
    data () {
      return {
        loading: false,
        choices: [
          {
            'value': 0,
            'display_name': 'A'
          },
          {
            'value': 1,
            'display_name': 'B'
          },
          {
            'value': 2,
            'display_name': 'C'
          },
          {
            'value': 3,
            'display_name': 'D'
          },
          {
            'value': 4,
            'display_name': 'E'
          },
          {
            'value': 5,
            'display_name': 'F'
          },
          {
            'value': 6,
            'display_name': 'G'
          }
        ],
        data: {
          multiple: {
            loading: false,
            choice: [],
            count: 0, // 当前题总数
            success_count: 0, // 正确数量
            error_count: 0, // 错误数量
            rate: 0, // 正确率
            amount: 10, // 获取选择题数量
            pagination: {
              items: [],
              index: 1,
              pageSize: 5,
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
            }
          },
          judge: {
            loading: false,
            choice: [],
            count: 0, // 当前题总数
            success_count: 0, // 正确数量
            error_count: 0, // 错误数量
            rate: 0, // 正确率
            amount: 10, // 获取判断题数量
            pagination: {
              items: [],
              index: 1,
              pageSize: 5,
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
            }
          },
          answer: {
            loading: false,
            choice: [],
            count: 0, // 当前题总数
            success_count: 0, // 正确数量
            error_count: 0, // 错误数量
            rate: 0, // 正确率
            amount: 10, // 获取简答题数量
            pagination: {
              items: [],
              index: 1,
              pageSize: 5,
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
            }
          },
          rate: 0 // 正确率
        },
        info: {
          prefix_text: '开始您的第 ',
          suffix_text: ' 波人生旅途吧，祝您刷题愉快！',
          count: 1,
          text: '正在加载题目中，请稍后...' // this.prefix_text + this.count + this.suffix_text
        }
      }
    },
    created () {
      console.log(this.data.multiple.choice[6])
      this.initHttpExamAll()
    },
    methods: {
      /**
       * 计算一道题的得分
       * 多个选项多个分数，取最高值
       * @param data ??.pagination.items
       * @param question 答题的选项 data.??.choice
       * @returns {number}
       */
      setNumberCount: function (question, data) {
        let score_count = 0
        if (!question) return 0
        for (let i = 0; question.length > i; i++) {
          let key = question[i].split(',')
          let _ques = 0
          let _data = data[key[0]]
          if (key.length > 1) {
            if (!_data['questions'][key[1]].solu) return 0 // 如果答错，0分
            if (!(this.getSoluCount(_data['questions']) <= question.length)) return 0// 如果选项答题数量不足
            // let count = (this.getSoluCount(_data['questions']) <= data.length) // 如果选项答题数量不足
            _ques = _data['questions'][key[1]].score
          } else {
            if (!_data['questions'][key[0]].solu) return 0 // 如果答错，0分
            if (!(this.getSoluCount(_data['questions']) <= question.length)) return 0// 如果选项答题数量不足
            // let count = (this.getSoluCount(_data['questions']) <= data.length) // 如果选项答题数量不足
            _ques = _data['questions'][key[0]].score
          }
          if (_ques > score_count) score_count = _ques
        }
        return score_count
      },
      /**
       * 计算所有题得分
       * @returns {number}
       */
      setCount: function () {
        let score_count = 0
        /**
         * 选择题得分
         */
        for (let i = 0; this.data.multiple.choice.length > i; i++) {
          let len_multiple = this.data.multiple.choice[i]
          let len_data = this.data.multiple.pagination.items
          let success_count = this.setNumberCount(len_multiple, len_data)
          this.data.multiple.success_count = success_count
          this.data.multiple.error_count = Number(len_data.length) - Number(success_count)
          this.data.multiple.count = len_data.length
          this.data.multiple.rate = score_count / len_data.length * 100
          score_count = Number(success_count) + Number(score_count)
        }
        /**
         * 判断题得分
         */
        for (let i = 0; this.data.judge.choice.length > i; i++) {
          let len_multiple = this.data.judge.choice[i]
          let len_data = this.data.judge.pagination.items
          let success_count = this.setNumberCount(len_multiple, len_data)
          this.data.judge.success_count = success_count
          this.data.judge.error_count = Number(len_data.length) - Number(success_count)
          this.data.judge.count = len_data.length
          this.data.judge.rate = score_count / len_data.length * 100
          score_count = Number(success_count) + Number(score_count)
        }
        /**
         * 选择题得分
         */
        for (let i = 0; this.data.answer.choice.length > i; i++) {
          let len_multiple = this.data.answer.choice[i]
          let len_data = this.data.answer.pagination.items
          let success_count = this.setNumberCount(len_multiple, len_data)
          this.data.answer.success_count = success_count
          this.data.answer.error_count = Number(len_data.length) - Number(success_count)
          this.data.answer.count = len_data.length
          this.data.answer.rate = score_count / len_data.length * 100
          score_count = Number(success_count) + Number(score_count)
        }
        /**
         * 计算正确率
         */
        let a = this.data.multiple.pagination.items.length
        let b = this.data.judge.pagination.items.length
        let c = this.data.answer.pagination.items.length
        let rate = score_count / (Number(a) + Number(b) + Number(c)) * 100
        return score_count
      },
      /**
       * 漏题检测
       */
      missExam: function () {
        /**
         * 选择题
         */
        for (let i = 0; this.data.multiple.choice.length > i; i++) {
          let len_multiple = this.data.multiple.choice[i]
          let len_data = this.data.multiple.pagination.items
          for (let i = 0; len_multiple.length > i; i++) {
            let key = len_multiple[i].split(',')
            let _data = len_data[key[0]]
            if (key.length > 1) {
              if (!(this.getSoluCount(_data['questions']) <= len_multiple.length)) return false// 如果选项答题数量不足
            } else {
              if (!(this.getSoluCount(_data['questions']) <= len_multiple.length)) return false// 如果选项答题数量不足
            }
          }
        }
        return true
      },
      /**
       * 触发 底部触发 加载更多
       * @returns {Promise<unknown>}
       */
      handleReachBottom () {

        let choice_data = (this.data.multiple.choice && this.data.judge.choice)
        let choice_length = (this.data.multiple.choice.length + this.data.judge.choice.length)
        let counts = (this.data.multiple.pagination.items.length + this.data.judge.pagination.items.length)

        let ss = this.setCount()
        console.log(ss)

        if (this.missExam()) {
          if (choice_data && choice_length >= counts) {
            this.loading = true
            Modal.confirm({
              title: '继续刷题吗',
              content: '<p>页面会刷新，获取新的测试题？</p>',
              okText: '继续',
              onOk: () => {
                return new Promise(resolve => {
                  this.info.count++
                  this.initHttpExamAll()
                  resolve()
                })
              },
              onCancel: () => {
                this.loading = false
              }
            })
          } else {
            Notice.info({
              title: '阿哦！实在不好意思',
              desc: '您好像漏题了吧？'
            })
          }
        } else {
          Notice.info({
            title: '阿哦！实在不好意思',
            desc: '选择题并没有完成哦'
          })
        }

      },

      /**
       * 统计当前题目有多少个可选项
       * @param data item['questions']
       * @returns {number}
       */
      getSoluCount: function (data) {
        let count = 0
        for (let i = 0; data.length > i; i++) {
          if (data[i].solu) count++
        }
        return count
      },
      getQuestionCount: function (ques, choice) {
        /**
         * 统计题目有多少个正确答案
         */
        if (choice === undefined) return false
        let count = this.getSoluCount(ques)
        if (choice === null) return count
        return count <= choice.length
      },
      /**
       * 第一条答案索引arr[0]
       * 第二条答案索引arr[1]
       * 第三条答案索引arr[2]
       * arr[N] = N 第N条答案索引，具备多个索引,只有一个索引时N等于0
       * arr[N][0] = pagination.items.key 题目索引
       * arr[N][1] = pagination.items.questions.key 答案索引
       * @param sp  [pagination.items.key, pagination.items.questions.key]
       * @returns {[]}
       */
      splits: function (sp) {
        let arr = []
        for (let i = 0; sp.length > i; i++) {
          arr.push(sp[i].split(','))
        }
        return arr
      },
      initHttpExamAll: function () {
        this.initHttpExam('GET', {
          key_class_ques_chapter: this.id,
          state: 0
        }, null, this.data.multiple.pagination).then(response => {
          this.data.multiple.pagination.items = response.data.results
          this.data.multiple.pagination.count = response.data.count
          this.data.multiple.pagination.next = response.data.next
          this.data.multiple.pagination.previous = response.data.previous
          this.data.multiple.choice = []
        })
        this.initHttpExam('GET', {
          key_class_ques_chapter: this.id,
          state: 1
        }, null, this.data.judge.pagination).then(response => {
          this.data.judge.pagination.items = response.data.results
          this.data.judge.pagination.count = response.data.count
          this.data.judge.pagination.next = response.data.next
          this.data.judge.pagination.previous = response.data.previous
          this.data.judge.choice = []
        })
        this.initHttpExam('GET', {
          key_class_ques_chapter: this.id,
          state: 2
        }, null, this.data.answer.pagination).then(response => {
          this.data.answer.pagination.items = response.data.results
          this.data.answer.pagination.count = response.data.count
          this.data.answer.pagination.next = response.data.next
          this.data.answer.pagination.previous = response.data.previous
          this.data.answer.choice = []
        })
      },
      initHttpExam: function (methods = 'GET', data = { key_class_ques_chapter: this.id }, index = null, pagination = {}) {
        /**
         * 获取题库
         */
        this.loading = true
        this.data.multiple.pagination.pageSize = this.data.multiple.amount
        this.data.judge.pagination.pageSize = this.data.judge.amount
        this.data.answer.pagination.pageSize = this.data.answer.amount

        return new Promise((resolve, reject) => {
          axios.questionExam(
            methods,
            data,
            index,
            pagination
          ).then(response => {
            return resolve(response)
          }).catch(error => {
            return reject(error)
          }).finally(finallys => {
            setTimeout(() => {
              this.info.text = this.info.prefix_text + this.info.count + this.info.suffix_text
              setTimeout(() => {
                this.loading = false
                this.info.text = '正在加载题目中，请稍后...'
              }, 1500)
            }, 500)
            return resolve(finallys)
          })
        })
      }
    },
    components: {
      Row,
      Col,
      Card,
      Affix,
      Tag,
      Button,
      RadioGroup,
      Radio,
      CheckboxGroup,
      Checkbox,
      Icon,
      Input,
      Divider,
      downTime,
      Modal,
      Message,
      Scroll,
      Spin,
      BackTop,
      Alert
    },
    computed: {
      multiple: function () {

      }
    }
  }
</script>

<style scoped>
    .trial-top {
        margin-top: 20px;
    }

    .trial-bottom {
        margin-bottom: 120px;
    }

    .trial-left {
        margin-left: 10px;
    }

    .trial-judge-left {
        margin-left: 25px;
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

    .exam-success {
        color: #19be6b;
    }

    .exam-error {
        color: #ed4014;
    }
</style>