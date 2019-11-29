<template>
    <div class="lookRating" v-loading="loading">
      <el-row class="lookRatingHeader">
        <span class="icon-pacman"></span>
        <span class="lookRatingHeaderText">评论查看</span>
      </el-row>
      <div class="lookRatingTable">
        <div v-bind:style="{'background-color': 'white'}">
          <el-table
            :data="data"
            border
            :style="{'width': (widthNow - 220) + 'px'}">
            <el-table-column
              prop="Rgoodsno"
              label="ID"
              width="120"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="Rno"
              label="商品NO"
              width="70"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              label="图片"
              width="150"
              header-align="center"
              align="center"
              :resizable="false">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="" class="lookRatingHeaderTextImg">
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="商品名称"
              width="300"
              header-align="center"
              align="center"
              :resizable="false"
              :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="Rtext"
              label="评论内容"
              header-align="center"
              align="center"
              :resizable="false"
              :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="Rstarts"
              label="评分"
              width="80"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="Rtimes"
              label="评论时间"
              width="160"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="toexamine"
              label="评论状态"
              width="100"
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
                  @click="editOpen(scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="pageAllNumber"
            class="lookRatingPage">
          </el-pagination>
          <el-button v-on:click="searchOpen()" class="lookRatingButton" type="success" size="small">精确搜索</el-button>
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
      <transition :duration="{enter:900,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <editAlert
          v-show="editSign"
          @closeAndEdit="editChange"
          @sent="editClose"
          v-bind:widthNow="widthNow"
          v-bind:heightNow="heightNow">
        </editAlert>
      </transition>
    </div>
</template>

<script>
import searchAlert from './searchAlert'
import editAlert from './editAlert'
export default {
  name: 'lookRating',
  components: {
    searchAlert,
    editAlert
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
      content: '',
      editSign: false,
      editGoodsNo: '',
      editRno: ''
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
        url: 'http://139.155.33.105/goodsApi/public/look_rating',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'pageNumber': this.pageNow
        }
      }).then(res => {
        this.data = res.data.content
        this.pageAllNumber = res.data.pageNumber
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
    // 搜索评论
    find (val) {
      if (val) {
        this.content = val
      }
      this.searchSign = false
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/public/find_rating',
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
        this.pageAllNumber = res.data.pageNumber
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
    },
    // 编辑框打开
    editOpen (val) {
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
          this.alertInfo()
        } else {
          this.editSign = true
          console.log(this.data[val])
          this.editGoodsNo = this.data[val].Rgoodsno
          this.editRno = this.data[val].Rno
        }
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 编辑框关闭
    editClose () {
      this.editSign = false
    },
    // 修改事件
    editChange (val) {
      this.editSign = false
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/public/modify_ratings',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'text': val.content,
          'start': val.start,
          'to_examine': '审核通过',
          'good_id': this.editGoodsNo,
          'no': this.editRno
        }
      }).then(res => {
        this.$message.success(res.data.info)
        if (this.dataSign === 1) {
          this.getContent()
        } else {
          this.find()
        }
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 无权限提示
    alertInfo () {
      this.$alert('卖家无法修改评论状态', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$message({
            type: 'error',
            message: `卖家无法修改评论状态`
          })
        }
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
.lookRating
  position absolute
  top 50px
  left 200px
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .lookRatingHeader
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
    .lookRatingHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .lookRatingTable
    position absolute
    margin-left 10px
    top 70px
    .el-table
      .lookRatingHeaderTextImg
        width 100px
        height 100px
    .lookRatingPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
    .lookRatingButton
      position absolute
      margin-top -35px
      right 10px
</style>
