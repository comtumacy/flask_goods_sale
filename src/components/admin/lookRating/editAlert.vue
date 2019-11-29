<template>
    <div class="editAlert" v-bind:style="{'top': (height / 3) + 'px', 'left': (width / 2) + 'px'}">
      <i>评论修改</i>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="评论内容：" prop="content">
          <el-input v-model="ruleForm.content" placeholder="请输入需要更改的评论内容"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="评分数值：" prop="start">
            <el-col>
              <el-select v-model="ruleForm.start" placeholder="请选择评分数值" v-bind:style="{'width': '100%'}">
                <el-option label="1分" value="1" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="2分" value="2" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="3分" value="3" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="4分" value="4" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="5分" value="5" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="6分" value="6" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="7分" value="7" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="8分" value="8" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="9分" value="9" v-bind:style="{'width': '545px'}"></el-option>
                <el-option label="10分" value="10" v-bind:style="{'width': '545px'}"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button class="button1" type="success" v-on:click="onSubmit('ruleForm')">修改</el-button>
          <el-button class="button2" type="info" v-on:click="$emit('sent')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'editAlert',
  components: {},
  props: ['widthNow', 'heightNow'],
  created () {
    this.getLength()
  },
  data () {
    return {
      ruleForm: {
        content: '',
        start: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入需要更改的评论内容', trigger: 'blur' },
          { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
        ],
        start: [
          { required: true, message: '请选择评分数值', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 修改事件
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid, field) => {
        if (valid) {
          this.$emit('closeAndEdit', this.ruleForm)
        } else {
          setTimeout(() => {
            if (field.content) {
              this.$message.error(field.content[0].message)
            }
          }, 200)
          return false
        }
      })
    },
    // 获取浏览器长宽，更改浏览器两边的长宽
    getLength () {
      let width
      if (this.widthNow < 920) {
        width = 0
      } else {
        width = this.widthNow - 920
      }
      this.width = width
      let height
      if (this.heightNow < 200) {
        height = 0
      } else {
        height = this.heightNow - 200
      }
      this.height = height
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
.editAlert
  position absolute
  padding 10px 0 0 20px
  width 700px
  height 250px
  background-color rgb(249,249,251)
  border-radius 20px
  z-index 120
  box-shadow: 5px 5px 10px #888888
  > i
    position absolute
    left 320px
    padding 0 0 10px 0
    font-size 20px
    font-style normal
  .el-form
    position absolute
    top 60px
    margin 0 20px 0 20px
    .el-form-item__content
      .el-input
        width 545px
    .el-form-item
      .el-form-item__content
        .button1
          margin-left 95px
          width 265px
        .button2
          width 265px
</style>
