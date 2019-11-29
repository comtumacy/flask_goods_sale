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
              <el-button slot="append" icon="el-icon-search" v-bind:style="{'padding': '9px 17px 9px 17px'}"></el-button>
            </el-input>
          </div>
          <div>
            <span id="hotSearch">热搜：</span>
            <el-button type="text" v-bind:style="{'margin-left': '10px', 'color': 'rgb(150,150,150)'}" v-on:click="gotoGoodPage(1)">书籍</el-button>
            <el-button type="text" v-bind:style="{'margin-left': '20px', 'color': 'rgb(150,150,150)'}" v-on:click="gotoGoodPage(2)">手机</el-button>
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
  props: ['width'],
  created () {
    this.getLogo()
  },
  data () {
    return {
      input: '',
      select: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取LOGO
    getLogo () {
      return require('../../../assets/logo.png')
    },
    // 获取图片
    getPhoto () {
      return require('./photo.jpg')
    },
    // 进入商品详情页
    gotoGoodPage (val) {
      let url = document.location.toString()
      let arrUrl = url.split('//')
      let start = arrUrl[1].indexOf('/')
      let relUrl = arrUrl[1].substring(start)
      if (val === 1 && relUrl !== '/#/shopIndex/shopBook') {
        this.$router.push('/shopIndex/shopBook')
      } else if (val === 2 && relUrl !== '/#/shopIndex/shopPhone') {
        this.$router.push('/shopIndex/shopPhone')
      }
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
.shopIndexSearch
  position absolute
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
      .input-with-select
        .el-input-group__prepend
          width 70px
          border 2px solid rgb(180,181,62)
          border-right 0
        .el-input__inner
          border 2px solid rgb(180,181,62)
          border-left 0
          border-right 0
        .el-input-group__append
          border 2px solid rgb(180,181,62)
          .el-button
            background-color rgb(180,181,62)
            border-radius 0
            > i
              font-size 20px
              color white
    #shopIndexSearchPhoto
      margin-left 20px
      width 120px
    #hotSearch
      margin-left 20px
      line-height 1
      font-size 14px
      font-weight 500
      color rgb(150,150,150)
</style>
