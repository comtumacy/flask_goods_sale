<template>
  <div class="addRating" v-loading="loading">
    <el-row class="addRatingHeader">
      <span class="icon-pacman"></span>
      <span class="addRatingHeaderText">评论添加</span>
    </el-row>
    <div class="addRatingTable">
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
                @click="addOpen(scope.$index)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="pageAllNumber"
          class="addRatingPage">
        </el-pagination>
      </div>
    </div>
    <transition :duration="{enter:900,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <addAlert
        v-show="addSign"
        @closeAndAdd="add"
        @sent="addClose"
        v-bind:widthNow="widthNow"
        v-bind:heightNow="heightNow">
      </addAlert>
    </transition>
  </div>
</template>

<script>
import addAlert from './addAlert'
export default {
  name: 'addRating',
  components: {
    addAlert
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
        this.alertInfo()
      } else {
        this.getContent()
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
      addSign: false
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
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 回调当前页
    handleCurrentChange (val) {
      this.pageNow = val
      this.getContent()
    },
    // 无权限提示
    alertInfo () {
      this.$alert('卖家无法添加评论', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$message({
            type: 'error',
            message: `卖家无法添加评论`
          })
        }
      })
    },
    // 添加评论框打开
    addOpen (val) {
      if (this.data[val].status === '已完成') {
        this.addSign = true
      } else {
        this.$message.error('已经完成的订单才能添加评论')
      }
    },
    // 添加评论框关闭
    addClose () {
      this.addSign = false
    },
    // 添加评论
    add (val) {
      this.addSign = false
      // console.log(val)
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
.addRating
  position absolute
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .addRatingHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .icon-pacman
      position absolute
      left 20px
      top 20px
      font-size 22px
    .addRatingHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .addRatingTable
    position absolute
    margin-left 10px
    top 70px
    .addRatingPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
    .addRatingButton
      position absolute
      margin-top -35px
      right 10px
</style>
