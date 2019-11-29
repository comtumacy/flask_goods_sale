<template>
    <div class="selectStatus" v-bind:style="{'top': (height / 3) + 'px', 'left': (width / 2) + 'px'}">
      <i>订单状态修改</i>
      <el-select v-model="value" placeholder="请选择订单状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          v-bind:style="{'width': '430px'}">
        </el-option>
      </el-select>
      <el-button class="button1" type="success" v-on:click="onSubmit()">确认</el-button>
      <el-button class="button2" type="info" v-on:click="$emit('sent')">取消</el-button>
    </div>
</template>

<script>
export default {
  name: 'selectStatus',
  components: {},
  props: ['widthNow', 'heightNow'],
  created () {
    this.getLength()
  },
  data () {
    return {
      options: [{
        value: '待付款',
        label: '待付款'
      }, {
        value: '待发货',
        label: '待发货'
      }, {
        value: '待收货',
        label: '待收货'
      }, {
        value: '待评价',
        label: '待评价'
      }, {
        value: '已完成',
        label: '已完成'
      }],
      value: '',
      width: 0,
      height: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 按钮事件
    onSubmit () {
      this.$emit('closeAndSelect', this.value)
    },
    // 获取浏览器长宽，更改浏览器两边的长宽
    getLength () {
      let width
      if (this.widthNow < 920) {
        width = 0
      } else {
        width = this.widthNow - 920
      }
      this.width = width
      let height
      if (this.heightNow < 200) {
        height = 0
      } else {
        height = this.heightNow - 200
      }
      this.height = height
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
.selectStatus
  position absolute
  padding 10px 0 0 20px
  width 690px
  height 130px
  background-color rgb(249,249,251)
  border-radius 20px
  z-index 120
  box-shadow: 5px 5px 10px #888888
  > i
    position absolute
    left 280px
    padding 0 0 10px 0
    font-size 20px
    font-style normal
  .el-select
    top 50px
    margin-right 20px
    width 430px
  .button1
    position absolute
    top 60px
    left 470px
    width 100px
  .button2
    position absolute
    top 60px
    left 580px
    width 100px
</style>
