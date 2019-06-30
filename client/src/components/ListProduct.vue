<template>
  <div>
    <b-card-group columns style="column-count: 4">
      <b-card v-for="product in $store.state.products" :img-src="product.imgUrl" :img-alt="product.name" img-top img-height="300" :key="product.id" style="text-align: left; font-size: 16px" >
        <b-card-text style="font-size: 18px; font-weight: 700">
          {{product.name}}
        </b-card-text>
        <b-card-text style="font-size: 14px">
          <b>Description:</b><br>{{product.description}}<br>
          <b>Price:</b> {{product.price}}          
          <b-card-text v-if="product.stock > 0">
            <b>Stock:</b> {{product.stock}}
          </b-card-text>
          <b-card-text v-else>
            <b>Stock:</b> 0
          </b-card-text>
        </b-card-text>
        <div slot="footer" class="text-center">
          <b-button href="#" variant="primary" v-if="$store.state.user.email !== 'admin@mail.com'" @click="addToCart(product._id)">Add to Cart</b-button>
          <b-button href="#" variant="warning" v-if="$store.state.user.email == 'admin@mail.com'" @click="editProduct(product._id)" class="mr-2">Edit</b-button>
          <b-button href="#" variant="danger" v-if="$store.state.user.email == 'admin@mail.com'" @click="deleteProduct(product._id, product.imgUrl)">Delete</b-button>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from 'axios'

export default {  
  created () {
    this.$store.dispatch('GET_PRODUCTS')
  },
  methods:{
    addToCart(id){
      if(!localStorage.getItem('token')){
        Swal.fire('Please login first')
        this.$router.push('/user/login')
      } else {
        this.$store.dispatch('ADD_ITEMS', id)
      }
    },
    reduce(id){
      let { dispatch } = this.$store
      dispatch('REDUCE_ITEMS', id)
    },
    editProduct(id){
      let { state, commit } = this.$store
      let baseUrl = state.baseUrl
      axios({
        method: 'GET',
        url: `${baseUrl}/product/${id}`,        
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          commit('SET_SELECTED_PRODUCTS', data)
          this.$router.push('/product/edit')
        })
        .catch(({ response }) => {
          console.log('Edit Product error:', response.data)
        })
    },
    deleteProduct(id, imgurl){
      let { state, commit } = this.$store
      let baseUrl = state.baseUrl
      axios({
        method: 'DELETE',
        url: `${baseUrl}/product/${id}`,
        data: {
          filename: imgurl
        },
        headers: {
          token: state.token
        }
      })
        .then(({ data }) => {
          console.log('Delete product success')
          this.$router.push('/product/list')
        })
        .catch(({ response }) => {
          console.log('Delete Product error:', response.data)
        })
    },
  }
}
</script>
