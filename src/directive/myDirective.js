import Vue from 'vue'

Vue.directive('admin-header-text', {
  inserted (el) {
    el.focus()
    el.style.position = 'absolute'
    el.style.left = '50px'
    el.style.top = '17px'
    el.style.fontSize = '20px'
  },
  bind (el, binding, vnode) {
  },
  update () {
  }
})
