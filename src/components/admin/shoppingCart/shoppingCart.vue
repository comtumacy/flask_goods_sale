<template>
    <div class="shoppingCart" v-loading="loading">
      <el-row class="shoppingCartHeader">
        <span class="el-icon-shopping-cart-full"></span>
        <span class="shoppingCartHeaderText">购物车</span>
      </el-row>
      <div class="shoppingCartTable">
        <div v-bind:style="{'background-color': 'white'}">
          <el-table
            :data="data"
            border
            @selection-change="handleSelectionChange"
            :style="{'width': (widthNow - 220) + 'px'}">
            <el-table-column
              label="图片"
              width="150"
              header-align="center"
              align="center"
              :resizable="false">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="" class="shoppingCartHeaderTextImg">
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
              label="单价（元）"
              width="130"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="disCount"
              label="折扣"
              width="130"
              header-align="center"
              align="center"
              :resizable="false"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="oldPrice"
              label="原价（元）"
              width="130"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="number"
              label="数量"
              width="130"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
            <el-table-column
              prop="allPrice"
              label="总价（元）"
              width="130"
              header-align="center"
              align="center"
              :resizable="false">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="pageAllNumber"
            class="shoppingCartPage">
          </el-pagination>
          <span class="shoppingCartMoney">
            总价格：
            <span class="shoppingCartMoney2">
              {{ getLast }}
            </span>
            元
          </span>
          <el-button v-on:click="handleDelete()" class="shoppingCartButton1" type="danger" size="small">批量删除</el-button>
          <el-button v-on:click="goToBuy()" class="shoppingCartButton2" type="success" size="small">去结算</el-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'shoppingCart',
  components: {},
  props: ['widthNow'],
  created () {
    this.getContent()
  },
  data () {
    return {
      loading: false,
      multipleSelection: [],
      data: [],
      allData: [],
      pageAllNumber: 0,
      pageNow: 1
    }
  },
  computed: {
    // 获取最后金额
    getLast () {
      let money = 0
      for (let i = 0; i < this.allData.length; i++) {
        money = money + this.allData[i].price * this.allData[i].number
      }
      return money
    }
  },
  watch: {
    allData () {
      if (this.allData.length !== this.$store.getters.goods_getters.length) {
        this.loading = true
      } else {
        this.loading = false
        this.data = this.allData.slice(0, 5)
      }
    }
  },
  methods: {
    // 获取多选框选择值
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除当前商品
    handleDelete () {
      this.$confirm('是否删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('goods_type_actions', 1)
        this.getContent()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取内容
    getContent () {
      let goods = this.$store.getters.goods_getters
      let data = []
      this.pageAllNumber = goods.length
      for (let i = 0; i < goods.length; i++) {
        this.$axios({
          method: 'post',
          url: 'http://139.155.33.105/goodsApi/buyer/look_good',
          headers: {
            'token': this.$store.getters.token_getters,
            'Uname': this.$store.getters.username_getters
          },
          data: {
            'good_id': goods[i].ID,
            'type': goods[i].type
          }
        }).then(res => {
          let allPrice = (res.data.content[0].price) * goods[i].number
          data.push({ 'img': res.data.content[0].img, 'disCount': res.data.content[0].disCount, 'goodId': goods[i].ID, 'name': res.data.content[0].name, 'price': res.data.content[0].price, 'oldPrice': res.data.content[0].oldPrice, 'number': goods[i].number, 'allPrice': allPrice })
        }).catch(() => {
          this.$message.error('获取失败，请检查你的网络连接')
        })
      }
      this.allData = data
    },
    // 回调当前页
    handleCurrentChange (val) {
      this.data = this.allData.slice(((val - 1) * 5), (val * 5))
      this.pageNow = val
    },
    // 去生产订单
    goToBuy () {
      console.log(this.$store.getters.goods_getters)
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/buyer/buy_good',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'content': this.$store.getters.goods_getters
        }
      }).then(res => {
        this.$message.success(res.data.info)
        this.$store.dispatch('goods_type_actions', 1)
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
.shoppingCart
  position absolute
  top 50px
  left 200px
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .shoppingCartHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .el-icon-shopping-cart-full
      position absolute
      left 20px
      top 20px
      font-size 22px
    .shoppingCartHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .shoppingCartTable
    position absolute
    margin-left 10px
    top 70px
    .el-table
      .shoppingCartHeaderTextImg
        width 100px
        height 100px
    .shoppingCartPage
      padding-top 5px
      padding-bottom 5px
      left 130px
      background-color white
    .shoppingCartMoney
      width 150px
      position absolute
      margin-top -30px
      right 216px
      .shoppingCartMoney2
        color red
        font-size 22px
    .shoppingCartButton1
      width 80px
      position absolute
      margin-top -35px
      right 106px
    .shoppingCartButton2
      width 80px
      position absolute
      margin-top -35px
      right 16px
</style>
