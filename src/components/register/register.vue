<template>
    <div class="register" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
      <el-row class="registerRow">
        <el-col :span="24" v-on:click.native="goToIndex()" v-bind:style="{'cursor': 'pointer'}">
          <el-tooltip class="item" effect="dark" content="进入主页" placement="bottom">
            <img :src="getLogo()" alt="" class="registerImg">
          </el-tooltip>
          <span id="registerTitle">闲置商品交易网 | 用户注册</span>
        </el-col>
      </el-row>
      <registerFrom></registerFrom>
    </div>
</template>

<script>
import registerFrom from './registerFrom'
export default {
  name: 'register',
  components: {
    registerFrom
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
.register
  position fixed
  top 0
  left 0
  right 0
  width 1200px
  height 100%
  overflow auto
  .registerRow
    .registerImg
      position absolute
      margin-left 50px
      height 100px
      width 100px
      top 10px
      left 10px
    #registerTitle
      position absolute
      top 40px
      font-family Microsoft Yahei
      font-size 35px
      left 180px
</style>
