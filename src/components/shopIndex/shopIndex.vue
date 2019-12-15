<template>
  <div class="shopIndex">
    <shopIndexHeader
      v-bind:width="width"
      v-bind:backColorWidth="backColorWidth">
    </shopIndexHeader>
    <shopIndexSearch
      v-bind:width="width"
      @forceSign="forceSignFun">
    </shopIndexSearch>
    <shopIndexNavigation
      v-bind:width="width"
      v-bind:widthNow="widthNow"
      v-bind:activeIndex="sign"
      v-bind:backColorWidth="backColorWidth"
      @selectNavigation1="selectNavigation1"
      @selectNavigation2="selectNavigation2"></shopIndexNavigation>
    <router-view
      v-bind:width="width"
      v-bind:widthNow="widthNow"
      v-bind:selectNavigationSign1="selectNavigationSign1"
      v-bind:selectNavigationSign2="selectNavigationSign2"
      v-bind:forceSignReturn="forceSignReturn"
      v-bind:backColorWidth="backColorWidth"
      @signEdit="setSign">
    </router-view>
  </div>
</template>

<script>
import shopIndexHeader from './shopIndexHeader/shopIndexHeader'
import shopIndexSearch from './shopIndexSearch/shopIndexSearch'
import shopIndexNavigation from './shopIndexNavigation/shopIndexNavigation'
export default {
  name: 'shopIndex',
  components: {
    shopIndexHeader,
    shopIndexSearch,
    shopIndexNavigation
  },
  props: [],
  created () {
    this.getLength()
  },
  data () {
    return {
      width: 0,
      widthNow: 0,
      backColorWidth: 0,
      sign: '2',
      selectNavigationSign1: '',
      selectNavigationSign2: '',
      forceSignReturn: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取浏览器长宽，更改浏览器两边的长宽
    getLength () {
      let widthNow = document.documentElement.clientWidth
      this.widthNow = widthNow
      let width
      if (widthNow < 1200) {
        width = 0
      } else {
        width = widthNow - 1200
      }
      this.width = width
      if (widthNow < 1200) {
        this.backColorWidth = 1200
      } else {
        this.backColorWidth = widthNow
      }
    },
    // 设置标题信号值
    setSign (val) {
      this.sign = val
    },
    // 最外层导航栏选择回调1
    selectNavigation1 (val) {
      this.selectNavigationSign1 = val
    },
    // 最外层导航栏选择回调2
    selectNavigation2 (val) {
      this.selectNavigationSign2 = val
    },
    // 刷新信号
    forceSignFun (val) {
      this.forceSignReturn = val
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
.shopIndex
  cursor default
</style>
