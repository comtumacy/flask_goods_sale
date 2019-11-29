<template>
    <div class="addAlert" v-bind:style="{'top': (height / 3) + 'px', 'left': (width / 2) + 'px'}">
      <i>请输入添加内容</i>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="内容：" prop="content">
          <el-input v-model="ruleForm.content" placeholder="请输入需要添加的评论内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button1" type="success" v-on:click="onSubmit('ruleForm')">添加</el-button>
          <el-button class="button2" type="info" v-on:click="$emit('sent')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'addAlert',
  components: {},
  props: ['widthNow', 'heightNow'],
  created () {
    this.getLength()
  },
  data () {
    return {
      ruleForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入评论内容', trigger: 'blur' },
          { max: 50, message: '长度应小于 50 个字符', trigger: 'blur' }
        ]
      },
      width: 0,
      height: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 添加评论事件
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid, field) => {
        if (valid) {
          this.$message.success('评论提交成功，请等待管理员审核评论')
          this.$emit('closeAndSearch', this.ruleForm.content)
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
.addAlert
  position absolute
  padding 10px 0 0 20px
  width 700px
  height 130px
  background-color rgb(249,249,251)
  border-radius 20px
  z-index 120
  box-shadow: 5px 5px 10px #888888
  > i
    position absolute
    left 280px
    padding 0 0 10px 0
    font-size 20px
    font-style normal
  .el-form
    position absolute
    top 60px
    margin 0 20px 0 20px
    .el-form-item__content
      .el-input
        width 375px
</style>
