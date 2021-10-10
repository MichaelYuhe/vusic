import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
// 内部每一个都是getter或者action
import * as getters from './getters'
import * as actions from './actions'

// 开发环境
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
