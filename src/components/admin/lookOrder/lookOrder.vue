<template>
  <div class="lookOrder" v-loading="loading">
    <el-row class="lookOrderHeader">
      <span class="el-icon-shopping-bag-1"></span>
      <span v-admin-header-text>订单查看</span>
    </el-row>
    <div class="lookOrderTable">
      <div v-bind:style="{'background-color': 'white'}">
        <el-table
          :data="data"
          border
          :style="{'width': (widthNow - 220) + 'px'}">
          <el-table-column
            prop="goodid"
            label="商品ID"
            width="100"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="goodname"
            label="商品名称"
            header-align="center"
            align="center"
            :resizable="false"
            :show-overflow-tooltip=true>
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="80"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="100"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="date"
            label="下单时间"
            width="160"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="buyer"
            label="买家"
            width="100"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="seller"
            label="卖家"
            width="100"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="160"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话"
            width="130"
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
          class="lookOrderPage">
        </el-pagination>
        <el-button v-on:click="searchOpen()" class="lookOrderButton" type="success" size="small">精确搜索</el-button>
      </div>
    </div>
    <transition :duration="{enter:900,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <searchAlert
        v-show="searchSign"
        @closeAndSearch="find"
        @sent="searchClose"
        v-bind:widthNow="widthNow"
        v-bind:heightNow="heightNow">
      </searchAlert>
    </transition>
</div>
</template>

<script>
import searchAlert from './searchAlert'
export default {
  name: 'lookOrder',
  components: {
    searchAlert
  },
  props: ['widthNow', 'heightNow'],
  created () {
    this.getContent()
  },
  data () {
    return {
      loading: false,
      data: [],
      pageAllNumber: 0,
      pageNow: 1,
      searchSign: false,
      dataSign: 1,
      content: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取内容
    getContent () {
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'https://www.yitongli.cn/goodsApi/order/get_order',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'pageNumber': this.pageNow
        }
      }).then(res => {
        this.data = res.data.content
        this.pageAllNumber = res.data.pageAllNumber
        this.loading = false
        this.dataSign = 1
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 回调当前页
    handleCurrentChange (val) {
      this.pageNow = val
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.find()
      }
    },
    // 查找
    find (val) {
      if (val) {
        this.content = val
      }
      this.searchSign = false
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'https://www.yitongli.cn/goodsApi/order/look_order',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'content': this.content,
          'pageNumber': this.pageNow
        }
      }).then(res => {
        this.data = res.data.content
        this.pageAllNumber = res.data.pageAllNumber
        this.loading = false
        this.dataSign = 2
        if (res.data.info) {
          this.$message.error(res.data.info)
        }
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 打开搜索框
    searchOpen () {
      this.searchSign = true
      this.pageNow = 1
    },
    // 关闭查找框
    searchClose () {
      this.searchSign = false
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
.lookOrder
  position absolute
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .lookOrderHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .el-icon-shopping-bag-1
      position absolute
      left 20px
      top 20px
      font-size 22px
  .lookOrderTable
    position absolute
    margin-left 10px
    top 70px
    .lookOrderPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
    .lookOrderButton
      position absolute
      margin-top -35px
      right 10px
</style>
