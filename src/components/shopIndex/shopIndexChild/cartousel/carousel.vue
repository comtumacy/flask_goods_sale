<template>
    <div class="carousel" v-bind:style="{'width': '100%'}">
      <el-carousel :interval="4000" type="card" height="400px"  v-bind:style="{'width': widthNow + 'px'}">
        <el-carousel-item v-for="item in 5" :key="item">
          <img :src="getCarPhoto(item)" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'carousel',
  components: {},
  props: ['widthNow'],
  created () {
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    // 获取走马灯图片
    getCarPhoto (val) {
      return require(`./${val}.jpg`)
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
.carousel
  position absolute
  top 210px
  left 0
  right 0
  width 1200px
  overflow-x hidden
</style>
