<template>
    <div class="shopIndexSearch" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
      <el-row class="shopIndexSearchRow">
        <el-col v-bind:style="{'width': 'auto'}">
          <img :src="getLogo()" alt="" id="shopIndexSearchLogo">
        </el-col>
        <el-col id="shopIndexSearchPhoto">
          <img :src="getPhoto()" alt="">
        </el-col>
        <el-col id="shopIndexSearchInput">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="类型">
                <el-option label="闲置书籍" value="闲置书籍"></el-option>
                <el-option label="闲置手机" value="闲置手机"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div>
            <span id="hotSearch">热搜：</span>
            <el-button type="text" v-bind:style="{'margin-left': '10px'}">轻小说</el-button>
            <el-button type="text" v-bind:style="{'margin-left': '20px'}">官场</el-button>
            <el-button type="text" v-bind:style="{'margin-left': '20px'}">星座/血型/塔罗</el-button>
            <el-button type="text" v-bind:style="{'margin-left': '20px'}">华为</el-button>
            <el-button type="text" v-bind:style="{'margin-left': '20px'}">OPPO</el-button>
          </div>
        </el-col>
        <el-col>
          <div></div>
          <div></div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'shopIndexSearch',
  components: {},
  props: [],
  created () {
    this.getLength()
    this.getLogo()
  },
  data () {
    return {
      width: 0,
      input: '',
      select: ''
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
      return require('../../../assets/logo.png')
    },
    // 获取图片
    getPhoto () {
      return require('./photo.jpg')
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
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}
</script>

<style lang="stylus">
.shopIndexSearch
  position fixed
  top 50px
  left 0
  right 0
  width auto
  .shopIndexSearchRow
    position absolute
    width 100%
    height 100px
    #shopIndexSearchLogo
      height 100px
    #shopIndexSearchInput
      margin-left 100px
      width 600px
    #shopIndexSearchPhoto
      margin-left 20px
      width 120px
    #hotSearch
      margin-left 20px
      line-height 1
      font-size 14px
      font-weight 500
</style>
