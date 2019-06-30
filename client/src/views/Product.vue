<template>
  <div>
    <img alt="Vue logo" src="../assets/logo-header.png"><br>
    <b-button variant="outline-primary" style="margin: 20px" v-if="$store.state.user.email === 'admin@mail.com'"><router-link to="/product/add">Add Products</router-link></b-button>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'

export default {  
  created () {
    this.$router.push('/product/list')
  }
}
</script>
