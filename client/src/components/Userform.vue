<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
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
      <b-container class ="bv-example-row" v-if="usersign==='login'">
        <b-row align-h="center">
          <b-button type="submit" variant="primary">Login</b-button>
        </b-row>
        <b-row align-h="center">
          <a href="#">Not a member? Register now!</a>
        </b-row>
      </b-container>
      <b-button type="submit" variant="primary" v-if="usersign==='register'">Register</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      usersign: 'login'
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>
