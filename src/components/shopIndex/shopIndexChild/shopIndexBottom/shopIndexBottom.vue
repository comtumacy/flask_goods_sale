<template>
    <div class="shopIndexBottom" v-bind:style="{'width': backColorWidth + 'px'}">
      <div class="shopIndexBottom1" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
        <el-row v-bind:style="{'width': '1200px'}">
          <el-col>
            <el-row>
              <img :src="getLogoPhoto()">
            </el-row>
          </el-col>
          <el-col class="shopIndexBottomTitle1">
            <span>买家服务</span>
          </el-col>
          <el-col class="shopIndexBottomTitle2">
            <span>卖家服务</span>
          </el-col>
          <el-col class="shopIndexBottomTitle3">
            <span>商家服务</span>
          </el-col>
        </el-row>
        <el-row v-bind:style="{'position': 'absolute', 'top': '65px', 'width': '1200px'}">
          <el-col class="shopIndexBottomTitle4" v-on:click.native="goToAdmin()">
            <span>买家登录</span>
          </el-col>
          <el-col class="shopIndexBottomTitle5" v-on:click.native="goToAdmin()">
            <span>卖家登录</span>
          </el-col>
          <el-col class="shopIndexBottomTitle6" v-on:click.native="goToAdmin()">
            <span>后台登录</span>
          </el-col>
        </el-row>
        <el-row v-bind:style="{'position': 'absolute', 'top': '95px', 'width': '1200px'}">
          <el-col class="shopIndexBottomTitle4" v-on:click.native="goToAdmin()">
            <span>订单管理</span>
          </el-col>
          <el-col class="shopIndexBottomTitle5" v-on:click.native="goToAdmin()">
            <span>库存管理</span>
          </el-col>
          <el-col class="shopIndexBottomTitle6" v-on:click.native="contact()">
            <span>联系我们</span>
          </el-col>
        </el-row>
        <el-row v-bind:style="{'position': 'absolute', 'top': '125px', 'width': '1200px'}">
          <el-col class="shopIndexBottomTitle4" v-on:click.native="goToModify()">
            <span>账号修改</span>
          </el-col>
        </el-row>
      </div>
      <div class="shopIndexBottom2">
        <el-row>
          <span class="shopIndexBottom2Title">© 2019 闲置商品交易网 黎一童</span>
        </el-row>
        <el-row>
          <span class="shopIndexBottom3Title" v-on:click="goToBei()">桂ICP备18010006号-1</span>
        </el-row>
      </div>
    </div>
</template>

<script>
export default {
  name: 'shopIndexBottom',
  components: {},
  props: ['width', 'backColorWidth'],
  created () {
    this.getLogoPhoto()
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 获取LOGO图片
    getLogoPhoto () {
      return require('../../../../assets/logo.png')
    },
    // 联系我们
    contact () {
      this.$notify({
        title: '联系我们',
        message: '请联系网站管理员。',
        duration: 4500
      })
    },
    // 后台登录
    goToAdmin () {
      this.$router.push('/admin')
    },
    // 进入账号修改
    goToModify () {
      this.$router.push('/admin/modifyUser')
    },
    // 进入备案网站
    goToBei () {
      window.open('http://beian.miit.gov.cn')
    }
  },
  mounted () {
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
.shopIndexBottom
  position absolute
  top 1650px
  left 0
  right 0
  height 200px
  background-color rgb(242,242,242)
  .shopIndexBottom1
    height 160px
    .el-row
      .el-col
        width auto
        .el-row
          > img
            margin-top 30px
            height 100px
      .shopIndexBottomTitle1
        margin-top 20px
        margin-left 230px
        font-size 22px
        font-family Microsoft YaHei
      .shopIndexBottomTitle2
        margin-top 20px
        margin-left 150px
        font-size 22px
        font-family Microsoft YaHei
      .shopIndexBottomTitle3
        margin-top 20px
        margin-left 150px
        font-size 22px
        font-family Microsoft YaHei
      .shopIndexBottomTitle4
        margin-left 340px
        font-size 16px
        font-family Microsoft YaHei
        cursor pointer
      .shopIndexBottomTitle5
        margin-left 175px
        font-size 16px
        font-family Microsoft YaHei
        cursor pointer
      .shopIndexBottomTitle6
        margin-left 175px
        font-size 16px
        font-family Microsoft YaHei
        cursor pointer
  .shopIndexBottom2
    position absolute
    width 100%
    height 55px
    text-align center
    background-color rgb(94,97,106)
    .shopIndexBottom2Title
      position relative
      top 10px
      color white
    .shopIndexBottom3Title:hover
      color rgb(242,242,242)
    .shopIndexBottom3Title
      position relative
      top 12px
      color white
      cursor pointer
</style>
