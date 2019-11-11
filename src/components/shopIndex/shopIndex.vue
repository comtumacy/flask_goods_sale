<template>
  <div class="shopIndex">
    <shopIndexHeader></shopIndexHeader>
    <shopIndexSearch></shopIndexSearch>
  </div>
</template>

<script>
import shopIndexHeader from './shopIndexHeader/shopIndexHeader'
import shopIndexSearch from './shopIndexSearch/shopIndexSearch'
export default {
  name: 'shopIndex',
  components: {
    shopIndexHeader,
    shopIndexSearch
  },
  props: [],
  created () {
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
  }
}
</script>

<style lang="stylus">
</style>
