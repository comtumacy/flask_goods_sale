<template>
  <div class="modifyUser" v-loading="loading">
    <el-row class="modifyUserHeader">
      <span class="el-icon-user"></span>
      <span class="modifyUserText">信息修改</span>
      <div class="modifyTable">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-form-item label="性别" prop="sex">
              <el-col>
                <el-select v-model="ruleForm.sex" placeholder="请选择性别" v-bind:style="{'width': '100%'}">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item label="省份" prop="province">
            <el-input v-model="ruleForm.province"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="ruleForm.city"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="trueName">
            <el-input v-model="ruleForm.trueName"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码" prop="postalCode">
            <el-input v-model="ruleForm.postalCode"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-row>
            <el-form-item label="证件类型" prop="codeTypes">
              <el-col>
                <el-select v-model="ruleForm.codeTypes" placeholder="请选择证件类型" v-bind:style="{'width': '100%'}">
                  <el-option label="身份证" value="身份证"></el-option>
                  <el-option label="学生证" value="学生证"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-row>
          <el-form-item label="证件号码" prop="codenumber">
            <el-input v-model="ruleForm.codenumber"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="modifyUserButton" type="warning" v-on:click="Enter()">确认修改</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'modifyUser',
  components: {},
  props: ['widthNow'],
  created () {
    this.getInfo()
  },
  data () {
    return {
      loading: false,
      ruleForm: {
        sex: '',
        province: '',
        city: '',
        phone: '',
        trueName: '',
        address: '',
        postalCode: '',
        email: '',
        codeTypes: '',
        codenumber: ''
      },
      rules: {
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请输入省份', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市名称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        trueName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入收货地址', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        postalCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        codeTypes: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        codenumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { min: 12, max: 18, message: '长度在 12 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取信息
    getInfo () {
      this.loading = true
      this.$axios({
        method: 'post',
        url: 'https://www.yitongli.cn/goodsApi/public/get_user_info',
        headers: {
          'token': this.$store.getters.token_getters,
          'Uname': this.$store.getters.username_getters
        }
      }).then(res => {
        this.loading = false
        this.ruleForm.sex = res.data.content[0].Ufsex
        this.ruleForm.province = res.data.content[0].Ufprovince
        this.ruleForm.city = res.data.content[0].Ufcity
        this.ruleForm.phone = res.data.content[0].Ufphone
        this.ruleForm.trueName = res.data.content[0].Uftruename
        this.ruleForm.address = res.data.content[0].Ufaddress
        this.ruleForm.postalCode = res.data.content[0].Ufpostalcode
        this.ruleForm.email = res.data.content[0].Uemain
        this.ruleForm.codeTypes = res.data.content[0].Ucodetype
        this.ruleForm.codenumber = res.data.content[0].Ucodenumber
      }).catch(() => {
        this.$message.error('请检查网络连接')
      })
    },
    // 确认修改
    Enter () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'https://www.yitongli.cn/goodsApi/public/modify_user_info',
            headers: {
              'token': this.$store.getters.token_getters,
              'Uname': this.$store.getters.username_getters
            },
            data: {
              'sex': this.ruleForm.sex,
              'province': this.ruleForm.province,
              'city': this.ruleForm.city,
              'phone': this.ruleForm.phone,
              'trueName': this.ruleForm.trueName,
              'address': this.ruleForm.address,
              'postalCode': this.ruleForm.postalCode,
              'email': this.ruleForm.email,
              'codeTypes': this.ruleForm.codeTypes,
              'codenumber': this.ruleForm.codenumber
            }
          }).then(res => {
            this.$message.success(res.data.info)
            this.getInfo()
          }).catch(() => {
            this.$message.info('请检查网络连接')
          })
        } else {
          this.$message.error('输入错误，请再次检查您输入的内容')
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
.modifyUser
  position absolute
  right 0
  width 100%
  height 100%
  background rgb(241,241,241)
  .modifyUserHeader
    position absolute
    height 60px
    width 100%
    font-size 16px
    font-family Microsoft YaHei
    cursor default
    background-color white
    box-shadow 0 5px 5px -5px #888888
    .el-icon-user
      position absolute
      left 20px
      top 20px
      font-size 22px
    .modifyUserText
      position absolute
      left 50px
      top 17px
      font-size 20px
    .modifyTable
      position absolute
      margin-left 400px
      margin-top 120px
      width 600px
    .modifyUserButton
      position absolute
      margin-left 100px
      width 500px
</style>
