<template>
  <div class="goodIndex" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}"  v-loading.fullscreen.lock="loading">
    <el-row>
      <el-col>
        <img :src="getPhoto" alt="" class="goodPhoto">
      </el-col>
      <el-col>
        <el-row>
          <span class="goodTitle">{{ getTitle }}</span>
        </el-row>
        <el-row>
          <span class="goodAuthor" v-if="this.type === '1'">作者：{{ getAuthor }}</span>
          <span class="goodPhoneTitle" v-if="this.type === '2'">子标题：{{ getPhoneTitle }}</span>
        </el-row>
        <el-row>
          <span class="goodArea" v-if="this.type === '1'">出版社：{{ getArea }}</span>
          <span class="GoodSystem" v-if="this.type === '2'">手机{{ getGoodSystem }}</span>
        </el-row>
        <el-row>
          <span class="goodPublishingTime" v-if="this.type === '1'">出版时间：{{ getPublishingTime }}</span>
          <span class="goodScreenSize" v-if="this.type === '2'">手机屏幕尺寸：{{ getScreenSize }}</span>
        </el-row>
        <el-row v-bind:class="type === '1' ? 'goodPrice' : 'goodPricePhone'">
          <el-row>
            <el-col>
              <span class="goodPrice1">价格：￥</span>
              <span class="goodPrice2">{{ getPrice }}</span>
              <span class="goodPrice3" v-if="this.type === '1'">({{ getDiscount }}折)</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span class="goodPrice4" v-if="this.type === '1'">原价：￥</span>
              <span class="goodPrice4Phone" v-if="this.type === '2'">限时促销</span>
              <span class="goodPrice5" v-if="this.type === '1'">{{ getOldPrice }}</span>
            </el-col>
          </el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col>
            <span class="goodNumber">库存：{{ getNumber }}</span>
          </el-col>
        </el-row>
        <el-row>
          <div class="selectNumber">
            <el-input-number
              v-model="enterNumber"
              @change="selectNumber"
              :min="1"
              :max="parseInt(getNumber)">
            </el-input-number>
          </div>
        </el-row>
        <el-row>
          <el-button type="success" class="buyButton" v-on:click="goToBuy()">立即购买</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-menu
      :default-active="activeIndex"
      class="goodIndexMenu"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(255,255,255)"
      text-color="black"
      active-text-color="rgb(180,181,62)">
      <el-menu-item index="商品详情">商品详情</el-menu-item>
      <el-menu-item index="商品评论">商品评论</el-menu-item>
    </el-menu>
    <div class="goodDetailed" v-show="selectNow === '商品详情'">
      <el-row>
        <el-col>
          <span class="goodIntroduction" v-if="this.type === '1'">简介：{{ getIntroduction }}</span>
          <span class="GoodWeight" v-if="this.type === '2'">手机重量：{{ getGoodWeight }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="goodOpenBook" v-if="this.type === '1'">开本：{{ getOpenBook }}</span>
          <span class="GoodFrom" v-if="this.type === '2'">手机产地：{{ getGoodFrom }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="goodPacking" v-if="this.type === '1'">订装：{{ getPacking }}</span>
          <span class="goodSignal" v-if="this.type === '2'">信号制式：{{ getSignal }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="goodPaper" v-if="this.type === '1'">纸张：{{ getPaper }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="goodSuit" v-if="this.type === '1'">是否套装：{{ getSuit }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="goodNewAndOldDegree" v-if="this.type === '1'">新旧程度：{{ getNewAndOldDegree }} 成新</span>
        </el-col>
      </el-row>
    </div>
    <div class="goodRatings" v-if="selectNow === '商品评论'">
      <div class="goodRating" v-for="item in getRatingsNumber" :key="item">
        <el-row>
          <el-col>
            <img class="goodIcon" :src="getRatingIcon(item)" alt="" v-bind:style="{'top': (550 + item * 180) + 'px'}">
          </el-col>
          <el-col>
            <el-row>
              <el-col>
                <span class="goodRatingUser" v-bind:style="{'top': (550 + item * 180) + 'px'}">{{ getRatingUser(item) }}</span>
              </el-col>
              <el-col>
                <span class="goodRatingStar" v-bind:style="{'top': (575 + item * 180) + 'px'}">评分：
                  <span v-bind:style="{'top': (620 + item * 180) + 'px', 'color': 'rgb(180,181,62)'}">
                    {{ getRate(item) }}
                  </span>分</span>
              </el-col>
              <el-col>
                <span class="goodTime" v-bind:style="{'top': (540 + item * 180) + 'px'}">评论时间：{{ getRtime(item) }}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span>
              <span class="goodText" v-bind:style="{'top': (620 + item * 180) + 'px'}">&nbsp;&nbsp;评论详情：{{ getText(item) }}</span>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodIndex',
  components: {},
  props: ['width', 'id'],
  created () {
    this.ID = this.id.slice(0, -2)
    this.type = this.id.substr(-1, 1)
    this.$axios({
      method: 'post',
      url: 'http://139.155.33.105/goodsApi/public/public_get_goods_id',
      data: {
        'type': parseInt(this.type),
        'good_id': this.ID
      }
    }).then(res => {
      this.loading = false
      this.data = res.data
      console.log(res)
    })
  },
  data () {
    return {
      loading: true,
      ID: '',
      type: '',
      data: {},
      enterNumber: 1,
      activeIndex: '商品详情',
      selectNow: '商品详情',
      RateValue: 0,
      number: 1
    }
  },
  computed: {
    // 获取图片
    getPhoto () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        if (this.type === '1') {
          return this.data.goodsContent[0].book_img
        } else {
          console.log(2)
          return this.data.goodsContent[0].img
        }
      }
    },
    // 获取标题
    getTitle () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        if (this.type === '1') {
          return this.data.goodsContent[0].Name
        } else {
          return this.data.goodsContent[0].good_title
        }
      }
    },
    // 获取子标题
    getPhoneTitle () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        return this.data.goodsContent[0].title
      }
    },
    // 获取作家
    getAuthor () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].Author
      }
    },
    // 获取手机系统类型
    getGoodSystem () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].good_system
      }
    },
    // 获取出版社
    getArea () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        return this.data.goodsContent[0].Area
      }
    },
    // 获取出版时间
    getPublishingTime () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        return this.data.goodsContent[0].Publishing_time
      }
    },
    // 获取手机屏幕尺寸
    getScreenSize () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        return this.data.goodsContent[0].screen_size
      }
    },
    // 获取价格
    getPrice () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        if (this.type === '1') {
          return this.data.goodsContent[0].Price
        } else {
          console.log(2)
          return this.data.goodsContent[0].price
        }
      }
    },
    // 获取折扣
    getDiscount () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        if (this.data.goodsContent[0].Discount === '') {
          return '10'
        } else {
          return this.data.goodsContent[0].Discount
        }
      }
    },
    // 获取原价
    getOldPrice () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        if (this.data.goodsContent[0].Old_price === '') {
          return this.data.goodsContent[0].Price
        } else {
          return this.data.goodsContent[0].Old_price
        }
      }
    },
    // 获取库存
    getNumber () {
      if (!this.data.goodsContent) {
        return ''
      } else {
        if (this.type === '1') {
          return this.data.goodsContent[0].number
        } else {
          console.log(2)
          return this.data.goodsContent[0].number
        }
      }
    },
    // 获取简介
    getIntroduction () {
      if (!this.data.goodsContent) {
        return '无简介'
      } else {
        return this.data.goodsContent[0].Introduction
      }
    },
    // 获取手机重量
    getGoodWeight () {
      if (!this.data.goodsContent) {
        return '无简介'
      } else {
        return this.data.goodsContent[0].good_weight
      }
    },
    // 获取开本
    getOpenBook () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].Open_book
      }
    },
    // 获取手机产地
    getGoodFrom () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].good_from
      }
    },
    // 获取订装
    getPacking () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].Packing
      }
    },
    // 获取信号制式
    getSignal () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].signal
      }
    },
    // 获取纸张
    getPaper () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].Paper
      }
    },
    // 获取是否套装
    getSuit () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].Suit
      }
    },
    // 获取新旧程度
    getNewAndOldDegree () {
      if (!this.data.goodsContent) {
        return '无'
      } else {
        return this.data.goodsContent[0].NewAndOldDegree
      }
    },
    // 评论条数获取
    getRatingsNumber () {
      if (!this.data.goodsRating) {
        return '无'
      } else {
        return this.data.goodsRating.length
      }
    },
    // 获取评论用户头像
    getRatingIcon () {
      return function (val) {
        if (!this.data.goodsRating) {
          return ''
        } else {
          return this.data.goodsRating[val - 1].Ricon
        }
      }
    },
    // 获取评论用户的用户名
    getRatingUser () {
      return function (val) {
        if (!this.data.goodsRating) {
          return ''
        } else {
          return this.data.goodsRating[val - 1].ratinguser
        }
      }
    },
    // 获取评分
    getRate () {
      return function (val) {
        if (!this.data.goodsRating) {
          return ''
        } else {
          return parseInt(this.data.goodsRating[val - 1].Rstarts)
        }
      }
    },
    // 获取评论时间
    getRtime () {
      return function (val) {
        if (!this.data.goodsRating) {
          return ''
        } else {
          return this.data.goodsRating[val - 1].Rtimes
        }
      }
    },
    // 获取评论内容
    getText () {
      return function (val) {
        if (!this.data.goodsRating) {
          return ''
        } else {
          return this.data.goodsRating[val - 1].Rtext
        }
      }
    }
  },
  watch: {},
  methods: {
    // 选择购买数量
    selectNumber (val) {
      this.number = val
    },
    // 回调选择的点菜单栏
    handleSelect (key) {
      this.selectNow = key
    },
    // 去购买
    goToBuy () {
      if (this.$store.getters.token_getters === 'null') {
        this.$message.error('请先登录！')
      } else {
        let good = {
          'ID': this.ID,
          'number': this.number,
          'type': this.type
        }
        this.$store.dispatch('goods_actions', good)
        this.$message.success(`商品  《${this.getTitle}》  加入购物车成功`)
        setTimeout(() => {
          this.$confirm(`是否进入购物车进行结算?`, '提示', {
            confirmButtonText: '进入',
            cancelButtonText: '再想想',
            type: 'warning'
          }).then(() => {
            this.$router.push('/admin/shoppingCart')
          })
        }, 500)
        // console.log(this.$store.getters.goods_getters)
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
.goodIndex
  top 0
  left 0
  right 0
  width 1200px
  .goodPhoto
    position absolute
    top 250px
    width 400px
    height 400px
    border:1px solid rgb(187,187,187)
  .goodTitle
    position absolute
    top 250px
    left 450px
    width 750px
    height 30px
    font-size 20px
    font-family Microsoft YaHei
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .goodAuthor
    position absolute
    margin-left 15px
    top 290px
    left 450px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
  .goodPhoneTitle
    position absolute
    margin-left 15px
    top 290px
    left 450px
    width 580px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .goodArea
    position absolute
    margin-left 15px
    top 320px
    left 450px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
  .GoodSystem
    position absolute
    margin-left 15px
    top 320px
    left 450px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
  .goodPublishingTime
    position absolute
    margin-left 15px
    top 350px
    left 450px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
  .goodScreenSize
    position absolute
    margin-left 15px
    top 350px
    left 450px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
  .goodPrice
    position absolute
    top 390px
    left 450px
    width 540px
    height 105px
    background-color rgb(243,243,243)
    .goodPrice1
      position absolute
      margin-top 25px
      margin-left 15px
      font-size 16px
      font-family Microsoft YaHei
      color rgb(100,100,100)
    .goodPrice2
      position absolute
      margin-top 11px
      margin-left 85px
      font-size 35px
      font-family Microsoft YaHei
      color red
    .goodPrice3
      position absolute
      margin-top 25px
      margin-left 200px
      font-size 16px
      font-family Microsoft YaHei
      color rgb(100,100,100)
    .goodPrice4
      position absolute
      margin-top 60px
      margin-left 15px
      font-size 16px
      font-family Microsoft YaHei
      color rgb(100,100,100)
    .goodPrice5
      position absolute
      margin-top 60px
      margin-left 80px
      font-size 16px
      font-family Microsoft YaHei
      text-decoration line-through
      color rgb(100,100,100)
  .goodPricePhone
    position absolute
    top 390px
    left 450px
    width 540px
    height 105px
    background-color rgb(243,243,243)
    .goodPrice1
      position absolute
      margin-top 25px
      margin-left 15px
      font-size 16px
      font-family Microsoft YaHei
      color rgb(100,100,100)
    .goodPrice2
      position absolute
      margin-top 11px
      margin-left 85px
      font-size 35px
      font-family Microsoft YaHei
      color red
    .goodPrice4Phone
      position absolute
      margin-top 60px
      margin-left 15px
      font-family Microsoft YaHei
      font-size 25px
      color red
  .el-divider
    position absolute
    margin 0
    top 510px
    left 450px
    width 750px
  .goodNumber
    position absolute
    margin-left 15px
    top 535px
    left 650px
    font-size 16px
    font-family Microsoft YaHei
    color rgb(100,100,100)
  .selectNumber
    position absolute
    margin-left 15px
    top 525px
    left 450px
  .buyButton
    position absolute
    margin-left 15px
    top 590px
    left 450px
    width 180px
  .goodIndexMenu
    top 700px
    > li
      height 50px
      padding-left 7px
      padding-right 7px
      width 69px
      line-height 55px
      text-align center
  .goodDetailed
    .goodIntroduction
      position absolute
      padding-bottom 20px
      top 930px
      font-family Microsoft YaHei
    .GoodWeight
      position absolute
      top 730px
      font-family Microsoft YaHei
    .goodOpenBook
      position absolute
      top 730px
      font-family Microsoft YaHei
    .goodPacking
      position absolute
      top 770px
      font-family Microsoft YaHei
    .GoodFrom
      position absolute
      top 770px
      font-family Microsoft YaHei
    .goodPaper
      position absolute
      top 810px
      font-family Microsoft YaHei
    .goodSignal
      position absolute
      top 810px
      font-family Microsoft YaHei
    .goodSuit
      position absolute
      padding-bottom 20px
      top 850px
      font-family Microsoft YaHei
    .goodNewAndOldDegree
      position absolute
      padding-bottom 20px
      top 890px
      font-family Microsoft YaHei
  .goodRatings
    margin-left 10px
    .goodRating
      .goodIcon
        position absolute
        width 70px
        height 70px
        border-radius 20px
      .goodRatingUser
        position absolute
        margin-left 85px
      .goodRatingStar
        position absolute
        margin-left 85px
      .goodTime
        position absolute
        right 0
      .goodText
        position absolute
        margin-left 80px
        overflow hidden
        height 65px
</style>
