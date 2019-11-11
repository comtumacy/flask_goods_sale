<template>
    <div class="shopIndexHeader">
      <el-row class="shopIndexHeaderTitle" type="flex" justify="end" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
        <el-col :span="8" id="shopIndexHeadersTitle1">
          欢迎光临 闲置商品交易网站，请
          <el-button type="text" id="shopIndexHeadersTitle2" v-on:click="goToLogin()">登录</el-button>
        </el-col>
        <el-divider direction="vertical"></el-divider>
        <el-col :span="8" id="shopIndexHeadersTitle3">
          <el-button type="text" id="shopIndexHeadersButton3" v-on:click="goToRegister()">注册</el-button>
        </el-col>
        <el-divider direction="vertical"></el-divider>
        <el-col :span="8" id="shopIndexHeadersTitle4">
          <el-button type="text" id="shopIndexHeadersButton4">我的个人中心</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'shopIndexHeader',
  components: {},
  props: [],
  created () {
    this.getLength()
  },
  data () {
    return {
      width: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取浏览器长宽，更改浏览器两边的长宽
    getLength () {
      let widthNow = document.documentElement.clientWidth
      let width
      if (widthNow < 1200) {
        width = 0
      } else {
        width = widthNow - 1200
      }
      this.width = width
    },
    // 进入登录界面
    goToLogin () {
      this.$router.push('/login')
    },
    // 进入注册界面
    goToRegister () {
      this.$router.push('/register')
    }
  },
  mounted () {
    // 实时获取、更改浏览器长宽
    window.onresize = () => {
      this.getLength()
      console.log(this.width)
    }
  },
  updated () {
  }
}
</script>

<style lang="stylus">
.shopIndexHeader
  position fixed
  top 0
  left 0
  right 0
  width 100%
  height 35px
  background-color rgb(247,247,247)
  .shopIndexHeaderTitle
    width 1200px
    .el-divider
      margin-top 10px
    #shopIndexHeadersTitle1
      width auto
      font-size 13px
      font-family simsun
      color #646464
    #shopIndexHeadersTitle2
      width auto
      font-size 13px
      font-family simsun
      color rgb(163,165,34)
    #shopIndexHeadersTitle3
      width auto
    #shopIndexHeadersButton3
      width auto
      font-size 13px
      font-family simsun
      color rgb(163,165,34)
    #shopIndexHeadersTitle4
      width auto
    #shopIndexHeadersButton4
      width auto
      font-size 13px
      font-family simsun
      color rgb(163,165,34)
</style>
