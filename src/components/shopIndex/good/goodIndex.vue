<template>
  <div class="goodIndex" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
    123
  </div>
</template>

<script>
export default {
  name: 'goodIndex',
  components: {},
  props: ['width', 'id'],
  created () {
    console.log(this.id)
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
.goodIndex
  top 0
  left 0
  right 0
  width 1200px
</style>
