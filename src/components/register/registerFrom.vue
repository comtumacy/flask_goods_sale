<template>
    <div class="registerFrom">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="Uname">
          <el-input v-model="ruleForm.Uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Upwd">
          <el-input v-model="ruleForm.Upwd" show-password>></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="安全问题" prop="Uquestion">
            <el-col>
              <el-select v-model="ruleForm.Uquestion" placeholder="请选择安全问题" v-bind:style="{'width': '100%'}">
                <el-option label="你的生日是？" value="你的生日是？"></el-option>
                <el-option label="你的出生地是？" value="你的出生地是？"></el-option>
                <el-option label="你的父亲是？" value="你的父亲是？"></el-option>
                <el-option label="你的母亲是？" value="你的母亲是？"></el-option>
                <el-option label="你最好的朋友是？" value="你最好的朋友是？"></el-option>
                <el-option label="你最喜欢吃的东西是？" value="你最喜欢吃的东西是？"></el-option>
                <el-option label="你最喜欢的运动是？" value="你最喜欢的运动是？"></el-option>
                <el-option label="你最喜欢的动物是？" value="你最喜欢的动物是？"></el-option>
                <el-option label="你的纪念日是？" value="你的纪念日是？"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="问题答案" prop="Uresult">
          <el-input v-model="ruleForm.Uresult"></el-input>
        </el-form-item>
        <el-form-item label="安全码" prop="Usafetycode">
          <el-input v-model="ruleForm.Usafetycode"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="用户类型" prop="Uroleid">
            <el-col>
              <el-select v-model="ruleForm.Uroleid" placeholder="请选择用户类型" v-bind:style="{'width': '100%'}">
                <el-option label="卖家" value="1"></el-option>
                <el-option label="买家" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="验证码" prop="captcha">
          <el-row>
            <el-col :span="12">
              <el-input v-model="ruleForm.captcha"></el-input>
            </el-col>
            <el-col :span="12">
              <img id="registerVerificationCodeImg" v-bind:src="'data:image/png;base64,' + captchaImg" v-on:click="refreshCaptchaImg()">
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-row>
        <el-checkbox class="selectBox" v-model="checked">
          请阅读
          <el-button type="text" v-on:click="registerInfo()">《服务条款》</el-button>
        </el-checkbox>
      </el-row>
      <el-row>
        <el-button class="registerButton" type="success" v-on:click="submitForm()">注 册</el-button>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'registerFrom',
  components: {},
  props: [],
  created () {
    this.getCaptchaImg()
  },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.Upwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      width: 0,
      ctoken: '',
      captchaImg: '',
      checked: false,
      timer: {},
      ruleForm: {
        Uname: '',
        Upwd: '',
        checkPass: '',
        Uquestion: '',
        Uresult: '',
        Usafetycode: '',
        Uroleid: '',
        captcha: ''
      },
      rules: {
        Uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        Upwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 10, message: '为了安全，密码长度请大于 10 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 10, message: '为了安全，密码长度请大于 10 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        Uquestion: [
          { required: true, message: '请选择安全问题', trigger: 'change' }
        ],
        Uresult: [
          { required: true, message: '请输入问题答案', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        Usafetycode: [
          { required: true, message: '请输入安全码', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        Uroleid: [
          { required: true, message: '请选择类型', trigger: 'change' }
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
      this.$message.info('刷新验证码')
      this.getCaptchaImg()
    },
    // 服务条款
    registerInfo () {
      this.$notify({
        title: '服务条例',
        message: '闲置商品交易平台开发的总目标是为了闲置商品的处理提供了一个更好的平台，平台提供买卖家公平交易。',
        duration: 4500
      })
    },
    // 点击注册按钮事件
    submitForm () {
      if (this.checked === true) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'http://139.155.33.105/goodsApi/user/register',
              data: this.ruleForm,
              headers: {
                ctoken: this.ctoken,
                code: this.ruleForm.captcha
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message.success('注册成功')
                } else {
                  this.$message.error(res.data.info)
                }
              })
          } else {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }
        })
      } else {
        this.$message.error('请阅读《服务条款》')
      }
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.refreshCaptchaImg()
    }, 30000)
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
.registerFrom
  position absolute
  top 200px
  left 300px
  width 600px
  border 5px
  border-color black
  #registerVerificationCodeImg
    margin-left 20px
    width 220px
    height 35px
    border-radius 10px
    cursor pointer
  .selectBox
    margin-left 100px
  .registerButton
    margin-left 100px
    width 500px
</style>
