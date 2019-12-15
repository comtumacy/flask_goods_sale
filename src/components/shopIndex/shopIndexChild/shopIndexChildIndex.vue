<template>
  <div class="shopIndexChildIndex" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
    <carousel v-bind:widthNow="widthNow"></carousel>
    <goods-bar v-bind:width="width"></goods-bar>
    <shopIndexBottom
      v-bind:width="width"
      v-bind:backColorWidth="backColorWidth">
    </shopIndexBottom>
  </div>
</template>

<script>
import carousel from './cartousel/carousel'
import goodsBar from './goodsBar/goodsBar'
import shopIndexBottom from './shopIndexBottom/shopIndexBottom'
export default {
  name: 'shopIndexChildIndex',
  components: {
    carousel,
    goodsBar,
    shopIndexBottom
  },
  props: [
    'width',
    'widthNow',
    'backColorWidth'
  ],
  created () {
    this.$emit('signEdit', '2')
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
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
.shopIndexChildIndex
  top 0
  left 0
  right 0
  width 100%
</style>
