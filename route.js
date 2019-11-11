import Vue from 'vue'
// 导入路由包
import VueRouter from 'vue-router'
// 导入vuex状态管理器
// import store from './src/store/store'
// 以下为导入src文件夹下的vue组件
// shopIndex
import shopIndex from './src/components/shopIndex/shopIndex'
// login
import login from './src/components/login/login'
// register
import register from './src/components/register/register'

// 挂载router在Vue上
Vue.use(VueRouter)

// 以下为路由规则
const routes = [
  // 定向到主页
  {
    path: '/',
    // 重定向
    redirect: '/shopIndex'
  },
  // 主页
  {
    path: '/shopIndex',
    component: shopIndex
  },
  // 登录
  {
    path: '/login',
    component: login
  },
  // 注册
  {
    path: '/register',
    component: register
  }
]

const router = new VueRouter({
  routes
})
// 导出router对象
export default router
