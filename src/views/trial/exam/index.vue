<template>
    <Row :gutter="16" type="flex" justify="center" class="trial-bottom">
        <Col span="9">
            <Card dis-hover class="trial-top">
                <h3>刷题</h3>
            </Card>

            <!--选择题-->
            <Card :bordered="false" dis-hover class="trial-top">
                <Divider></Divider>
                <Tag size="large" type="dot" color="primary">选择题</Tag>
                <Divider dashed size="small" orientation="left">每小题2分</Divider>
                <p class="trial-top">
                    1、 以下对DHCP租约过程描述正确的是（ ）。
                    <Tag color="red">选择二项</Tag>
                </p>
                <div class="trial-top trial-left">
                    <!--                    <RadioGroup v-model="border" vertical>-->
                    <!--                        <Radio label="0">a） DHCP Discover包的源地址为0.0.0.0，目标地址为0.0.0.0</Radio>-->
                    <!--                        <Radio label="1">b） DHCP Offer包中包含DHCP客户机的MAC地址</Radio>-->
                    <!--                        <Radio label="2">c） DHCP Request包用于发送IP请求</Radio>-->
                    <!--                        <Radio label="3">d） DHCP Nack包表明客户的请求是无效的</Radio>-->
                    <!--                    </RadioGroup>-->
                    <CheckboxGroup v-model="borderGroup">
                        <p>
                            <Checkbox label="0">a） DHCP Discover包的源地址为0.0.0.0，目标地址为0.0.0.0</Checkbox>
                        </p>
                        <p>
                            <Checkbox label="1">b） DHCP Offer包中包含DHCP客户机的MAC地址</Checkbox>
                        </p>
                        <p>
                            <Checkbox label="2">c） DHCP Request包用于发送IP请求</Checkbox>
                        </p>
                        <p>
                            <Checkbox label="3">d） DHCP Nack包表明客户的请求是无效的</Checkbox>
                        </p>
                    </CheckboxGroup>
                </div>
            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    2、 使用DHCP有哪些好处（）
                    <Tag color="red">选择三项</Tag>
                </p>
                <div class="trial-top trial-left">
                    <!--                    <RadioGroup v-model="border" vertical>-->
                    <!--                        <Radio label="0">a） DHCP Discover包的源地址为0.0.0.0，目标地址为0.0.0.0</Radio>-->
                    <!--                        <Radio label="1">b） DHCP Offer包中包含DHCP客户机的MAC地址</Radio>-->
                    <!--                        <Radio label="2">c） DHCP Request包用于发送IP请求</Radio>-->
                    <!--                        <Radio label="3">d） DHCP Nack包表明客户的请求是无效的</Radio>-->
                    <!--                    </RadioGroup>-->
                    <CheckboxGroup v-model="borderGroup">
                        <p>
                            <Checkbox label="0">a） 减少管理员的工作量</Checkbox>
                        </p>
                        <p>
                            <Checkbox label="1">b） 避免IP冲突</Checkbox>
                        </p>
                        <p>
                            <Checkbox label="2">c） 提高IP利用率</Checkbox>
                        </p>
                        <p>
                            <Checkbox label="3">d） 节省IP使用</Checkbox>
                        </p>
                    </CheckboxGroup>
                </div>

            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    2、 要实现动态分配IP地址，至少要求在网络中部署一台（ ）。
                    <Tag color="red">选择一项</Tag>
                </p>
                <div class="trial-top trial-left">
                    <RadioGroup v-model="border" vertical>
                        <Radio label="0">a） DNS服务器</Radio>
                        <Radio label="1">b） DHCP服务器</Radio>
                        <Radio label="2">c） IIS服务器</Radio>
                        <Radio label="3">d） FTP服务器</Radio>
                    </RadioGroup>
                    <!--                    <CheckboxGroup v-model="borderGroup">-->
                    <!--                        <Checkbox label="0">a） DHCP Discover包的源地址为0.0.0.0，目标地址为0.0.0.0</Checkbox>-->
                    <!--                        <Checkbox label="1">b） DHCP Offer包中包含DHCP客户机的MAC地址</Checkbox>-->
                    <!--                        <Checkbox label="2">c） DHCP Request包用于发送IP请求</Checkbox>-->
                    <!--                        <Checkbox label="3">d） DHCP Nack包表明客户的请求是无效的</Checkbox>-->
                    <!--                    </CheckboxGroup>-->
                </div>

            </Card>

            <!--判断题-->
            <Card :bordered="false" dis-hover class="trial-top">
                <Divider></Divider>
                <Tag size="large" type="dot" color="primary">判断题</Tag>
                <Divider dashed size="small" orientation="left">每小题1分</Divider>
                <p class="trial-top">
                    1、 服务器应具有静态的IP地址
                </p>
                <div class="trial-top trial-judge-left">
                    <RadioGroup v-model="border" type="button">
                        <Radio label="0" border>
                            <Icon type="md-checkmark"/>
                        </Radio>
                        <Radio label="1" border>
                            <Icon type="md-close"/>
                        </Radio>
                    </RadioGroup>
                </div>
            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    2、 在域环境下需要使用活动目录服务器授权DHCP服务
                </p>
                <div class="trial-top trial-judge-left">
                    <RadioGroup v-model="border" type="button">
                        <Radio label="0" border>
                            <Icon type="md-checkmark"/>
                        </Radio>
                        <Radio label="1" border>
                            <Icon type="md-close"/>
                        </Radio>
                    </RadioGroup>
                </div>
            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    3、 建立作用域并激活
                </p>
                <div class="trial-top trial-judge-left">
                    <RadioGroup v-model="border" type="button">
                        <Radio label="0" border>
                            <Icon type="md-checkmark"/>
                        </Radio>
                        <Radio label="1" border>
                            <Icon type="md-close"/>
                        </Radio>
                    </RadioGroup>
                </div>
            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    4、 必须指定IP地址的租用期限
                </p>
                <div class="trial-top trial-judge-left">
                    <RadioGroup v-model="border" type="button">
                        <Radio label="0" border>
                            <Icon type="md-checkmark"/>
                        </Radio>
                        <Radio label="1" border>
                            <Icon type="md-close"/>
                        </Radio>
                    </RadioGroup>
                </div>
            </Card>

            <!--简答题-->
            <Card :bordered="false" dis-hover class="trial-top">
                <Divider></Divider>
                <Tag size="large" type="dot" color="primary">简答题</Tag>
                <Divider dashed size="small" orientation="left">每小题5分</Divider>
                <p class="trial-top">
                    1、 DHCP 有哪些优点？
                </p>
                <div class="trial-top trial-left">
                    <Input v-model="value" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请开始你的精彩表演。。。"
                    />
                </div>
            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    2、 简述DHCP的租约过程？
                </p>
                <div class="trial-top trial-left">
                    <Input v-model="value" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请开始你的精彩表演。。。"
                    />
                </div>
            </Card>

            <Card :bordered="false" dis-hover class="trial-top">
                <p>
                    3、 DHCP 客户段如何更新租约过程？
                </p>
                <div class="trial-top trial-left">
                    <Input v-model="value" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="请开始你的精彩表演。。。"
                    />
                </div>
            </Card>

            <!--机试题-->
            <Card :bordered="false" dis-hover class="trial-top">
                <Divider></Divider>
                <Tag size="large" type="dot" color="primary">机试题</Tag>
                <Divider dashed size="small" orientation="left">每小题50分</Divider>
                <p class="trial-top">
                    实验需求：
                </p>
                <p style="margin-top: 10px" class="trial-left">管理员使用windows server
                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页，而通过http://www.benet.com/shouye.html则可以访问首页。</p>
                <div class="trial-top">
                    <Input v-model="value" type="textarea"
                           :autosize="{minRows: 5,maxRows: 8}"
                           placeholder="请开始你的精彩表演。。。"
                    />
                </div>
            </Card>

        </Col>
        <Col span="3">
            <Affix>
                <Card dis-hover class="trial-top">
                    <Row :gutter="16" type="flex" justify="center">
                        <Col>
                            <Icon size="46" type="md-alarm"/>
                        </Col>
                        <Col>
                            <downTime
                                    :endTime="1580042280"
                                    endMsg="考试时间到"
                            />
                        </Col>
                    </Row>
                    <div class="trial-top">
                        <Button type="primary" shape="circle" long @click="save" :loading="loader">提交</Button>
                    </div>
                </Card>
            </Affix>
        </Col>
    </Row>
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
    Message
  } from 'view-design'
  import downTime from '../../../components/time/downTime'

  export default {
    name: 'index',
    props: {
      id: {
        type: [String, Number]
      }
    },
    data () {
      return {
        border: '0',
        borderGroup: ['0'],
        value: null,
        modal: false,
        loader: false
      }
    },
    created () {
      console.log(this.id)
    },
    methods: {
      save () {
        Modal.confirm({
          title: '提示',
          content: '确定要提交吗？',
          loading: true,
          onOk: () => {
            this.loader = true
            setTimeout(() => {
              Modal.remove()
              Message.success('提交')
              this.loader = false
              this.$router.push({
                name: 'trial_report',
                params: {
                  id: 111
                }
              })
            }, 2000)
          },
          onCancel: () => {
            Message.info('取消')
          }
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
      Message
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
</style>