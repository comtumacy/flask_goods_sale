import Vue from 'vue'
// 导入vuex状态管理器包
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: 'null',
  username: '',
  goods: []
}

const getters = {
  token_getters (state) {
    if (state.token === 'null') {
      if (sessionStorage.getItem('token') === null) {
        return 'null'
      } else {
        state.token = sessionStorage.getItem('token')
        return sessionStorage.getItem('token')
      }
    } else {
      return state.token
    }
  },
  username_getters (state) {
    if (state.username === '') {
      if (sessionStorage.getItem('username') === '') {
        return '无'
      } else {
        state.username = sessionStorage.getItem('username')
        return sessionStorage.getItem('username')
      }
    } else {
      return state.username
    }
  },
  goods_getters (state) {
    if (state.goods.length === 0) {
      if (sessionStorage.getItem('goods') === null) {
        return state.goods
      } else {
        state.goods = JSON.parse(sessionStorage.getItem('goods'))
        return state.goods
      }
    } else {
      return state.goods
    }
  }
}

const mutations = {
  token_mutations (state, token) {
    sessionStorage.setItem('token', token)
    state.token = token
  },
  username_mutations (state, username) {
    sessionStorage.setItem('username', username)
    state.username = username
  },
  goods_mutations (state, goods) {
    if (state.goods.length === 0) {
      if (sessionStorage.getItem('goods') === null) {
        state.goods.push(goods)
        sessionStorage.setItem('goods', JSON.stringify(state.goods))
      } else {
        state.goods = JSON.parse(sessionStorage.getItem('goods'))
        state.goods.push(goods)
        sessionStorage.setItem('goods', JSON.stringify(state.goods))
      }
    } else {
      state.goods.push(goods)
      sessionStorage.setItem('goods', JSON.stringify(state.goods))
    }
  },
  goods_type_mutations (state, goodsType) {
    if (goodsType === 1) {
      state.goods = []
      sessionStorage.removeItem('goods')
    }
  }
}

const actions = {
  token_actions (context, token) {
    context.commit('token_mutations', token)
  },
  username_actions (context, username) {
    context.commit('username_mutations', username)
  },
  goods_actions (context, goods) {
    context.commit('goods_mutations', goods)
  },
  goods_type_actions (context, goodsType) {
    context.commit('goods_type_mutations', goodsType)
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
