<template>
  <div>
    <h1>Edit Product</h1>
    <b-container class ="bv-example-row">
      <b-row align-h="center">
        <b-col cols="6">
          <b-alert variant="danger" dismissible fade
          :show="showAlert"
          @dismissed="showAlert=false">{{ alertMsg }}</b-alert>
          <b-form @submit.prevent="onSubmit" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Name:"
              label-for="input-1"
            >
              <div class="mt-2">Before: {{ $store.state.selectedProduct.name }}</div>
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Enter new name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Description:"
              label-for="input-2"
            >
              <div class="mt-2">Before: {{ $store.state.selectedProduct.description }}</div>
              <b-form-input
                id="input-2"
                v-model="form.description"
                type="text"
                placeholder="Enter new description"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Image:" label-for="input-3">
              <b-form-file accept=".jpg, .png" v-model="form.file" class="mt-3" @change="readURL" plain></b-form-file>
            </b-form-group>

            <b-form-group id="input-group-4" label="Price:" label-for="input-4">
              <div class="mt-2">Before: {{ $store.state.selectedProduct.price }}</div>
              <b-form-input
                id="input-4"
                type="number"
                v-model="form.price"
                placeholder="Enter new price"
                min="0"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label="Stock:" label-for="input-5">
              <div class="mt-2">Before: {{ $store.state.selectedProduct.stock }}</div>
              <b-form-input
                id="input-5"
                type="number"
                v-model="form.stock"
                placeholder="Enter new stock"
                min="0"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Edit Product</b-button><br><br>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
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
    readURL (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.form.file = files[0]
    },
    onSubmit () {
      let { state } = this.$store
      let baseUrl = state.baseUrl
      let productId = state.selectedProduct._id //check here
      let formData = new FormData()
      let keys = Object.keys(this.form)
      for(let i = 0; i < keys.length; i++){
        if(this.form[keys[i]]){
          if(keys[i] === 'file'){
            formData.append('file', this.form.file)
          } else {
            formData.set(keys[i], this.form[keys[i]])
          }
        }
      }
      axios({
          method: 'PATCH',
          url: `${baseUrl}/product/${productId}`,
          data: formData,
          headers: {
            token: state.token
          },
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
          .then((hasil) => {
          this.$router.push('/product/list')
          console.log('Edit Product success')
          this.form = {
              name: '',
              description: '',
              file: null,
              price: null,
              stock: null
          }
          })
          .catch(({ response }) => {
          console.log('Edit Product error:', response.data.message)
          this.alertMsg = response.data.message
          this.showAlert = true
          })
    }
  }
}
</script>
