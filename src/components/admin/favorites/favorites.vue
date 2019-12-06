<template>
  <div class="favorites" v-loading="loading">
    <el-row class="favoritesHeader">
      <span class="el-icon-star-off"></span>
      <span class="favoritesHeaderText">我的收藏</span>
    </el-row>
    <div class="favoritesTable" v-bind:style="{'height': favoritesHeightNow + 'px'}">
      <div v-bind:style="{'background-color': 'white'}">
        <el-table
          :data="data"
          border
          @selection-change="handleSelectionChange"
          :style="{'width': (widthNow - 220) + 'px'}">
          <el-table-column
            header-align="center"
            align="center"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="图片"
            width="150"
            header-align="center"
            align="center"
            :resizable="false">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" class="favoritesHeaderTextImg">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            header-align="center"
            align="center"
            :resizable="false"
            :show-overflow-tooltip=true>
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格（元）"
            width="150"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            prop="disCount"
            label="折扣"
            width="150"
            header-align="center"
            align="center"
            :resizable="false"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="oldPrice"
            label="原价（元）"
            width="150"
            header-align="center"
            align="center"
            :resizable="false">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            header-align="center"
            align="center"
            :resizable="false">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.$index)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="pageAllNumber"
          class="favoritesPage">
        </el-pagination>
        <el-button v-on:click="deleteAll()" class="favoritesButton" type="danger" size="small">批量删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'favorites',
  components: {},
  props: ['widthNow', 'heightNow', 'favoritesHeightNow'],
  created () {
    this.getContent()
  },
  data () {
    return {
      loading: true,
      pageAllNumber: 0,
      pageNow: 1,
      multipleSelection: [],
      data: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 删除当前商品
    handleDelete (index) {
      this.$confirm('是否删除该收藏商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url: 'https://www.yitongli.cn/goodsApi/buyer/delete_favorites',
          headers: {
            'token': this.$store.getters.token_getters,
            'Uname': this.$store.getters.username_getters
          },
          data: {
            'good_id': this.data[index].goodId
          }
        }).then(res => {
          this.$message.success(res.data.info)
          this.getContent()
        }).catch(() => {
          this.$message.error('删除失败，请检查你的网络连接')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取内容
    getContent () {
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'https://www.yitongli.cn/goodsApi/buyer/look_favorites',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'pageNumber': this.pageNow
        }
      }).then(res => {
        this.loading = false
        this.data = res.data.content
        this.pageAllNumber = res.data.pageAllNumber
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 回调当前页
    handleCurrentChange (val) {
      this.pageNow = val
      this.getContent()
    },
    // 获取多选框选择值
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 多选删除
    deleteAll () {
      let num = this.multipleSelection.length
      if (num === 0) {
        this.$message({
          type: 'info',
          message: '请勾选需要删除的用户'
        })
      } else {
        this.$confirm(`此操作将永久删除您已经选择的 ${num} 个商品, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < num; i++) {
            this.$axios({
              method: 'post',
              url: 'https://www.yitongli.cn/goodsApi/buyer/delete_favorites',
              headers: {
                'token': this.$store.getters.token_getters,
                'Uname': this.$store.getters.username_getters
              },
              data: {
                'good_id': this.multipleSelection[i].goodId
              }
            }).then(() => {
            }).catch(() => {
              this.$message.error('删除失败，请检查你的网络')
            })
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          setTimeout(() => {
            this.getContent()
          }, 1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
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
.favorites
  position absolute
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .favoritesHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .el-icon-star-off
      position absolute
      left 20px
      top 20px
      font-size 22px
    .favoritesHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .favoritesTable
    position absolute
    margin-left 10px
    top 70px
    overflow auto
    .el-table
      .favoritesHeaderTextImg
        width 100px
        height 100px
    .favoritesPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
    .favoritesButton
      position absolute
      margin-top -35px
      right 10px
</style>
