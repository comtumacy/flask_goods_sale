import Vue from 'vue'
import App from './App.vue'
// 导入路由封装文件
import router from '../route'
// 导入axIos包
import axIos from 'axios'
// 导入MD5加密包
import md5 from 'js-md5'
// 导入字体库文件
import './assets/style.css'
// 导入CSS动画库文件
import './assets/animate/animate.css'
// 导入VUEX封装文件
import store from './store/store'
// 导入全局axIos拦截器
import './http/http'
// 导入自定义指令JS
import './directive/myDirective'
// 按需导入Element UI组件库包
import { Icon, Button, Row, Col, Divider, Container, Aside, Main, Form, FormItem, Input, InputNumber, Checkbox, CheckboxButton, CheckboxGroup, MessageBox, Message, Notification, Select, Option, OptionGroup, Menu, Submenu, MenuItem, MenuItemGroup, Carousel, CarouselItem, Breadcrumb, BreadcrumbItem, Pagination, Loading, Table, TableColumn, Tooltip, Upload } from 'element-ui'
// 按需导入iView UI
import { Tabs, TabPane } from 'view-design'
// 导入iView UI
import 'view-design/dist/styles/iview.css'
// 导入eCharts
import eCharts from 'echarts'

// 开发模式
Vue.config.productionTip = false
// 定义全局变量axIos
Vue.prototype.$axios = axIos
// 定义全局变量md5
Vue.prototype.$md5 = md5
// 导入eCharts
Vue.prototype.$echarts = eCharts
// Element UI全局组件挂载
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service
Vue.use(Icon)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Divider)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Upload)
//  iView UI
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
