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
            <el-menu-item index="favoritesSign">商品收藏</el-menu-item>
            <el-menu-item index="modifyUserSign">信息修改</el-menu-item>
            <el-menu-item index="shoppingCartSign">购物车</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document-copy" v-bind:style="{'color': 'white'}"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="lookOrderSign">订单查看</el-menu-item>
            <el-menu-item index="modifyOrderSign">订单修改</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon-pacman" v-bind:style="{'margin-left': '5px', 'margin-right': '5px', 'color': 'white'}"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item index="addRatingSign">评论添加</el-menu-item>
            <el-menu-item index="lookRatingSign">评论查看</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="icon-database" v-bind:style="{'margin-left': '5px', 'margin-right': '5px', 'color': 'white'}"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="addGoodSign">商品添加</el-menu-item>
            <el-menu-item index="lookGoodsManagementSign">库存查看</el-menu-item>
            <el-menu-item index="lookReportsSign">报表查看</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-row>
      <div class="content" v-bind:style="{'width': contentWidth + 'px'}">
        <Tabs
          type="card"
          closable
          :animated="false"
          :value="tabValue"
          @on-tab-remove="handleTabRemove">
          <TabPane label="商品收藏" v-if="favoritesSign" name="favoritesSign" v-bind:style="{'height': contentHeight + 'px'}">
            <favorites
              v-bind:tableHeightNow="tableHeightNow"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></favorites>
          </TabPane>
          <TabPane label="信息修改" v-if="modifyUserSign" name="modifyUserSign" v-bind:style="{'height': contentHeight + 'px'}">
            <modifyUser
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"
              v-bind:modifyUserHeightNow="modifyUserHeightNow"></modifyUser>
          </TabPane>
          <TabPane label="购物车" v-if="shoppingCartSign" name="shoppingCartSign" v-bind:style="{'height': contentHeight + 'px'}">
            <shoppingCart
              v-bind:tableHeightNow="tableHeightNow"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></shoppingCart>
          </TabPane>
          <TabPane label="订单查看" v-if="lookOrderSign" name="lookOrderSign" v-bind:style="{'height': contentHeight + 'px'}">
            <lookOrder
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></lookOrder>
          </TabPane>
          <TabPane label="订单修改" v-if="modifyOrderSign" name="modifyOrderSign" v-bind:style="{'height': contentHeight + 'px'}">
            <modifyOrder
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></modifyOrder>
          </TabPane>
          <TabPane label="评论添加" v-if="addRatingSign" name="addRatingSign" v-bind:style="{'height': contentHeight + 'px'}">
            <addRating
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></addRating>
          </TabPane>
          <TabPane label="评论查看" v-if="lookRatingSign" name="lookRatingSign" v-bind:style="{'height': contentHeight + 'px'}">
            <lookRating
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></lookRating>
          </TabPane>
          <TabPane label="商品添加" v-if="addGoodSign" name="addGoodSign" v-bind:style="{'height': contentHeight + 'px'}">
            <addGood
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></addGood>
          </TabPane>
          <TabPane label="库存查看" v-if="lookGoodsManagementSign" name="lookGoodsManagementSign" v-bind:style="{'height': contentHeight + 'px'}">
            <lookGoodsManagement
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></lookGoodsManagement>
          </TabPane>
          <TabPane label="报表查看" v-if="lookReportsSign" name="lookReportsSign" v-bind:style="{'height': contentHeight + 'px'}">
            <lookReports
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></lookReports>
          </TabPane>
        </Tabs>
      </div>
    </div>
</template>

<script>
import addGood from './addGood/addGood'
import addRating from './addRating/addRating'
import favorites from './favorites/favorites'
import lookGoodsManagement from './lookGoodsManagement/lookGoodsManagement'
import lookOrder from './lookOrder/lookOrder'
import lookRating from './lookRating/lookRating'
import modifyOrder from './modifyOrder/modifyOrder'
import modifyUser from './modifyUser/modifyUser'
import shoppingCart from './shoppingCart/shoppingCart'
import lookReports from './lookReports/lookReports'
export default {
  name: 'adminIndex',
  components: {
    addGood,
    addRating,
    favorites,
    lookGoodsManagement,
    lookOrder,
    lookRating,
    modifyOrder,
    modifyUser,
    shoppingCart,
    lookReports
  },
  props: [],
  created () {
    this.getLength()
    this.username = this.$store.getters.username_getters
  },
  data () {
    return {
      widthNow: 0,
      heightNow: 0,
      tableHeightNow: 0,
      modifyUserHeightNow: 0,
      contentWidth: 0,
      contentHeight: 0,
      username: '',
      active: 'favoritesSign',
      addGoodSign: false,
      addRatingSign: false,
      favoritesSign: true,
      lookGoodsManagementSign: false,
      lookOrderSign: false,
      lookRatingSign: false,
      modifyOrderSign: false,
      modifyUserSign: false,
      shoppingCartSign: false,
      lookReportsSign: false,
      tabValue: 'favoritesSign'
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
      // tableHeightNow
      if (heightNow < 896) {
        this.tableHeightNow = 750 - (896 - heightNow)
      } else {
        this.tableHeightNow = 750
      }
      // modifyUser
      if (heightNow < 866) {
        this.modifyUserHeightNow = 660 - (866 - heightNow)
      } else {
        this.modifyUserHeightNow = 660
      }
      // content整体宽度
      if (widthNow < 130) {
        this.contentWidth = 0
      } else {
        this.contentWidth = widthNow - 152
      }
      // content整体高度
      if (heightNow < 82) {
        this.contentHeight = 0
      } else {
        this.contentHeight = heightNow - 82
      }
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
    // 点击打开子标签事件
    selectMenu (index) {
      this.tabValue = index
      if (index === 'addGoodSign') {
        this.addGoodSign = true
      } else if (index === 'addRatingSign') {
        this.addRatingSign = true
      } else if (index === 'favoritesSign') {
        this.favoritesSign = true
      } else if (index === 'lookGoodsManagementSign') {
        this.lookGoodsManagementSign = true
      } else if (index === 'lookOrderSign') {
        this.lookOrderSign = true
      } else if (index === 'lookRatingSign') {
        this.lookRatingSign = true
      } else if (index === 'modifyOrderSign') {
        this.modifyOrderSign = true
      } else if (index === 'modifyUserSign') {
        this.modifyUserSign = true
      } else if (index === 'shoppingCartSign') {
        this.shoppingCartSign = true
      } else if (index === 'lookReportsSign') {
        this.lookReportsSign = true
      }
    },
    // 移除子标签
    handleTabRemove (index) {
      if (index === 'addGoodSign') {
        this.addGoodSign = false
      } else if (index === 'addRatingSign') {
        this.addRatingSign = false
      } else if (index === 'favoritesSign') {
        this.favoritesSign = false
      } else if (index === 'lookGoodsManagementSign') {
        this.lookGoodsManagementSign = false
      } else if (index === 'lookOrderSign') {
        this.lookOrderSign = false
      } else if (index === 'lookRatingSign') {
        this.lookRatingSign = false
      } else if (index === 'modifyOrderSign') {
        this.modifyOrderSign = false
      } else if (index === 'modifyUserSign') {
        this.modifyUserSign = false
      } else if (index === 'shoppingCartSign') {
        this.shoppingCartSign = false
      } else if (index === 'lookReportsSign') {
        this.lookReportsSign = false
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
  .content
    position absolute
    left 200px
    top 50px
    .ivu-tabs
      .ivu-tabs-bar
        margin-bottom 0
        background-color rgb(241,241,241)
        color rgb(180,181,62)
</style>
