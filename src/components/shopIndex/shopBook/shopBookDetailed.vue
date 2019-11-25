<template>
    <div class="shopBookDetailed">
      <div v-if="goodsContent.length === 20" v-loading="loading">
        <el-row v-for="item in (goodsContent.length / 5)" :key="item" class="el-row-shopBookDetailed">
          <el-col class="good1" v-on:click.native="enterShopPage((item - 1) * 5)">
            <img :src="getPhoto((item - 1) * 5)" alt="">
            <br>
            <span class="goodName1">{{ getName((item - 1) * 5) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice1">￥{{ getPrice((item - 1) * 5) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good2" v-on:click.native="enterShopPage((item - 1) * 5 + 1)">
            <img :src="getPhoto((item - 1) * 5 + 1)" alt="">
            <br>
            <span class="goodName2">{{ getName((item - 1) * 5 + 1) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice2">￥{{ getPrice((item - 1) * 5 + 1)}}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good3" v-on:click.native="enterShopPage((item - 1) * 5 + 2)">
            <img :src="getPhoto(((item - 1) * 5) + 2)" alt="">
            <br>
            <span class="goodName3">{{ getName(((item - 1) * 5) + 2) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice3">￥{{ getPrice(((item - 1) * 5) + 2) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good4" v-on:click.native="enterShopPage((item - 1) * 5 + 3)">
            <img :src="getPhoto(((item - 1) * 5) + 3)" alt="">
            <br>
            <span class="goodName4">{{ getName(((item - 1) * 5) + 3) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice4">￥{{ getPrice(((item - 1) * 5) + 3) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good5" v-on:click.native="enterShopPage((item - 1) * 5 + 4)">
            <img :src="getPhoto(((item - 1) * 5) + 4)" alt="">
            <br>
            <span class="goodName5">{{ getName(((item - 1) * 5) + 4) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice5">￥{{ getPrice(((item - 1) * 5) + 4) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div  v-if="goodsContent.length < 20" v-loading="loading">
        <el-row v-for="item in ((goodsContent.length - (goodsContent.length % 5)) / 5)" :key="item" class="el-row-shopBookDetailed">
          <el-col class="good1" v-on:click.native="enterShopPage((item - 1) * 5)">
            <img :src="getPhoto((item - 1) * 5)" alt="">
            <br>
            <span class="goodName1">{{ getName((item - 1) * 5) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice1">￥{{ getPrice((item - 1) * 5) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good2" v-on:click.native="enterShopPage((item - 1) * 5 + 1)">
            <img :src="getPhoto((item - 1) * 5 + 1)" alt="">
            <br>
            <span class="goodName2">{{ getName((item - 1) * 5 + 1) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice2">￥{{ getPrice((item - 1) * 5 + 1)}}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good3" v-on:click.native="enterShopPage((item - 1) * 5 + 2)">
            <img :src="getPhoto(((item - 1) * 5) + 2)" alt="">
            <br>
            <span class="goodName3">{{ getName(((item - 1) * 5) + 2) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice3">￥{{ getPrice(((item - 1) * 5) + 2) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good4" v-on:click.native="enterShopPage((item - 1) * 5 + 3)">
            <img :src="getPhoto(((item - 1) * 5) + 3)" alt="">
            <br>
            <span class="goodName4">{{ getName(((item - 1) * 5) + 3) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice4">￥{{ getPrice(((item - 1) * 5) + 3) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good5" v-on:click.native="enterShopPage((item - 1) * 5 + 4)">
            <img :src="getPhoto(((item - 1) * 5) + 4)" alt="">
            <br>
            <span class="goodName5">{{ getName(((item - 1) * 5) + 4) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice5">￥{{ getPrice(((item - 1) * 5) + 4) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="el-row-shopBookDetailed">
          <el-col class="good1" v-if="(goodsContent.length % 5) >= 1" v-on:click.native="enterShopPage(goodsContent.length - (goodsContent.length % 5))">
            <img :src="getPhoto((goodsContent.length - (goodsContent.length % 5)))" alt="">
            <br>
            <span class="goodName1">{{ getName((goodsContent.length - (goodsContent.length % 5))) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice1">￥{{ getPrice((goodsContent.length - (goodsContent.length % 5))) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good2" v-if="(goodsContent.length % 5) >= 2" v-on:click.native="enterShopPage(goodsContent.length - (goodsContent.length % 5) + 1)">
            <img :src="getPhoto((goodsContent.length - (goodsContent.length % 5)) + 1)" alt="">
            <br>
            <span class="goodName2">{{ getName((goodsContent.length - (goodsContent.length % 5)) + 1) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice2">￥{{ getPrice((goodsContent.length - (goodsContent.length % 5)) + 1) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good3" v-if="(goodsContent.length % 5) >= 3" v-on:click.native="enterShopPage(goodsContent.length - (goodsContent.length % 5) + 2)">
            <img :src="getPhoto((goodsContent.length - (goodsContent.length % 5)) + 2)" alt="">
            <br>
            <span class="goodName3">{{ getName((goodsContent.length - (goodsContent.length % 5)) + 2) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice3">￥{{ getPrice((goodsContent.length - (goodsContent.length % 5)) + 2) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good4" v-if="(goodsContent.length % 5) >= 4" v-on:click.native="enterShopPage(goodsContent.length - (goodsContent.length % 5) + 3)">
            <img :src="getPhoto((goodsContent.length - (goodsContent.length % 5)) + 3)" alt="">
            <br>
            <span class="goodName4">{{ getName((goodsContent.length - (goodsContent.length % 5)) + 3) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice4">￥{{ getPrice((goodsContent.length - (goodsContent.length % 5)) + 3) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="good5" v-if="(goodsContent.length % 5) >= 5" v-on:click.native="enterShopPage(goodsContent.length - (goodsContent.length % 5) + 4)">
            <img :src="getPhoto((goodsContent.length - (goodsContent.length % 5)) + 4)" alt="">
            <br>
            <span class="goodName5">{{ getName((goodsContent.length - (goodsContent.length % 5)) + 4) }}</span>
            <br>
            <el-row>
              <el-col>
                <span class="goodPrice5">￥{{ getPrice((goodsContent.length - (goodsContent.length % 5)) + 4) }}</span>
              </el-col>
              <el-col>
                <span class="el-icon-shopping-cart-2"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="pageNumber"
        v-bind:style="{'margin-top': '20px', 'margin-bottom': '60px'}">
      </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'shopBookDetailed',
  components: {},
  props: [
    'width',
    'selectNow',
    'widthNow'
  ],
  created () {
    this.getGoods(1)
  },
  data () {
    return {
      goodsContent: '',
      pageNumber: 0,
      loading: false,
      pageNow: 0
    }
  },
  computed: {
    // 获取图片
    getPhoto () {
      return (val) => {
        if (this.goodsContent.length === 0) {
          return ''
        } else {
          return this.goodsContent[val].imgUrl
        }
      }
    },
    // 获取名字
    getName () {
      return (val) => {
        if (this.goodsContent.length === 0) {
          return ''
        } else {
          return this.goodsContent[val].name
        }
      }
    },
    // 获取价格
    getPrice () {
      return (val) => {
        if (this.goodsContent.length === 0) {
          return ''
        } else {
          return this.goodsContent[val].price
        }
      }
    }
  },
  watch: {
    // 检测值变化
    selectNow () {
      this.getGoods(1)
      this.pageNow = 0
    }
  },
  methods: {
    // 获取分类商品
    getGoods (val) {
      this.loading = true
      let type = 3
      if (this.selectNow !== '热销') {
        type = 1
      }
      this.$axios({
        method: 'post',
        url: 'https://yitongli.cn/goodsApi/public/public_get_goods_detailed',
        data: {
          'type': type,
          'content': this.selectNow,
          'pageNum': val
        }
      }).then(res => {
        // console.log(res)
        this.loading = false
        this.goodsContent = res.data.goodsContent
        this.pageNumber = res.data.pageNumber
      })
    },
    // 回调当前页
    handleCurrentChange (val) {
      this.pageNow = val
      this.getGoods(val)
    },
    // 获取点击事件
    enterShopPage (val) {
      let goodId = this.goodsContent[val].good_id
      this.$router.push('/shopIndex/good/' + goodId + '&' + 1)
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
.shopBookDetailed
  margin 20px 0 20px 10px
  top 0
  left 0
  right 0
  width 1200px
  .el-row-shopBookDetailed
    margin-top 20px
    .good1:hover
      border:1px solid rgb(180,181,62)
    .good1:hover img
      transform scale(1.1)
    .good1
      padding 20px 0 20px 0
      width 200px
      height 320px
      border:1px solid rgb(187,187,187)
      cursor pointer
      transition all 0.4s
      > img
        padding-left 15px
        padding-right 15px
        width 168px
        height 200px
        transition all 0.4s
      .goodName1
        position absolute
        margin-top 10px
        padding-left 15px
        padding-right 15px
        overflow hidden
        width 168px
        height 40px
      .goodPrice1
        position absolute
        margin-top 40px
        padding-left 15px
        padding-right 15px
        font-size 22px
        color rgb(180,181,62)
      .el-icon-shopping-cart-2
        right 10px
        position absolute
        margin-top 40px
        font-size 28px
        color rgb(180,181,62)
    .good2:hover
      border:1px solid rgb(180,181,62)
    .good2:hover img
      transform scale(1.1)
    .good2
      margin-left 45px
      padding 20px 0 20px 0
      width 200px
      height 320px
      border:1px solid rgb(187,187,187)
      cursor pointer
      transition all 0.4s
      > img
        padding-left 15px
        padding-right 15px
        width 168px
        height 200px
        transition all 0.4s
      .goodName2
        position absolute
        margin-top 10px
        padding-left 15px
        padding-right 15px
        overflow hidden
        width 168px
        height 40px
      .goodPrice2
        position absolute
        margin-top 40px
        padding-left 15px
        padding-right 15px
        font-size 22px
        color rgb(180,181,62)
      .el-icon-shopping-cart-2
        right 10px
        position absolute
        margin-top 40px
        font-size 28px
        color rgb(180,181,62)
    .good3:hover
      border:1px solid rgb(180,181,62)
    .good3:hover img
      transform scale(1.1)
    .good3
      margin-left 45px
      padding 20px 0 20px 0
      width 200px
      height 320px
      border:1px solid rgb(187,187,187)
      cursor pointer
      > img
        padding-left 15px
        padding-right 15px
        width 168px
        height 200px
        transition all 0.4s
      .goodName3
        position absolute
        margin-top 10px
        padding-left 15px
        padding-right 15px
        overflow hidden
        width 168px
        height 40px
      .goodPrice3
        position absolute
        margin-top 40px
        padding-left 15px
        padding-right 15px
        font-size 22px
        color rgb(180,181,62)
      .el-icon-shopping-cart-2
        right 10px
        position absolute
        margin-top 40px
        font-size 28px
        color rgb(180,181,62)
    .good4:hover
      border:1px solid rgb(180,181,62)
    .good4:hover img
      transform scale(1.1)
    .good4
      margin-left 45px
      padding 20px 0 20px 0
      width 200px
      height 320px
      border:1px solid rgb(187,187,187)
      cursor pointer
      > img
        padding-left 15px
        padding-right 15px
        width 168px
        height 200px
        transition all 0.4s
      .goodName4
        position absolute
        margin-top 10px
        padding-left 15px
        padding-right 15px
        overflow hidden
        width 168px
        height 40px
      .goodPrice4
        position absolute
        margin-top 40px
        padding-left 15px
        padding-right 15px
        font-size 22px
        color rgb(180,181,62)
      .el-icon-shopping-cart-2
        right 10px
        position absolute
        margin-top 40px
        font-size 28px
        color rgb(180,181,62)
    .good5:hover
      border:1px solid rgb(180,181,62)
    .good5:hover img
      transform scale(1.1)
    .good5
      margin-left 45px
      padding 20px 0 20px 0
      width 200px
      height 320px
      border:1px solid rgb(187,187,187)
      cursor pointer
      > img
        padding-left 15px
        padding-right 15px
        width 168px
        height 200px
        transition all 0.4s
      .goodName5
        position absolute
        margin-top 10px
        padding-left 15px
        padding-right 15px
        overflow hidden
        width 168px
        height 40px
      .goodPrice5
        position absolute
        margin-top 40px
        padding-left 15px
        padding-right 15px
        font-size 22px
        color rgb(180,181,62)
      .el-icon-shopping-cart-2
        right 10px
        position absolute
        margin-top 40px
        font-size 28px
        color rgb(180,181,62)
</style>
