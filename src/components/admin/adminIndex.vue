<template>
    <div class="adminIndex">
      <el-row>
        <el-col class="adminHeaderLeft" v-on:click.native="goToIndex">
          <span class="el-icon-arrow-left"></span>
          <span class="adminHeaderLeftText">返回主页</span>
        </el-col>
        <el-col class="adminHeaderMiddle" v-bind:style="{'width': (widthNow - 300) + 'px'}">
          <span class="adminHeaderMiddleText">你好：{{ username }}</span>
        </el-col>
        <el-col class="adminHeaderRight" v-on:click.native="outLogin()">
          <span class="adminHeaderRightOut">退出登录</span>
        </el-col>
      </el-row>
      <el-row class="adminIndexMenuRow">
        <el-menu
          :default-active=active
          class="adminIndexMenu"
          @select="selectMenu"
          background-color="rgb(180,181,62)"
          active-text-color="rgb(58,66,77)"
          text-color="white"
          v-bind:style="{'height': (heightNow - 50) + 'px'}">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-star-on" v-bind:style="{'color': 'white'}"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="1-1">商品收藏</el-menu-item>
            <el-menu-item index="1-2">信息修改</el-menu-item>
            <el-menu-item index="1-3">购物车</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document-copy" v-bind:style="{'color': 'white'}"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="2-1">订单查看</el-menu-item>
            <el-menu-item index="2-2">订单修改</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon-pacman" v-bind:style="{'margin-left': '5px', 'margin-right': '5px', 'color': 'white'}"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="3-1">评论查看</el-menu-item>
            <el-menu-item index="3-2">评论修改</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-row>
      <router-view v-bind:widthNow="widthNow"></router-view>
    </div>
</template>

<script>
export default {
  name: 'adminIndex',
  components: {},
  props: [],
  created () {
    this.getLength()
    this.username = this.$store.getters.username_getters
    let url = document.location.toString()
    let arrUrl = url.split('//')
    let start = arrUrl[1].indexOf('/')
    let relUrl = arrUrl[1].substring(start)
    if (relUrl === '/#/admin/favorites') {
      this.active = '1-1'
    } else if (relUrl === '/#/admin/modifyUser') {
      this.active = '1-2'
    } else if (relUrl === '/#/admin/shoppingCart') {
      this.active = '1-3'
    }
  },
  data () {
    return {
      width: 0,
      widthNow: 0,
      heightNow: 0,
      username: '',
      active: '1-1'
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取浏览器长宽，更改浏览器两边的长宽
    getLength () {
      let widthNow = document.documentElement.clientWidth
      let heightNow = document.documentElement.clientHeight
      this.widthNow = widthNow
      this.heightNow = heightNow
      let width
      if (widthNow < 1200) {
        width = 0
      } else {
        width = widthNow - 1200
      }
      this.width = width
    },
    // 返回主页
    goToIndex () {
      this.$router.push('/')
    },
    // 退出登录
    outLogin () {
      this.$store.dispatch('token_actions', 'null')
      this.$router.push('/')
    },
    // 点击事件
    selectMenu (index) {
      let url = document.location.toString()
      let arrUrl = url.split('//')
      let start = arrUrl[1].indexOf('/')
      let relUrl = arrUrl[1].substring(start)
      if (index === '1-1' && relUrl !== '/#/admin/favorites') {
        this.$router.push('/admin/favorites')
      } else if (index === '1-2' && relUrl !== '/#/admin/modifyUser') {
        this.$router.push('/admin/modifyUser')
      } else if (index === '1-3' && relUrl !== '/#/admin/shoppingCart') {
        this.$router.push('/admin/shoppingCart')
      }
    }
  },
  mounted () {
    // 实时获取、更改浏览器长宽
    window.onresize = () => {
      this.getLength()
    }
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}
</script>

<style lang="stylus">
.adminIndex
  position fixed
  top 0
  left 0
  right 0
  overflow hidden
  .adminHeaderLeft:hover
    background-color rgb(204,204,204)
    color black
  .adminHeaderLeft
    width 200px
    height 50px
    background-color rgba(180,181,62,0.9)
    cursor pointer
    transition all 0.4s
    color white
    .el-icon-arrow-left
      position absolute
      margin-top 10px
      margin-left 40px
      font-size 28px
    .adminHeaderLeftText
      position absolute
      margin-top 10px
      margin-left 65px
      font-size 20px
      font-family Microsoft YaHei
  .adminHeaderMiddle
    height 50px
    background-color rgb(180,181,62)
    .adminHeaderMiddleText
      position absolute
      margin-top 13px
      right 150px
      font-size 16px
      font-family Microsoft YaHei
      color white
      cursor default
  .adminHeaderRight:hover
    background-color rgb(204,204,204)
    color black
  .adminHeaderRight
    width 100px
    height 50px
    background-color rgba(180,181,62,0.9)
    color white
    cursor pointer
    transition all 0.4s
    .adminHeaderRightOut
      position absolute
      margin-top 14px
      margin-right 14px
      padding-left 17px
      font-size 16px
      font-family Microsoft YaHei
  .adminIndexMenuRow
    overflow hidden
    .adminIndexMenu
      width 200px
      .el-submenu
        .el-submenu__title
          .el-submenu__icon-arrow
            color white
</style>
