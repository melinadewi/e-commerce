<template>
  <div>
    <h1>Login Form</h1>
    <b-alert variant="danger" dismissible fade
    :show="showAlert"
    @dismissed="showAlert=false">{{ alertMsg }}</b-alert>
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button><br><br>
      <router-link to="/user/register">Not a member? Register now!</router-link>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      showAlert: false,
      alertMsg: ''
    }
  },
  methods: {
    onSubmit () {
      let { state, dispatch } = this.$store
      let baseUrl = state.baseUrl
      axios.post(`${baseUrl}/user/login`, this.form)
        .then(({data}) => {
          this.$router.push('/')
          state.token = data.token
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          state.user = {
            username: data.username,
            email: data.email
          }
          console.log(state.user)
          Swal.fire({
            type: 'success',
            title: 'Login success!',
            showConfirmButton: false,
            timer: 1500
          })
          console.log('Login success')
          this.form.email = ''
          this.form.password = ''
          this.$router.push('/product/list')
          if(this.form.email !== 'admin@mail.com'){ // before admin page created
            dispatch('GET_CART')
            // if(!state.cart){
            //   console.log(state.cart)
            //   dispatch('CREATE_CART')
            // }
          }
        })
        .catch(({ response }) => {
          console.log('Login error:', response.data.message)
          this.alertMsg = response.data.message
          this.showAlert = true
        })
    }
  }
}
</script>
