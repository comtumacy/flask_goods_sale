<template>
  <div class="goodsBar" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px'}">
    <div class="goodsHeaders1">
      <el-row>
        <el-col>
          <span class="el-icon-s-management"></span>
        </el-col>
        <el-col>
          <span class="goodsHeaders1text1">书籍</span>
          <span class="goodsHeaders1text2">热卖</span>
          <span class="goodsHeaders1text3">Book sale</span>
        </el-col>
        <el-col class="lookMore1">
          <el-button type="text">查看更多</el-button>
          <span class="el-icon-arrow-right"></span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="PropagandaPhoto">
        <el-col class="PropagandaPhoto">
          <img :src="getPropagandaPhoto(1)" alt="">
        </el-col>
        <el-col class="good1">
          <img :src="getPhoto(0)" alt="">
          <br>
          <span class="goodName1">{{ getName(0) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice1">￥{{ getPrice(0) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="good2">
          <img :src="getPhoto(1)" alt="">
          <br>
          <span class="goodName2">{{ getName(1) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice2">￥{{ getPrice(1) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="good3">
          <img :src="getPhoto(2)" alt="">
          <br>
          <span class="goodName3">{{ getName(2) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice3">￥{{ getPrice(2) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="good4">
          <img :src="getPhoto(3)" alt="">
          <br>
          <span class="goodName4">{{ getName(3) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice4">￥{{ getPrice(3) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="goodsHeaders2">
      <el-row>
        <el-col>
          <span class="el-icon-mobile-phone"></span>
        </el-col>
        <el-col>
          <span class="goodsHeaders1text1">手机</span>
          <span class="goodsHeaders1text2">热销</span>
          <span class="goodsHeaders1text3">Hot selling of mobile phones</span>
        </el-col>
        <el-col class="lookMore1">
          <el-button type="text">查看更多</el-button>
          <span class="el-icon-arrow-right"></span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="PropagandaPhoto">
        <el-col class="PropagandaPhoto">
          <img :src="getPropagandaPhoto(2)" alt="">
        </el-col>
        <el-col class="good1">
          <img :src="getPhoto2(0)" alt="">
          <br>
          <span class="goodName1">{{ getName2(0) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice1">￥{{ getPrice2(0) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="good2">
          <img :src="getPhoto2(1)" alt="">
          <br>
          <span class="goodName2">{{ getName2(1) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice2">￥{{ getPrice2(1) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="good3">
          <img :src="getPhoto2(2)" alt="">
          <br>
          <span class="goodName3">{{ getName2(2) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice3">￥{{ getPrice2(2) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="good4">
          <img :src="getPhoto2(3)" alt="">
          <br>
          <span class="goodName4">{{ getName2(3) }}</span>
          <br>
          <el-row>
            <el-col>
              <span class="goodPrice4">￥{{ getPrice2(3) }}</span>
            </el-col>
            <el-col>
              <span class="el-icon-shopping-cart-2"></span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsBar',
  components: {},
  props: ['width'],
  created () {
    this.getGoods1()
    this.getGoods2()
  },
  data () {
    return {
      goodIds: [],
      goodsContent: [],
      goodIds2: [],
      goodsContent2: []
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
    },
    // 获取图片
    getPhoto2 () {
      return (val) => {
        if (this.goodsContent2.length === 0) {
          return ''
        } else {
          return this.goodsContent2[val].imgUrl
        }
      }
    },
    // 获取名字
    getName2 () {
      return (val) => {
        if (this.goodsContent2.length === 0) {
          return ''
        } else {
          return this.goodsContent2[val].name
        }
      }
    },
    // 获取价格
    getPrice2 () {
      return (val) => {
        if (this.goodsContent2.length === 0) {
          return ''
        } else {
          return this.goodsContent2[val].price
        }
      }
    }
  },
  watch: {},
  methods: {
    // 获取主页商品栏商品1
    getGoods1 () {
      this.$axios({
        method: 'post',
        url: 'https://yitongli.cn/goodsApi/public/public_get_goods',
        data: { 'type': 1 }
      }).then(res => {
        this.goodIds = res.data.goodIds
        this.goodsContent = res.data.goodsContent
      })
    },
    // 获取主页商品栏商品2
    getGoods2 () {
      this.$axios({
        method: 'post',
        url: 'https://yitongli.cn/goodsApi/public/public_get_goods',
        data: { 'type': 2 }
      }).then(res => {
        this.goodIds2 = res.data.goodIds
        this.goodsContent2 = res.data.goodsContent
      })
    },
    // 获取宣传图片
    getPropagandaPhoto (val) {
      return require(`./goods${val}.jpg`)
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
.goodsBar
  position absolute
  top 700px
  left 0
  right 0
  width 1200px
  .goodsHeaders1
    .el-row
      .lookMore1
        position absolute
        right 0
        cursor pointer
        .el-button
          color rgb(180,181,62)
      .el-col
        width auto
        .el-icon-s-management
          font-size 33px
        .goodsHeaders1text1
          font-size 25px
          font-family Microsoft YaHei
        .goodsHeaders1text2
          color rgb(180,181,62)
          font-size 25px
          font-family Microsoft YaHei
        .goodsHeaders1text3
          padding-left 30px
          font-size 18px
          font-family sans-serif
          color rgb(187,187,187)
    .PropagandaPhoto
      .good1:hover
        border:1px solid rgb(180,181,62)
      .good1:hover img
        transform scale(1.1)
      .good1
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
  .goodsHeaders2
    margin-top 40px
    .el-row
      .lookMore1
        position absolute
        right 0
        cursor pointer
        .el-button
          color rgb(180,181,62)
      .el-col
        width auto
        .el-icon-mobile-phone
          font-size 33px
        .goodsHeaders1text1
          font-size 25px
          font-family Microsoft YaHei
        .goodsHeaders1text2
          color rgb(180,181,62)
          font-size 25px
          font-family Microsoft YaHei
        .goodsHeaders1text3
          padding-left 30px
          font-size 18px
          font-family sans-serif
          color rgb(187,187,187)
    .PropagandaPhoto
      .good1:hover
        border:1px solid rgb(180,181,62)
      .good1:hover img
        transform scale(1.1)
      .good1
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
</style>
