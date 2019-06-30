import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: `http://localhost:3000`,
    // baseUrl: `tokoshop-server.melinadewi.club`
    token: '',
    products: [],
    selectedProduct: {},
    user: {},
    carts: {}
  },
  mutations: {
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
    SET_SELECTED_PRODUCTS(state, payload){
      state.selectedProduct = payload
    },
    SET_CART(state, payload){
      state.carts = payload
      for(let i = 0; i < state.carts.items.length; i++){
        state.carts.items[i].quantity = payload.quantity[i]
      }
    }
  },
  actions: {
    GET_PRODUCTS(context){
      axios({
        method: 'GET',
        url: `${this.state.baseUrl}/product`,
      })
        .then(({ data }) => {
          console.log("List products", data)
          context.commit('SET_PRODUCTS', data)
        })
        .catch(({ response }) => {
          console.log('Get Product error:', response.data)
        })
    },
    CREATE_CART(context){
      axios({
        method: 'POST',
        url: `${this.state.baseUrl}/cart`,
        headers: {
          token: this.state.token
        }      
      })
        .then(({ data }) => {
          console.log("on cart", data)
          context.commit('SET_CART', data)
        })
        .catch(({ response }) => {
          console.log('Get Product error:', response.data)
        })
    },
    GET_CART(context){
      axios({
        method: 'GET',
        url: `${this.state.baseUrl}/cart`,
        headers: {
          token: this.state.token
        }
      })
        .then(({ data }) => {
          console.log("on cart", data)
          if(!data.user){
            this.dispatch('CREATE_CART')
          } else {
            context.commit('SET_CART', data)
          }
        })
        .catch(({ response }) => {
          console.log('Get Product error:', response.data)
        })
    },
    ADD_ITEMS(context, payload){
      axios({
        method: 'PATCH',
        url: `${this.state.baseUrl}/cart/add`,
        headers: {
          token: this.state.token
        },
        data: {
          id: payload
        }
      })
        .then(() => {
          this.dispatch('GET_CART')
        })
        .catch(({ response }) => {
          console.log('Get Product error:', response)
        })
    },
    REDUCE_ITEMS(context, payload){
      axios({
        method: 'PATCH',
        url: `${this.state.baseUrl}/cart/reduce`,
        headers: {
          token: this.state.token
        },
        data: {
          id: payload
        }
      })
        .then(() => {
          this.dispatch('GET_CART')
        })
        .catch(({ response }) => {
          console.log('Get Product error:', response.data)
        })
    },
    DELETE_ITEMS_CART(context, payload){
      axios({
        method: 'PATCH',
        url: `${this.state.baseUrl}/cart/delete`,
        headers: {
          token: this.state.token
        },
        data: {
          id: payload
        }
      })
        .then(() => {
          this.dispatch('GET_CART')
        })
        .catch(({ response }) => {
          console.log('Get Product error:', response.data)
        })
    },
  }
})
