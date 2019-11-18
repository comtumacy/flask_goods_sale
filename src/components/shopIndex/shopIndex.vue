<template>
  <div class="shopIndex">
    <shopIndexHeader v-bind:width="width"></shopIndexHeader>
    <shopIndexSearch v-bind:width="width"></shopIndexSearch>
    <shopIndexNavigation v-bind:width="width" v-bind:widthNow="widthNow" v-bind:activeIndex="sign"></shopIndexNavigation>
    <router-view  v-bind:width="width" v-bind:widthNow="widthNow" @signEdit="setSign"></router-view>
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
      sign: '2'
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
    },
    // 设置标题信号值
    setSign (val) {
      this.sign = val
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
.shopIndex
  cursor default
</style>
