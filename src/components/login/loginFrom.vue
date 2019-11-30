<template>
    <div class="loginFrom">
      <span class="loginFromTitle">
        密码登录
      </span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-bind:style="{'margin-top': '20px'}">
        <el-form-item label="用户名" prop="Uname">
          <el-input v-model="ruleForm.Uname" v-bind:style="{'width': '400px'}"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Upwd">
          <el-input v-model="ruleForm.Upwd" show-password v-bind:style="{'width': '400px'}"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" v-bind:style="{'width': '450px', 'margin-bottom': '10px'}">
          <el-row>
            <el-col :span="12">
              <el-input v-model="ruleForm.captcha" v-bind:style="{'width': '200px'}"></el-input>
            </el-col>
            <el-col :span="12">
              <img id="verificationCodeImg" v-bind:src="'data:image/png;base64,' + captchaImg" v-on:click="refreshCaptchaImg()">
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-row>
        <el-checkbox class="selectBox" v-model="checked">
          请阅读
          <el-button type="text" v-on:click="loginInfo()">《服务条款》</el-button>
        </el-checkbox>
      </el-row>
      <el-row>
        <el-button class="loginButton" type="success" v-on:click="submitForm()">登 录</el-button>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'loginFrom',
  components: {},
  props: [],
  created () {
    this.getCaptchaImg()
  },
  data () {
    return {
      ctoken: '',
      captchaImg: '',
      checked: false,
      timer: {},
      ruleForm: {
        Uname: '',
        Upwd: '',
        captcha: ''
      },
      rules: {
        Uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        Upwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 10, message: '密码长度应大于 10 个字符', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码应为 4 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取验证码图片
    getCaptchaImg () {
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/user/verification_code'
      }).then(res => {
        this.ctoken = res.headers.ctoken
        this.captchaImg = res.data.base64
      }).catch(() => {
        this.$message.error('获取验证码图片失败，请检查你的网络连接')
      })
    },
    // 刷新验证码图片
    refreshCaptchaImg () {
      this.getCaptchaImg()
      setTimeout(() => {
        this.$message.info('刷新验证码')
      }, 1000)
    },
    // 点击登录按钮事件
    submitForm () {
      if (this.checked === true) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'http://139.155.33.105/goodsApi/user/login',
              data: this.ruleForm,
              headers: {
                ctoken: this.ctoken,
                code: this.ruleForm.captcha
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success('登录成功，即将返回主页')
                  console.log(res.headers.token)
                  this.$store.dispatch('token_actions', res.headers.token)
                  this.$store.dispatch('username_actions', res.headers.username)
                  setTimeout(() => {
                    this.$router.push('/')
                  }, 1000)
                } else {
                  this.$message.error(res.data.info)
                  this.refreshCaptchaImg()
                }
              })
          } else {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }
        })
      } else {
        this.$message.error('请阅读《服务条款》')
      }
    },
    // 服务条款
    loginInfo () {
      this.$notify({
        title: '服务条例',
        message: '闲置商品交易平台开发的总目标是为了闲置商品的处理提供了一个更好的平台，平台提供买卖家公平交易。',
        duration: 4500
      })
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.refreshCaptchaImg()
    }, 30000)
    document.onkeydown = () => {
      let _key = window.event.keyCode
      if (_key === 13) {
        this.submitForm()
      }
    }
  },
  updated () {
  },
  destroyed () {
    // 清除定时器
    clearInterval(this.timer)
  }
}
</script>

<style lang="stylus">
.loginFrom
  top 0
  left 0
  right 0
  width 1200px
  .loginFromTitle
    left 100px
    position relative
    font-family Microsoft Yahei
    font-size 25px
  #verificationCodeImg
    margin-left 40px
    height 35px
    border-radius 10px
    cursor pointer
  .selectBox
    margin-left 100px
  .loginButton
    margin-left 100px
    width 400px
</style>
