import Vue from 'vue'
// 导入路由包
import VueRouter from 'vue-router'
// 导入vuex状态管理器
import store from './src/store/store'
// 以下为导入src文件夹下的vue组件
// shopIndex
import shopIndex from './src/components/shopIndex/shopIndex'
import shopIndexChildIndex from './src/components/shopIndex/shopIndexChild/shopIndexChildIndex'
import shopBook from './src/components/shopIndex/shopBook/shopBook'
import shopPhone from './src/components/shopIndex/shopPhone/shopPhone'
import goodIndex from './src/components/shopIndex/good/goodIndex'
// login
import login from './src/components/login/login'
// register
import register from './src/components/register/register'
// admin
import admin from './src/components/admin/adminIndex'
// 404
import notFound from './src/components/404/404'

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
    component: shopIndex,
    redirect: '/shopIndex/shopIndexChildIndex',
    // 嵌套路由
    children: [
      {
        // 商品子主页
        path: 'shopIndexChildIndex',
        component: shopIndexChildIndex
      },
      {
        // 书籍页面
        path: 'shopBook',
        component: shopBook
      },
      {
        // 书籍页面
        path: 'shopPhone',
        component: shopPhone
      },
      {
        // 商品详情页面
        path: 'good/:id',
        component: goodIndex,
        props: true
      }
    ]
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
  },
  // 后台
  {
    path: '/admin',
    component: admin
  },
  // 404
  {
    path: '*',
    component: notFound
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: '/goodssale/',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/admin') {
    if (store.getters.token_getters !== 'null') {
      next()
    } else if (store.getters.token_getters === 'null') {
      next('/login')
    }
  } else {
    next()
  }
})

// 导出router对象
export default router
