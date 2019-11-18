<template>
    <div class="shopPhone" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/shopIndex/shopIndexChildIndex' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>电子产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'shopPhone',
  components: {},
  props: ['width'],
  created () {
    this.$emit('signEdit', '4')
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
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
</style>
