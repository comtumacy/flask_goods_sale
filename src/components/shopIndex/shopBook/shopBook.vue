<template>
    <div class="shopBook" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/shopIndex/shopIndexChildIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/shopIndex/shopBook' }" v-on:click.native="clearSelectNow()">书籍热卖</el-breadcrumb-item>
        <el-breadcrumb-item>{{ selectNow }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-menu
        :default-active="activeIndex"
        class="shopBookMenu"
        mode="horizontal"
        @select="handleSelect"
        background-color="rgb(255,255,255)"
        text-color="black"
        active-text-color="rgb(180,181,62)">
        <el-menu-item index="青春文学">青春文学</el-menu-item>
        <el-menu-item index="小说">小说</el-menu-item>
        <el-menu-item index="休闲/爱好">休闲/爱好</el-menu-item>
        <el-menu-item index="文学">文学</el-menu-item>
        <el-menu-item index="孕产/胎教">孕产/胎教</el-menu-item>
        <el-menu-item index="艺术">艺术</el-menu-item>
        <el-menu-item index="动漫/幽默">动漫/幽默</el-menu-item>
        <el-menu-item index="烹饪/美食">烹饪/美食</el-menu-item>
        <el-menu-item index="时尚/美妆">时尚/美妆</el-menu-item>
        <el-menu-item index="旅游/地图">旅游/地图</el-menu-item>
        <el-menu-item index="家庭/家居">家庭/家居</el-menu-item>
        <el-menu-item index="亲子/家教">亲子/家教</el-menu-item>
        <el-menu-item index="两性关系">两性关系</el-menu-item>
        <el-menu-item index="育儿/早教">育儿/早教</el-menu-item>
        <el-menu-item index="保健/养生">保健/养生</el-menu-item>
        <el-menu-item index="体育/运动">体育/运动</el-menu-item>
        <el-menu-item index="test" v-show="false">test</el-menu-item>
      </el-menu>
      <shopBookDetailed v-bind:width="width" v-bind:selectNow="selectNow" v-bind:widthNow="widthNow"></shopBookDetailed>
    </div>
</template>

<script>
import shopBookDetailed from './shopBookDetailed'
export default {
  name: 'shopBook',
  components: {
    shopBookDetailed
  },
  props: ['width', 'widthNow', 'selectNavigationSign1'],
  created () {
    this.$emit('signEdit', '3')
  },
  data () {
    return {
      activeIndex: '',
      selectNow: '热销'
    }
  },
  computed: {},
  watch: {
    selectNavigationSign1 (newVal) {
      this.activeIndex = newVal
      this.selectNow = newVal
    }
  },
  methods: {
    // 回调选择的点菜单栏
    handleSelect (key) {
      this.selectNow = key
    },
    // 请空当前选择
    clearSelectNow () {
      this.selectNow = '热销'
      this.activeIndex = 'test'
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
.shopBook
  position absolute
  top 210px
  left 0
  right 0
  width 1200px
  .breadcrumb
    margin-top 20px
    margin-bottom 20px
  .shopBookMenu
    border solid 1px #e6e6e6
    > li
      height 50px
      padding-left 7px
      padding-right 7px
      width 69px
      line-height 55px
      text-align center
</style>
