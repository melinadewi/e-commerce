<template>
  <div>
    <h1>Register Form</h1>
    <b-alert variant="danger" dismissible fade
    :show="showAlert"
    @dismissed="showAlert=false">{{ alertMsg }}</b-alert>
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email address:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button><br><br>
      <router-link to="/user/login">Already a member? Login here!</router-link>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
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
      let { state } = this.$store
      let baseUrl = state.baseUrl
      axios.post(`${baseUrl}/user/register`, this.form)
        .then(() => {
          Swal.fire({
            type: 'success',
            title: 'Registration success!',
            showConfirmButton: false,
            timer: 1000
          })
          console.log('Register success')
          this.$router.push('/user/login')
          this.form.username = ''
          this.form.email = ''
          this.form.password = ''
        })
        .catch(({ response }) => {
          console.log('Register error:', response.data.message)
          this.alertMsg = response.data.message
          this.showAlert = true
        })
    }
  }
}
</script>
