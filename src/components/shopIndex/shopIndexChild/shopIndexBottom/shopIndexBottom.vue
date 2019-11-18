<template>
    <div class="shopIndexBottom">
      <div class="shopIndexBottom1" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
        <el-row>
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
        <el-row v-bind:style="{'position': 'absolute', 'top': '65px'}">
          <el-col class="shopIndexBottomTitle4">
            <span>买家登录</span>
          </el-col>
          <el-col class="shopIndexBottomTitle5">
            <span>卖家登录</span>
          </el-col>
          <el-col class="shopIndexBottomTitle6">
            <span>后台登录</span>
          </el-col>
        </el-row>
        <el-row v-bind:style="{'position': 'absolute', 'top': '95px'}">
          <el-col class="shopIndexBottomTitle4">
            <span>订单管理</span>
          </el-col>
          <el-col class="shopIndexBottomTitle5">
            <span>库存管理</span>
          </el-col>
          <el-col class="shopIndexBottomTitle6">
            <span>联系我们</span>
          </el-col>
        </el-row>
        <el-row v-bind:style="{'position': 'absolute', 'top': '125px'}">
          <el-col class="shopIndexBottomTitle4">
            <span>我买到的</span>
          </el-col>
        </el-row>
      </div>
      <div class="shopIndexBottom2">
        <span class="shopIndexBottom2Title">© 2019 闲置商品交易网 黎一童</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'shopIndexBottom',
  components: {},
  props: ['width'],
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
    bottom 0
    width 100%
    height 40px
    text-align center
    background-color rgb(94,97,106)
    .shopIndexBottom2Title
      position relative
      top 10px
</style>
