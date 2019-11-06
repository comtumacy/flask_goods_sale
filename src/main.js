import Vue from 'vue'
import App from './App.vue'
// 导入路由封装文件
import router from '../route'
// 导入axios包
import axios from 'axios'
// 导入MD5加密包
import md5 from 'js-md5'
// 按需导入Element UI组件库包
import { Icon, Button } from 'element-ui'

Vue.config.productionTip = false
Vue.use(Icon)
Vue.use(Button)

new Vue({
  render: h => h(App)
}).$mount('#app')
