import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import action from './actions.js'

Vue.use(Vuex);

const state = {

}
export default new Vuex.Store({
  state,
  action,
  mutations
})
