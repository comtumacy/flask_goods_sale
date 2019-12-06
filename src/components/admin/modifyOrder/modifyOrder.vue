<template>
    <div class="modifyOrder" v-loading="loading">
      <el-row class="modifyOrderHeader">
        <span class="el-icon-shopping-bag-1"></span>
        <span class="modifyOrderHeaderText">订单修改</span>
      </el-row>
      <div class="modifyOrderTable">
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
            <el-table-column
              label="操作"
              width="90"
              header-align="center"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="selectOpen(scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="pageAllNumber"
            class="modifyOrderPage">
          </el-pagination>
        </div>
      </div>
      <transition :duration="{enter:900,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <selectStatus
          v-show="selectSign"
          @closeAndSelect="selectChange"
          @sent="selectClose"
          v-bind:widthNow="widthNow"
          v-bind:heightNow="heightNow">
        </selectStatus>
      </transition>
    </div>
</template>

<script>
import selectStatus from './selectStatus'
export default {
  name: 'modifyOrder',
  components: {
    selectStatus
  },
  props: ['widthNow', 'heightNow'],
  created () {
    this.$axios({
      method: 'post',
      url: 'https://www.yitongli.cn/goodsApi/public/judge_user',
      headers: {
        'token': this.$store.getters.token_getters,
        'Uname': this.$store.getters.username_getters
      }
    }).then(res => {
      if (res.data.userType === 1) {
        this.getContent()
      } else {
        this.alertInfo()
      }
    }).catch(() => {
      this.$message.error('获取失败，请检查你的网络连接')
    })
  },
  data () {
    return {
      loading: false,
      data: [],
      pageAllNumber: 0,
      pageNow: 1,
      selectSign: false,
      goodId: '',
      buyer: '',
      number: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 无权限提示
    alertInfo () {
      this.$alert('买家无法修改订单状态', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$message({
            type: 'error',
            message: `买家无法修改订单状态`
          })
        }
      })
    },
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
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 回调当前页
    handleCurrentChange (val) {
      this.pageNow = val
      this.getContent()
    },
    // 选择框打开
    selectOpen (val) {
      this.selectSign = true
      this.goodId = this.data[val].goodid
      this.buyer = this.data[val].buyer
      this.number = this.data[val].number
    },
    // 选择框关闭
    selectClose () {
      this.selectSign = false
    },
    // 选择框修改数据
    selectChange (val) {
      this.selectSign = false
      this.$axios({
        method: 'post',
        url: 'https://www.yitongli.cn/goodsApi/order/modify_order',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'status': val,
          'buyer': this.buyer,
          'good_id': this.goodId,
          'number': this.number
        }
      }).then(res => {
        this.$message.success(res.data.info)
        this.getContent()
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
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
.modifyOrder
  position absolute
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .modifyOrderHeader
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
    .modifyOrderHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .modifyOrderTable
    position absolute
    margin-left 10px
    top 70px
    .modifyOrderPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
</style>
