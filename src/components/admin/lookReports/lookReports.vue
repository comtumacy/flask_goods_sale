<template>
  <div class="lookReports" v-loading="loading">
    <el-row class="lookReportsHeader">
      <span class="icon-pie-chart"></span>
      <span v-admin-header-text>报表查看</span>
    </el-row>
    <div class="chart1" ref="chart1"></div>
  </div>
</template>

<script>
export default {
  name: 'lookReports',
  components: {},
  props: ['widthNow', 'heightNow'],
  created () {
    this.loading = true
    this.$axios({
      method: 'post',
      url: 'https://www.yitongli.cn/goodsApi/public/judge_user',
      headers: {
        'token': this.$store.getters.token_getters,
        'Uname': this.$store.getters.username_getters
      }
    }).then(res => {
      if (res.data.userType === 1) {
        this.judgeUserSign = true
        this.getContent()
      } else {
        this.alertInfo()
      }
    }).catch(() => {
      this.$message.error('获取失败，请检查你的网络连接')
    })
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  data () {
    return {
      data: [],
      loading: false,
      judgeUserSign: false
    }
  },
  computed: {},
  watch: {
    // 监听data数据并重绘图
    data () {
      this.draw1()
    }
  },
  methods: {
    // 无权限提示
    alertInfo () {
      this.$alert('买家无法查看库存', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$message({
            type: 'error',
            message: `买家无法查看库存`
          })
        }
      })
    },
    // 获取内容
    getContent () {
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'https://www.yitongli.cn/goodsApi/seller/stock_reports',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        }
      }).then(res => {
        this.data = res.data.content
        this.loading = false
      })
    },
    // 绘制图1
    draw1 () {
      if (this.$refs.chart1) {
        let myChart = this.$echarts.init(this.$refs.chart1)
        // 绘制图表
        myChart.setOption({
          legend: {
            show: true,
            orient: 'vertical',
            left: 'right',
            itemGap: 7,
            textStyle: {
              fontSize: 18
            }
          },
          tooltip: {
            show: true
          },
          title: {
            top: 10,
            left: 10,
            show: true,
            text: '查询库存种类—数量饼图',
            textStyle: {
              fontSize: 25
            }
          },
          dataset: {
            source: this.data
          },
          series: [
            {
              name: '商品类型',
              type: 'pie',
              label: {
                fontSize: 18
              },
              center: ['45%', '53%']
            }
          ]
        })
      }
    }
  },
  mounted () {
    if (this.judgeUserSign === true) {
      // 挂载点：异步加载绘制图
      this.$nextTick(() => {
        this.draw1()
      })
    }
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
.lookReports
  position absolute
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .lookReportsHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .icon-pie-chart
      position absolute
      left 20px
      top 20px
      font-size 22px
  .chart1
    position absolute
    top 90px
    left 40px
    width 1630px
    height 740px
    background-color white
    border-radius 20px
    z-index 130
</style>
