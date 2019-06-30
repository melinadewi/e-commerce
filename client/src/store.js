import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: `http://localhost:3000`
    // baseUrl: `tokoshop-server.melinadewi.club`
  },
  mutations: {}
})
