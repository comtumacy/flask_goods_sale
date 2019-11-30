<template>
    <div class="addGood" v-loading="loading">
      <el-row class="addGoodHeader">
        <span class="icon-box-add"></span>
        <span class="addGoodHeaderText">商品添加</span>
      </el-row>
      <div v-if="judgeUserSign">
        <div class="addGoodPhoto">
          <span>商品图片上传</span>
          <el-upload
            class="avatar-uploader"
            action="http://139.155.33.105/goodsApi/seller/add_photo"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{'Uname': this.$store.getters.username_getters, 'token': this.$store.getters.token_getters, 'goodId': this.ruleForm.good_id, 'type': this.ruleForm.type}"
            name="img">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="selectAddType">
          <el-row>
            <span>请选择商品类型</span>
          </el-row>
          <el-row>
            <el-select class="el-select1" v-model="value1" placeholder="请选择商品类型">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <el-select class="el-select1" v-model="value2" placeholder="请选择商品子类型">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <el-select class="el-select1" v-model="value3" placeholder="请选择商品种类">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
        </div>
        <div class="addForm1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-form-item label="类型" prop="type">
                <el-col>
                  <el-select v-model="ruleForm.type" placeholder="请选择商品类型" v-bind:style="{'width': '100%'}">
                    <el-option label="书籍" value="1"></el-option>
                    <el-option label="手机" value="2"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>
            <el-form-item label="书籍ISBN码" prop="good_id">
              <el-input v-model="ruleForm.good_id"></el-input>
            </el-form-item>
            <el-form-item label="书名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
              <el-input v-model="ruleForm.discount"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="old_price">
              <el-input v-model="ruleForm.old_price"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="area">
              <el-input v-model="ruleForm.area"></el-input>
            </el-form-item>
            <el-form-item label="出版时间" prop="publishing_time">
              <el-input v-model="ruleForm.publishing_time"></el-input>
            </el-form-item>
            <el-form-item label="开本" prop="open_book">
              <el-input v-model="ruleForm.open_book"></el-input>
            </el-form-item>
            <el-form-item label="纸张质量" prop="paper">
              <el-input v-model="ruleForm.paper"></el-input>
            </el-form-item>
            <el-form-item label="包装" prop="packing">
              <el-input v-model="ruleForm.packing"></el-input>
            </el-form-item>
            <el-form-item label="是否套装" prop="suit">
              <el-input v-model="ruleForm.suit"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
              <el-input v-model="ruleForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="新旧程度" prop="new_and_old_degree">
              <el-input v-model="ruleForm.new_and_old_degree"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="number">
              <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button class="addGoodButton" type="warning" v-on:click="addGood()">添加商品</el-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'addGood',
  components: {},
  props: ['widthNow', 'heightNow'],
  created () {
    this.loading = true
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
        this.judgeUserSign = true
        this.getContent()
      } else {
        this.alertInfo()
      }
    })
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  data () {
    return {
      loading: false,
      imageUrl: '',
      judgeUserSign: false,
      ruleForm: {
        type: '',
        good_id: '',
        name: '',
        price: '',
        discount: '',
        old_price: '',
        author: '',
        area: '',
        publishing_time: '',
        open_book: '',
        paper: '',
        packing: '',
        suit: '',
        introduction: '',
        new_and_old_degree: '',
        number: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        good_id: [
          { required: true, message: '请输入书籍ISBN码', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入书名', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        discount: [
          { required: false, message: '请输入折扣', trigger: 'blur' }
        ],
        old_price: [
          { required: false, message: '请输入原价', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入出版社名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        publishing_time: [
          { required: true, message: '请输入出版时间', trigger: 'blur' }
        ],
        open_book: [
          { required: true, message: '请输入开本类型', trigger: 'blur' }
        ],
        paper: [
          { required: true, message: '请输入纸张质量', trigger: 'blur' }
        ],
        packing: [
          { required: true, message: '请输入包装类型', trigger: 'blur' }
        ],
        suit: [
          { required: true, message: '请输入是否套装', trigger: 'blur' },
          { min: 1, max: 1, message: '长度在 1 个字符，是或否', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { max: 50, message: '长度在 12 到 50 个字符', trigger: 'blur' }
        ],
        new_and_old_degree: [
          { required: true, message: '请输入新旧程度', trigger: 'blur' },
          { min: 1, max: 1, message: '长度在 1 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { min: 1, max: 2, message: '长度小于 2 个字符', trigger: 'blur' }
        ]
      },
      options1: [{
        value: '书籍',
        label: '书籍商品'
      }, {
        value: '电子设备',
        label: '电子设备'
      }],
      value1: '',
      options2: [],
      value2: '',
      options3: [],
      value3: '',
      value4: ''
    }
  },
  computed: {},
  watch: {
    // 深度监听对象内部属性的改变
    'value1': {
      handler () {
        this.selectType1()
      },
      deep: true,
      immediate: false
    },
    'value2': {
      handler () {
        this.selectType2()
      },
      deep: true,
      immediate: false
    },
    'value3': {
      handler () {
        this.selectType3()
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    // 无权限提示
    alertInfo () {
      this.$alert('买家无法添加商品', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          this.$message({
            type: 'error',
            message: `买家无法添加商品`
          })
        }
      })
    },
    // 图片上传成功函数
    handleAvatarSuccess (res) {
      console.log(res)
      this.$message.success(res.info)
      this.imageUrl = res.url
    },
    // 图片上传前检查函数
    beforeAvatarUpload (file) {
      if (this.value3 === '') {
        this.$message.error('请先选择商品类型并输入书籍信息，成功将书籍信息上传后再传输商品图片！！！')
        return false
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const isJPG = file.type === 'image/jpeg' || 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
              this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
          } else {
            this.$message.error('请先输入书籍信息，并成功将书籍信息上传后再传输商品图片！！！')
            return false
          }
        })
      }
    },
    // 选择商品类型1
    selectType1 () {
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/seller/select_type',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'num': 1,
          'content': this.value1
        }
      }).then(res => {
        this.options2.length = 0
        this.value2 = ''
        this.value3 = ''
        for (let i = 0; i < res.data.length; i++) {
          this.options2.push({ 'value': res.data[i], 'label': res.data[i] })
        }
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 选择商品类型2
    selectType2 () {
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/seller/select_type',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'num': 2,
          'content': this.value2
        }
      }).then(res => {
        this.options3.length = 0
        this.value3 = ''
        for (let i = 0; i < res.data.length; i++) {
          this.options3.push({ 'value': res.data[i], 'label': res.data[i] })
        }
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 选择商品类型3
    selectType3 () {
      this.value4 = ''
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/seller/select_type',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        },
        data: {
          'num': 3,
          'content': this.value3
        }
      }).then(res => {
        this.value4 = res.data[0]
      }).catch(() => {
        this.$message.error('获取失败，请检查你的网络连接')
      })
    },
    // 添加商品
    addGood () {
      if (this.value3 === '') {
        this.$message.error('请先选择商品类型')
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'http://139.155.33.105/goodsApi/seller/add_good',
              headers: {
                'token': this.$store.getters.token_getters,
                'Uname': this.$store.getters.username_getters
              },
              data: {
                'type': this.ruleForm.type,
                'good_id': this.ruleForm.good_id,
                'name': this.ruleForm.name,
                'price': this.ruleForm.price,
                'discount': this.ruleForm.discount,
                'old_price': this.ruleForm.old_price,
                'author': this.ruleForm.author,
                'area': this.ruleForm.area,
                'publishing_time': this.ruleForm.publishing_time,
                'open_book': this.ruleForm.open_book,
                'paper': this.ruleForm.paper,
                'packing': this.ruleForm.packing,
                'suit': this.ruleForm.suit,
                'introduction': this.ruleForm.introduction,
                'new_and_old_degree': this.ruleForm.new_and_old_degree,
                'number': this.ruleForm.number,
                'stid': this.value4,
                'book_img': 'null'
              }
            }).then(res => {
              this.$message.success(res.data.info)
            }).catch(() => {
              this.$message.info('请检查网络连接')
            })
          } else {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }
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
.addGood
  position absolute
  top 50px
  left 200px
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .addGoodHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .icon-box-add
      position absolute
      left 20px
      top 20px
      font-size 22px
    .addGoodHeaderText
      position absolute
      left 50px
      top 17px
      font-size 20px
  .addGoodPhoto
    position absolute
    left 80px
    top 150px
    > span
      margin-left 90px
      font-size 20px
      font-family Microsoft YaHei
    .avatar-uploader
      margin-top 20px
      .el-upload:hover
        border-color rgb(180,181,62)
      .el-upload
        border 2px dashed #d9d9d9
        border-radius 6px
        cursor pointer
        position relative
        overflow hidden
        > img
          width 300px
          height 300px
        .avatar-uploader-icon
          font-size 28px
          color #8c939d
          width 300px
          height 300px
          line-height 300px
          text-align center
  .selectAddType
    position absolute
    top 150px
    left 450px
    .el-row
      > span
        margin-left 80px
        font-size 18px
        font-family Microsoft YaHei
    .el-select1
      margin-top 20px
      width 300px
  .addForm1
    position absolute
    padding 10px
    top 120px
    left 850px
    height 700px
    width 700px
    overflow auto
    background-color white
    border-radius 10px
    box-shadow 5px 5px 5px -5px #888888
  .addGoodButton
    position absolute
    top 600px
    left 80px
    width 300px
</style>
