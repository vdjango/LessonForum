<template>
    <Row type="flex" justify="center">
        <Col span="6">
            <Card :bordered="false" dis-hover>
                <Menu theme="light" :active-name="active">
                    <MenuGroup title="个人信息">
                        <MenuItem :name="1" :to="{name:'user_info'}">
                            <Icon type="md-document"/>
                            基本信息
                        </MenuItem>
                        <MenuItem :name="2" :to="{name:'working'}">
                            <Icon type="md-school"/>
                            工作情况
                        </MenuItem>
                    </MenuGroup>
                    <MenuGroup title="在校信息">
                        <MenuItem :name="3" :to="{name:'integral'}">
                            <Icon type="md-ribbon"/>
                            积分记录
                        </MenuItem>
                        <MenuItem :name="5" :to="{name:'exam'}">
                            <Icon type="md-paper"/>
                            考试记录
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </Card>
        </Col>
        <Col span="18">
            <router-view name="user"></router-view>
        </Col>
    </Row>
</template>

<script>
  import {
    Row,
    Col,
    Menu,
    Submenu,
    MenuGroup,
    MenuItem,
    Icon,
    Card
  } from 'view-design'

  export default {
    name: 'userInfoIndex',
    data () {
      return {
        active: 0
      }
    },
    computed: {
      wactive: function () {
        return this.$store.getters['user/getActive']
      }
    },
    watch: {
      wactive: function (a, b) {
        console.log(a, b)
        this.active = a
      }
    },
    components: {
      Row,
      Col,
      Menu,
      Submenu,
      MenuGroup,
      MenuItem,
      Icon,
      Card
    }
  }
</script>

<style scoped>
    .code-row-bg {
        background: #2db7f5;
    }

    >>> .ivu-form-item, >>> .ivu-form-item > .ivu-form-item-label {
        margin-bottom: 0;
    }

    >>> .ivu-form .ivu-divider-horizontal {
        margin: 15px 0 15px 0;
    }
</style>
