<template>
  <div class="shopPhone" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/shopIndex/shopIndexChildIndex' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/shopIndex/shopPhone' }" v-on:click.native="clearSelectNow()">电子产品</el-breadcrumb-item>
      <el-breadcrumb-item>{{ selectNow }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-menu
      :default-active="activeIndex"
      class="shopPhoneMenu"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(255,255,255)"
      text-color="black"
      active-text-color="rgb(180,181,62)">
      <el-menu-item index="手机">手机</el-menu-item>
      <el-menu-item index="test" v-show="false">test</el-menu-item>
    </el-menu>
    <shopPhoneDetailed
      v-bind:width="width"
      v-bind:selectNow="selectNow"
      v-bind:widthNow="widthNow"
      v-bind:forceSignReturn="forceSignReturn"></shopPhoneDetailed>
  </div>
</template>

<script>
import shopPhoneDetailed from './shopPhoneDetailed'
export default {
  name: 'shopPhone',
  components: {
    shopPhoneDetailed
  },
  props: ['width', 'widthNow', 'selectNavigationSign2', 'forceSignReturn'],
  created () {
    this.$emit('signEdit', '4')
  },
  data () {
    return {
      activeIndex: '手机',
      selectNow: '手机'
    }
  },
  computed: {},
  watch: {
    // 监听最外层菜单的切换并更改当前的值
    selectNavigationSign2 (newVal) {
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
      this.selectNow = '手机'
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
.shopPhone
  position absolute
  top 210px
  left 0
  right 0
  width 1200px
  .breadcrumb
    margin-top 20px
    margin-bottom 20px
  .shopPhoneMenu
    border solid 1px #e6e6e6
    > li
      height 50px
      padding-left 7px
      padding-right 7px
      width 69px
      line-height 55px
      text-align center
</style>
