<template>
    <div class="shopIndexNavigation">
      <div class="navigationTitle" v-bind:style="{'width': '100%'}">
        <div class="navigationButton" v-bind:style="{'margin-left': (width / 2) + 'px', 'margin-right': (width / 2) + 'px',}">
          <el-menu
            :default-active="activeIndex"
            class="navigationMenu1"
            mode="horizontal"
            @select="handleSelect1"
            background-color="rgb(245,247,250)"
            active-text-color="rgb(150,150,176)"
            text-color="rgb(150,150,176)">
            <el-submenu index="1">
              <template slot="title">商品分类</template>
              <el-submenu index="2">
                <template slot="title">书籍</template>
                <el-menu-item index="青春文学">青春文学</el-menu-item>
                <el-menu-item index="小说">小说</el-menu-item>
                <el-menu-item index="休闲/爱好">休闲/爱好</el-menu-item>
                <el-menu-item index="文学">文学</el-menu-item>
                <el-menu-item index="孕产/胎教">孕产/胎教</el-menu-item>
                <el-menu-item index="艺术">艺术</el-menu-item>
                <el-menu-item index="动漫/幽默">动漫/幽默</el-menu-item>
                <el-menu-item index="烹饪/美食">烹饪/美食</el-menu-item>
                <el-menu-item index="时尚/美妆">时尚/美妆</el-menu-item>
                <el-menu-item index="旅游/地图">旅游/地图</el-menu-item>
                <el-menu-item index="家庭/家居">家庭/家居</el-menu-item>
                <el-menu-item index="亲子/家教">亲子/家教</el-menu-item>
                <el-menu-item index="两性关系">两性关系</el-menu-item>
                <el-menu-item index="育儿/早教">育儿/早教</el-menu-item>
                <el-menu-item index="保健/养生">保健/养生</el-menu-item>
                <el-menu-item index="体育/运动">体育/运动</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">电子设备</template>
                <el-menu-item index="手机">手机</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
          <el-menu
            :default-active="activeIndex"
            class="navigationMenu2"
            mode="horizontal"
            background-color="#b4b53e"
            active-text-color="#ffffff"
            text-color="#ffffff">
            <el-menu-item index="2" v-on:click="goToRoute(2)">商品首页</el-menu-item>
            <el-menu-item index="3" v-on:click="goToRoute(3)">书籍热卖</el-menu-item>
            <el-menu-item index="4" v-on:click="goToRoute(4)">电子产品</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'shopIndexNavigation',
  components: {},
  props: [
    'width',
    'widthNow',
    'activeIndex'
  ],
  created () {},
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    // 回调点击事件1
    handleSelect1 (val) {
      let url = document.location.toString()
      let arrUrl = url.split('//')
      let start = arrUrl[1].indexOf('/')
      let relUrl = arrUrl[1].substring(start)
      if (val !== '手机') {
        if (relUrl !== '/#/shopIndex/shopBook') {
          this.$router.push('/shopIndex/shopBook')
        }
        this.$emit('selectNavigation1', val)
      } else {
        if (relUrl !== '/#/shopIndex/shopPhone') {
          this.$router.push('/shopIndex/shopPhone')
        }
        this.$emit('selectNavigation2', val)
      }
    },
    // 主菜单路由跳转
    goToRoute (val) {
      let url = document.location.toString()
      let arrUrl = url.split('//')
      let start = arrUrl[1].indexOf('/')
      let relUrl = arrUrl[1].substring(start)
      // console.log(relUrl)
      if (val === 2) {
        if (relUrl !== '/#/shopIndex/shopIndexChildIndex') {
          this.$router.push('/shopIndex/shopIndexChildIndex')
        }
      } else if (val === 3) {
        if (relUrl !== '/#/shopIndex/shopBook') {
          this.$router.push('/shopIndex/shopBook')
        }
      } else {
        if (relUrl !== '/#/shopIndex/shopPhone') {
          this.$router.push('/shopIndex/shopPhone')
        }
      }
    }
  },
  mounted () {},
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}
</script>

<style lang="stylus">
.shopIndexNavigation
  position absolute
  top 160px
  left 0
  right 0
  .navigationTitle
    height 50px
    background-color rgb(180,181,62)
    .navigationButton
      .navigationMenu1
        position absolute
        width 200px
        height 50px
        background-color rgb(180,181,62)
        > li
          .el-submenu__title
            width 200px
            height 50px
            font-family Microsoft Yahei
            font-size 18px
      .navigationMenu2
        position absolute
        margin-left 200px
        height 50px
        background-color rgb(180,181,62)
        > li
          height 50px
          font-family Microsoft Yahei
          font-size 18px
</style>
