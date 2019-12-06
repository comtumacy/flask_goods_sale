<template>
    <div class="login" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
      <el-row class="logoRow">
        <el-col :span="24" v-on:click.native="goToIndex()" v-bind:style="{'cursor': 'pointer'}">
          <el-tooltip class="item" effect="dark" content="进入主页" placement="bottom">
            <img :src="getLogo()" alt="" class="logo">
          </el-tooltip>
          <span id="loginTitle">闲置商品交易网</span>
        </el-col>
      </el-row>
      <el-container class="content">
        <el-aside width="550px">
          <img :src="getLoginPhoto()" alt="" id="getLoginPhoto">
        </el-aside>
        <el-main class="loginMain">
          <loginFrom></loginFrom>
        </el-main>
      </el-container>
      <el-divider class="dividerBottom"></el-divider>
      <span class="loginTitleBottom">© 2019 闲置商品交易网 黎一童</span>
    </div>
</template>

<script>
import loginFrom from './loginFrom'
export default {
  name: 'login',
  components: {
    loginFrom
  },
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
    // 获取LOGO
    getLogo () {
      return require('../../assets/logo.png')
    },
    // 获取图片
    getLoginPhoto () {
      return require('./logoPhoto.jpg')
    },
    // 进入主页
    goToIndex () {
      this.$router.push('/')
    }
  },
  mounted () {
    // 实时获取、更改浏览器长宽
    window.onresize = () => {
      this.getLength()
    }
  },
  updated () {
  }
}
</script>

<style lang="stylus">
.login
  position fixed
  top 0
  left 0
  right 0
  width 1200px
  .logoRow
    .logo
      position absolute
      margin-left 50px
      height 100px
      width 100px
      top 10px
      left 10px
    #loginTitle
      position absolute
      top 40px
      font-family Microsoft Yahei
      font-size 35px
      left 180px
  .content
    position absolute
    top 180px
    .loginMain
      padding 0 0 0 30px
      width 600px
      overflow hidden
    #getLoginPhoto
      margin-left 50px
      width 500px
      height 500px
      border-radius 40px
  .dividerBottom
    top 700px
    width 100%
  .loginTitleBottom
    position: absolute
    top 750px
    left 500px
    font-family Microsoft Yahei
    font-size 15px
</style>
