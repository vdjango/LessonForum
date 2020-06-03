<template>
    <Row :gutter="16" type="flex" justify="center" class="trial-bottom">
        <Col span="12">
            <Card :bordered="false" dis-hover class="trial-top">
                <Tabs value="name1">
                    <TabPane label="答题报告" name="name1">
                        <Card :bordered="false" dis-hover class="trial-top">
                            <h4>答题-20201210123000</h4><br>
                            <Row :gutter="16" type="flex">
                                <Col>
                                    <Card :bordered="false" dis-hover :padding="0">
                                        <Icon type="md-document"/>
                                        交卷时间：2020年01月25日 21:19
                                    </Card>
                                </Col>
                                <Col>
                                    <Card :bordered="false" dis-hover :padding="0">
                                        <Icon type="md-alarm"/>
                                        答题用时：6分35秒
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                        <!--选择题-->
                        <Card :bordered="false" dis-hover class="trial-top">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">选择题</Tag>
                            <!-- green blue orange red -->
                            <Tag color="red" style="margin-left: 20px">正确率：0.0%</Tag>
                            <Divider dashed size="small" orientation="left">每小题2分</Divider>
                            <p class="trial-top">
                                1、 以下对DHCP租约过程描述正确的是（ ）。
                                <Tag color="red">选择二项</Tag>
                            </p>
                            <div class="trial-top trial-left">
                                <p>
                                    a） DHCP Discover包的源地址为0.0.0.0，目标地址为0.0.0.0
                                </p>
                                <p>
                                    b） DHCP Offer包中包含DHCP客户机的MAC地址
                                </p>
                                <p>
                                    c） DHCP Request包用于发送IP请求
                                </p>
                                <p>
                                    d） DHCP Nack包表明客户的请求是无效的
                                </p>
                            </div>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案： d
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案： c
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                2、 使用DHCP有哪些好处（）
                                <Tag color="red">选择三项</Tag>
                            </p>
                            <div class="trial-top trial-left">
                                <p>
                                    a） 减少管理员的工作量
                                </p>
                                <p>
                                    b） 避免IP冲突
                                </p>
                                <p>
                                    c） 提高IP利用率
                                </p>
                                <p>
                                    d） 节省IP使用
                                </p>
                            </div>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案： a
                                </Tag>
                                <Tag type="dot" color="success">
                                    我的答案： a
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                2、 要实现动态分配IP地址，至少要求在网络中部署一台（ ）。
                                <Tag color="red">选择一项</Tag>
                            </p>
                            <div class="trial-top trial-left">
                                <p>a） DNS服务器</p>
                                <p>b） DHCP服务器</p>
                                <p>c） IIS服务器</p>
                                <p>d） FTP服务器</p>
                            </div>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案： c
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案： a
                                </Tag>
                            </div>
                        </Card>

                        <!--判断题-->
                        <Card :bordered="false" dis-hover class="trial-top">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">判断题</Tag>
                            <Tag color="red" style="margin-left: 20px">正确率：0.0%</Tag>
                            <Divider dashed size="small" orientation="left">每小题1分</Divider>
                            <p class="trial-top">
                                1、 服务器应具有静态的IP地址
                            </p>
                            <div class="trial-top trial-judge-left">
                                <Tag type="dot" color="success">
                                    正确答案：
                                    <Icon type="md-checkmark"/>
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：
                                    <Icon type="md-close"/>
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                2、 在域环境下需要使用活动目录服务器授权DHCP服务
                            </p>
                            <div class="trial-top trial-judge-left">
                                <Tag type="dot" color="success">
                                    正确答案：
                                    <Icon type="md-checkmark"/>
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：
                                    <Icon type="md-close"/>
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                3、 建立作用域并激活
                            </p>
                            <div class="trial-top trial-judge-left">
                                <Tag type="dot" color="success">
                                    正确答案：
                                    <Icon type="md-checkmark"/>
                                </Tag>
                                <Tag type="dot" color="success">
                                    我的答案：
                                    <Icon type="md-checkmark"/>
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                4、 必须指定IP地址的租用期限
                            </p>
                            <div class="trial-top trial-judge-left">
                                <Tag type="dot" color="success">
                                    正确答案：
                                    <Icon type="md-checkmark"/>
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：
                                    <Icon type="md-close"/>
                                </Tag>
                            </div>
                        </Card>

                        <!--简答题-->
                        <Card :bordered="false" dis-hover class="trial-top">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">简答题</Tag>
                            <Tag color="red" style="margin-left: 20px">正确率：0.0%</Tag>
                            <Divider dashed size="small" orientation="left">每小题5分</Divider>
                            <p class="trial-top">
                                1、 DHCP 有哪些优点？
                            </p>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                2、 简述DHCP的租约过程？
                            </p>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                            </div>
                        </Card>

                        <Card :bordered="false" dis-hover class="trial-top">
                            <p>
                                3、 DHCP 客户段如何更新租约过程？
                            </p>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                            </div>
                        </Card>

                        <!--机试题-->
                        <Card :bordered="false" dis-hover class="trial-top">
                            <Divider></Divider>
                            <Tag size="large" type="dot" color="primary">机试题</Tag>
                            <Tag color="red" style="margin-left: 20px">正确率：0.0%</Tag>
                            <Divider dashed size="small" orientation="left">每小题50分</Divider>
                            <p class="trial-top">
                                实验需求：
                            </p>
                            <p style="margin-top: 10px" class="trial-left">管理员使用windows server
                                2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页，而通过http://www.benet.com/shouye.html则可以访问首页。</p>
                            <div class="trial-top trial-left">
                                <Tag type="dot" color="success">
                                    正确答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                                <Tag type="dot" color="error">
                                    我的答案：使用windows server
                                    2016搭建了web服务，并在DNS服务器上注册了主机记录www.benet.com。可是用户反映通过http://www.benet.com不能正常访问网站首页
                                </Tag>
                            </div>
                        </Card>
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
    Tag,
    Button,
    Icon,
    Divider,
    Tabs,
    TabPane,
    Collapse,
  } from 'view-design'

  export default {
    name: 'index',
    props: {
      id: {
        type: [String, Number]
      }
    },
    created () {
      console.log(this.id)
    },
    components: {
      Row,
      Col,
      Card,
      Tag,
      Button,
      Icon,
      Divider,
      Tabs,
      TabPane,
      Collapse,
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