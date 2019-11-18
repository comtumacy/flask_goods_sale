import Vue from 'vue'
// 导入vuex状态管理器包
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  goodType: '',
  className: '',
  classNo: ''
}

const getters = {
  token_getters (state) {
    if (state.token === '') {
      if (sessionStorage.getItem('token') === '') {
        return ''
      } else {
        state.token = sessionStorage.getItem('token')
        return sessionStorage.getItem('token')
      }
    } else {
      return state.token
    }
    // if (!state.isLogin) {
    //   if (sessionStorage.getItem('isLogin')) {
    //     state.isLogin = sessionStorage.getItem('isLogin')
    //     state.token = sessionStorage.getItem('token')
    //     return state.token
    //   } else {
    //     return state.token
    //   }
    // } else {
    //   return state.token
    // }
  },
  goodType_getters (state) {
    if (state.goodType === '') {
      if (sessionStorage.getItem('goodType') === '') {
        return '2'
      } else {
        state.goodType = sessionStorage.getItem('goodType')
        return sessionStorage.getItem('goodType')
      }
    } else {
      return state.goodType
    }
  },
  className_getters (state) {
    state.className = sessionStorage.getItem('className')
    return state.className
  },
  classNo_getters (state) {
    state.classNo = sessionStorage.getItem('classNo')
    return state.classNo
  }
}

const mutations = {
  token_mutations (state, token) {
    sessionStorage.setItem('token', token)
    state.token = token
  },
  goodType_mutations (state, goodType) {
    sessionStorage.setItem('goodType', goodType)
    state.goodType = goodType
  },
  className_mutations (state, className) {
    sessionStorage.setItem('className', className)
    state.className = className
  },
  classNo_mutations (state, classNo) {
    sessionStorage.setItem('classNo', classNo)
    state.classNo = classNo
  }
}

const actions = {
  token_actions (context, token) {
    context.commit('token_mutations', token)
  },
  goodType_actions (context, goodType) {
    context.commit('goodType_mutations', goodType)
  },
  className_actions (context, className) {
    context.commit('className_mutations', className)
  },
  classNo_actions (context, classNo) {
    context.commit('classNo_mutations', classNo)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 导出store对象
export default store
