<template>
  <div class="lookGoodsManagement" v-loading="loading">
    <el-row class="lookGoodsManagementHeader">
      <span class="icon-pie-chart"></span>
      <span class="lookGoodsManagementHeaderText">库存查看</span>
    </el-row>
    <div class="lookGoodsManagementTable" v-if="judgeUserSign">
      <div v-bind:style="{'background-color': 'white'}">
        <el-table
          :data="data"
          border
          :style="{'width': (widthNow - 220) + 'px'}">
          <el-table-column
            prop="goodsid"
            label="商品ID"
            width="180"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="goodtitle"
            label="商品名称"
            header-align="center"
            align="center"
            :resizable="false"
            :show-overflow-tooltip=true>
          </el-table-column>
          <el-table-column
            prop="goodstype"
            label="数量"
            width="120"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="registrationtime"
            label="登记时间"
            width="180"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="pageAllNumber"
          class="lookGoodsManagementPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lookGoodsManagement',
  components: {},
  props: ['widthNow', 'heightNow'],
  created () {
    this.loading = true
    this.$axios({
      method: 'post',
      url: 'http://139.155.33.105/goodsApi/public/judge_user',
      headers: {
        'token': this.$store.getters.token_getters,
        'Uname': this.$store.getters.username_getters
      }
    }).then(res => {
      console.log(res)
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
      loading: false,
      data: [],
      pageAllNumber: 0,
      pageNow: 1,
      judgeUserSign: false
    }
  },
  computed: {},
  watch: {},
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
        url: 'http://139.155.33.105/goodsApi/seller/look_goods',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'pageNumber': this.pageNow
        }
      }).then(res => {
        this.loading = false
        this.data = res.data.lookGoodsList[0].bookinfo
        this.$message.success(res.data.info)
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 翻页
    handleCurrentChange () {}
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
.lookGoodsManagement
  position absolute
  top 50px
  left 200px
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .lookGoodsManagementHeader
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
    .lookGoodsManagementHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .lookGoodsManagementTable
    position absolute
    margin-left 10px
    top 70px
    .lookGoodsManagementPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
</style>
