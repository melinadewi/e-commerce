<template>
  <div>
    <h1>Add Product</h1>
    <b-alert variant="danger" dismissible fade
    :show="showAlert"
    @dismissed="showAlert=false">{{ alertMsg }}</b-alert>
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Description:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.description"
          type="text"
          required
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Image:" label-for="input-3">
        <b-form-file accept=".jpg, .png" v-model="form.file" class="mt-3" plain></b-form-file>
        <div class="mt-3">Selected file: {{ form.file ? form.file.name : '' }}</div>
      </b-form-group>

      <b-form-group id="input-group-4" label="Price:" label-for="input-4">
        <b-form-input
          id="input-4"
          type="number"
          v-model="form.price"
          required
          placeholder="Enter price"
          min="0"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Stock:" label-for="input-5">
        <b-form-input
          id="input-5"
          type="number"
          v-model="form.stock"
          required
          placeholder="Enter stock"
          min="0"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Add Product to TokoShop</b-button><br><br>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: '',
        description: '',
        file: null,
        price: null,
        stock: null
      },
      show: true,
      showAlert: false,
      alertMsg: '',
      isAdmin: true
    }
  },
  methods: {
      readURL(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
                this.newImgUrl = files[0]
            // this.uploadImg = URL.createObjectURL(file);
        },
    onSubmit () {
      let { state } = this.$store
      let baseUrl = state.baseUrl
      let formData = new FormData()
      formData.set('name', this.form.name)
      formData.set('description', this.form.description)
      formData.append('file', this.form.file)
      formData.set('price', this.form.price)
      formData.set('stock', this.form.stock)
      console.log(state.token)
      axios({
        method: 'POST',
        url: `${baseUrl}/product`,
        data: formData,
        headers: {
          token: state.token
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(() => {
          this.$router.push('/')
          console.log('Add Product success')
          this.form = {
            name: '',
            description: '',
            file: null,
            price: null,
            stock: null
          }
        })
        .catch(({ response }) => {
            // console.log(err)
          console.log('Add Product error:', response.data.message)
          this.alertMsg = response.data.message
          this.showAlert = true
        })
    }
  }
}
</script>
